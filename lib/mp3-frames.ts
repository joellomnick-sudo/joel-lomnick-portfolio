/** Remove a leading ID3v2 tag so independently generated MP3 parts join cleanly. */
export function mp3Frames(source: ReadableStream<Uint8Array>) {
  let prefix = new Uint8Array(0);
  let initialized = false;
  let skip = 0;
  return source.pipeThrough(new TransformStream<Uint8Array, Uint8Array>({
    transform(chunk, controller) {
      let data = chunk;
      if (!initialized) {
        const combined = new Uint8Array(prefix.length + chunk.length);
        combined.set(prefix); combined.set(chunk, prefix.length); prefix = combined;
        if (prefix.length < 10) return;
        if (prefix[0] === 73 && prefix[1] === 68 && prefix[2] === 51) {
          if (![2, 3, 4].includes(prefix[3]) || prefix.slice(6, 10).some(v => v > 127)) throw new Error("Invalid MP3 metadata header.");
          skip = 10 + prefix.slice(6, 10).reduce((n, v) => n * 128 + v, 0);
          if (prefix[3] === 4 && (prefix[5] & 16)) skip += 10;
          if (skip > 1024 * 1024) throw new Error("Unexpected MP3 metadata size.");
        }
        initialized = true; data = prefix; prefix = new Uint8Array(0);
      }
      const count = Math.min(skip, data.length); skip -= count;
      if (count < data.length) controller.enqueue(data.subarray(count));
    },
    flush(controller) {
      if (!initialized && prefix.length) {
        if (prefix[0] === 73 && prefix[1] === 68 && prefix[2] === 51) throw new Error("Incomplete MP3 metadata.");
        controller.enqueue(prefix);
      }
      if (skip) throw new Error("Incomplete MP3 metadata.");
    },
  }));
}
