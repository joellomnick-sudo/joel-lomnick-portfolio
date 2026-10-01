export type ParagraphChange = { type: "kept" | "removed" | "added"; text: string };
export const paragraphs = (text: string) => text.replace(/\r\n/g, "\n").split(/\n\s*\n/).map(p => p.trim()).filter(Boolean);
export const wordCount = (text: string) => text.trim() ? text.trim().split(/\s+/).length : 0;
// Longest common subsequence preserves order and makes every removed paragraph visible.
export function compareManuscripts(before: string, after: string): ParagraphChange[] {
  const a = paragraphs(before), b = paragraphs(after);
  // Keep worst-case edits bounded while still showing every changed paragraph.
  if (a.length * b.length > 2000000) {
    let start = 0, endA = a.length, endB = b.length;
    while (start < endA && start < endB && a[start] === b[start]) start++;
    while (endA > start && endB > start && a[endA - 1] === b[endB - 1]) { endA--; endB--; }
    return [
      ...a.slice(0, start).map(text => ({ type: "kept" as const, text })),
      ...a.slice(start, endA).map(text => ({ type: "removed" as const, text })),
      ...b.slice(start, endB).map(text => ({ type: "added" as const, text })),
      ...a.slice(endA).map(text => ({ type: "kept" as const, text })),
    ];
  }
  const rows = Array.from({ length: a.length + 1 }, () => new Uint32Array(b.length + 1));
  for (let i = a.length - 1; i >= 0; i--) for (let j = b.length - 1; j >= 0; j--)
    rows[i][j] = a[i] === b[j] ? rows[i + 1][j + 1] + 1 : Math.max(rows[i + 1][j], rows[i][j + 1]);
  const changes: ParagraphChange[] = [];
  let i = 0, j = 0;
  while (i < a.length || j < b.length) {
    if (i < a.length && j < b.length && a[i] === b[j]) { changes.push({ type: "kept", text: a[i++] }); j++; }
    else if (i < a.length && (j === b.length || rows[i + 1][j] >= rows[i][j + 1])) changes.push({ type: "removed", text: a[i++] });
    else changes.push({ type: "added", text: b[j++] });
  }
  return changes;
}
