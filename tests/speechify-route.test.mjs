import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';
const mp3Exports = {};
vm.runInNewContext(ts.transpileModule(readFileSync(new URL('../lib/mp3-frames.ts', import.meta.url), 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText, { exports: mp3Exports, Uint8Array, TransformStream });
const code = ts.transpileModule(readFileSync(new URL('../app/lionheart/api/speechify/route.ts', import.meta.url), 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
function route({ allowed = true, key = 'test-only', failPart = false } = {}) {
  const calls = [];
  const modules = {
    '@/lib/mp3-frames': mp3Exports,
    'next/headers': { cookies: async () => ({ get: () => ({ value: 'test-session' }) }) },
    'next/server': { NextResponse: { json: (data, init) => Response.json(data, init) } },
    '@/lib/lionheart-auth': { LIONHEART_SESSION_COOKIE: 'test', verifyLionheartSessionToken: () => allowed },
    '@/lib/lionheart-speechify': {
      listeningSections: async () => [{ id: 'section-1', volume: 1, title: 'Chapter 1', text: 'PRIVATE MANUSCRIPT', parts: ['first part', 'second part'] }],
      speechifyProblem: () => 'Provider unavailable',
      speechifyRequest: async (path, init) => {
        calls.push({ path, init });
        if (path.startsWith('voices?')) return Response.json({ voices: [{ id: 'narrator', display_name: 'Narrator', locale: 'en-US', gender: 'male' }], has_more: false });
        const input = JSON.parse(init.body).input;
        if (failPart && input === 'second part') return new Response('fail', { status: 402 });
        return new Response(input === 'first part' ? new Uint8Array([1, 2]) : new Uint8Array([3, 4]));
      },
    },
  };
  const exports = {};
  vm.runInNewContext(code, { exports, require: name => modules[name], process: { env: { SPEECHIFY_API_KEY: key } }, Response, Request, URL, URLSearchParams, AbortController, AbortSignal, ReadableStream, Uint8Array });
  return { ...exports, calls };
}
const request = (body = { section: 'section-1', voice: 'narrator' }, origin = 'https://portfolio.lomnickpro.com') => new Request('https://portfolio.lomnickpro.com/lionheart/api/speechify', { method: 'POST', headers: { Origin: origin, 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
test('unauthenticated GET and POST never contact Speechify', async () => {
  const r = route({ allowed: false });
  assert.equal((await r.GET()).status, 401); assert.equal((await r.POST(request())).status, 401); assert.equal(r.calls.length, 0);
});
test('missing key returns configuration state without external requests', async () => {
  const r = route({ key: '' }); assert.equal((await r.GET()).status, 200); assert.equal((await r.POST(request())).status, 503); assert.equal(r.calls.length, 0);
});
test('cross-origin generation is rejected before provider access', async () => {
  const r = route(); assert.equal((await r.POST(request(undefined, 'https://example.com'))).status, 403); assert.equal(r.calls.length, 0);
});
test('catalogue returns metadata without manuscript or key', async () => {
  const r = route(); const response = await r.GET(); const text = await response.text();
  assert.equal(response.headers.get('cache-control'), 'private, no-store'); assert.ok(text.includes('Chapter 1')); assert.ok(!text.includes('PRIVATE MANUSCRIPT')); assert.ok(!text.includes('test-only'));
});
test('unknown voice and section cannot generate arbitrary text', async () => {
  const r = route(); assert.equal((await r.POST(request({ section: 'section-1', voice: 'unknown' }))).status, 400);
  assert.equal((await r.POST(request({ section: 'unknown', voice: 'narrator' }))).status, 400);
  assert.ok(r.calls.every(c => c.path.startsWith('voices?')));
});
test('section parts stream in order into one private MP3 response', async () => {
  const r = route(); const response = await r.POST(request());
  assert.equal(response.headers.get('content-type'), 'audio/mpeg');
  assert.deepEqual([...new Uint8Array(await response.arrayBuffer())], [1, 2, 3, 4]);
  assert.deepEqual(r.calls.filter(c => c.init?.method === 'POST').map(c => JSON.parse(c.init.body).input), ['first part', 'second part']);
});
test('later provider error aborts the file instead of returning partial success', async () => {
  const r = route({ failPart: true }); const response = await r.POST(request());
  await assert.rejects(response.arrayBuffer(), /Audio generation interrupted/);
});

test('MP3 metadata is stripped even when its header spans streamed chunks', async () => {
  const tag = new Uint8Array([73,68,51,4,0,0,0,0,0,3,1,2,3]);
  const frame = new Uint8Array([255,251,100,200]);
  const source = new ReadableStream({ start(c) { c.enqueue(tag.slice(0,5)); c.enqueue(tag.slice(5,11)); c.enqueue(tag.slice(11)); c.enqueue(frame); c.close(); } });
  const output = new Response(mp3Exports.mp3Frames(source));
  assert.deepEqual([...new Uint8Array(await output.arrayBuffer())], [...frame]);
});
test('MP3 without a metadata tag retains all bytes', async () => {
  const frames = new Uint8Array([255,251,100,200,3,4,5,6,7,8,9,10]);
  const source = new ReadableStream({ start(c) { c.enqueue(frames); c.close(); } });
  assert.deepEqual([...new Uint8Array(await new Response(mp3Exports.mp3Frames(source)).arrayBuffer())], [...frames]);
});
test('truncated MP3 metadata fails instead of producing a partial file', async () => {
  const source = new ReadableStream({ start(c) { c.enqueue(new Uint8Array([73,68,51,4,0,0,0,0,0,9])); c.close(); } });
  await assert.rejects(new Response(mp3Exports.mp3Frames(source)).arrayBuffer(), /Incomplete MP3 metadata/);
});
