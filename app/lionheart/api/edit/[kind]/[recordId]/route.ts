import { NextRequest, NextResponse } from "next/server";
import { LIONHEART_SESSION_COOKIE, verifyLionheartSessionToken } from "@/lib/lionheart-auth";
import { editableFields, editingRequest, editingTables, isEditingKind, revision } from "@/lib/lionheart-editing";
import { mentionsChapter } from "@/lib/lionheart-links";

export const dynamic = "force-dynamic";
type Context = { params: Promise<{ kind: string; recordId: string }> };
function response(data: unknown, status = 200) { return NextResponse.json(data, { status, headers: { "Cache-Control": "no-store" } }); }
async function access(request: NextRequest, context: Context) {
  if (!verifyLionheartSessionToken(request.cookies.get(LIONHEART_SESSION_COOKIE)?.value)) return null;
  const { kind, recordId } = await context.params;
  if (!isEditingKind(kind) || !/^rec[a-zA-Z0-9]{14}$/.test(recordId)) return null;
  return { kind, recordId, config: editingTables[kind] };
}
export async function GET(request: NextRequest, context: Context) {
  const target = await access(request, context);
  if (!target) return response({ error: "Unlock the studio to open this record." }, 401);
  try {
    const record = await editingRequest(`${target.config.table}/${target.recordId}`);
    const fields = editableFields(target.kind, record.fields);
    const data: Record<string, unknown> = { fields, revision: revision(fields) };
    if (request.nextUrl.searchParams.get("history") === "1") {
      const query = new URLSearchParams({ filterByFormula: `{Manuscript Record ID}='${target.recordId}'`, "sort[0][field]": "Date", "sort[0][direction]": "desc", pageSize: "100" });
      const history: Array<{ id: string; label: string; date: string; text: string }> = [];
      let offset: string | undefined;
      do {
        if (offset) query.set("offset", offset);
        const page = await editingRequest(`tbl8NXURSUTJPmFJL?${query}`);
        for (const item of page.records) history.push({ id: item.id, label: item.fields.Version || "Saved version", date: item.fields.Date || item.createdTime, text: item.fields["Snapshot Text"] || "" });
        offset = page.offset;
      } while (offset);
      data.history = history;
    }
    return response(data);
  } catch (error) { return response({ error: error instanceof Error ? error.message : "Unable to open this record." }, 502); }
}
export async function PATCH(request: NextRequest, context: Context) {
  const target = await access(request, context);
  if (!target) return response({ error: "Unlock the studio before saving." }, 401);
  const origin = request.headers.get("origin");
  if (!origin || origin !== request.nextUrl.origin) return response({ error: "Save from the studio page." }, 403);
  try {
    const body = await request.json();
    if (!body.fields || typeof body.fields !== "object" || Array.isArray(body.fields) || typeof body.revision !== "string") return response({ error: "Invalid save request." }, 400);
    const keys = Object.keys(body.fields);
    const allowed: readonly string[] = target.config.fields;
    if (keys.length !== allowed.length || keys.some(key => !allowed.includes(key) || typeof body.fields[key] !== "string" || body.fields[key].length > 150000)) return response({ error: "Invalid editable fields." }, 400);
    const manuscript = target.kind === "chapter" || target.kind === "frontMatter";
    if (manuscript && !body.fields["Draft Text"].trim()) return response({ error: "A manuscript cannot be saved empty." }, 400);
    if (target.kind === "person" && !["In story", "Needs Joel's review", "Source only"].includes(body.fields["Story Inclusion"])) return response({ error: "Choose a story inclusion status." }, 400);
    if (target.kind === "source" && body.fields["Source Link"] && !/^https?:\/\//.test(body.fields["Source Link"])) return response({ error: "Use an https source link." }, 400);
    const current = await editingRequest(`${target.config.table}/${target.recordId}`);
    const previous = editableFields(target.kind, current.fields);
    if (revision(previous) !== body.revision) return response({ error: "This record changed elsewhere. Download your draft, then reload and compare before saving." }, 409);
    if (revision(previous) === revision(body.fields)) return response({ fields: previous, revision: revision(previous) });
    // Saving the complete previous record is required before any overwrite.
    await editingRequest("tbl8NXURSUTJPmFJL", { method: "POST", body: JSON.stringify({ records: [{ fields: {
      Version: `Before edit: ${current.fields[target.config.title] || target.kind}`,
      "Manuscript Record ID": target.recordId, "Snapshot Text": JSON.stringify({ kind: target.kind, fields: previous }),
      Date: new Date().toISOString(), Notes: "Complete record snapshot created before an author edit.",
    } }] }) });
    const updates = { ...body.fields };
    if (target.kind === "source" && previous["Related Chapters"] !== body.fields["Related Chapters"]) {
      const query = new URLSearchParams(); query.append("fields[]", "Volume"); query.append("fields[]", "Chapter");
      const chapters: Array<{ id: string; fields: { Volume?: number; Chapter?: number } }> = [];
      let offset: string | undefined;
      do {
        if (offset) query.set("offset", offset);
        const page = await editingRequest(`tblmZH0nSF2Vb3d6O?${query}`);
        chapters.push(...page.records); offset = page.offset;
      } while (offset);
      updates["Chapter Records"] = chapters.filter(c => mentionsChapter(body.fields["Related Chapters"], c.fields.Volume || 0, c.fields.Chapter || 0)).map(c => c.id);
    }
    if (manuscript) {
      updates["Word Count"] = body.fields["Draft Text"].trim().split(/\s+/).length;
      if (target.kind === "chapter") updates["Draft Prose"] = body.fields["Draft Text"];
    }
    const saved = await editingRequest(`${target.config.table}/${target.recordId}`, { method: "PATCH", body: JSON.stringify({ fields: updates }) });
    const fields = editableFields(target.kind, saved.fields);
    return response({ fields, revision: revision(fields) });
  } catch (error) { return response({ error: error instanceof Error ? error.message : "Save failed. Your draft is still in the editor." }, 502); }
}
