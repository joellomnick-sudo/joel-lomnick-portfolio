import { createHash } from "node:crypto";

export const editingTables = {
  chapter: { table: "tblmZH0nSF2Vb3d6O", fields: ["Draft Text", "Draft Notes"], title: "Chapter Title" },
  frontMatter: { table: "tbluo0P6klxKBta6p", fields: ["Draft Text", "Notes"], title: "Section" },
  person: { table: "tblqbOXAOVDXX2BV3", fields: ["Name", "Relationship or Role", "Birth Date", "Birth Date Status", "Related Chapters", "Source Basis", "Notes", "Story Inclusion"], title: "Name" },
  event: { table: "tblhV7C2T4AMWMciF", fields: ["Event", "Date or Period", "Place", "Source Notes"], title: "Event" },
  world: { table: "tblTBSU9t8pjrqe7A", fields: ["World", "Related Chapters", "Notes"], title: "World" },
  source: { table: "tblcEN8CyK2WjHqoU", fields: ["Source", "Source Link", "Related Chapters", "Notes"], title: "Source" },
} as const;
export type EditingKind = keyof typeof editingTables;
export type EditingFields = Record<string, string>;
export function isEditingKind(value: string): value is EditingKind { return value in editingTables; }
export function revision(fields: EditingFields) {
  return createHash("sha256").update(JSON.stringify(Object.keys(fields).sort().map(key => [key, fields[key]]))).digest("hex");
}
export function editableFields(kind: EditingKind, source: Record<string, unknown>): EditingFields {
  return Object.fromEntries(editingTables[kind].fields.map(name => [name, typeof source[name] === "string" ? source[name] : ""]));
}
export async function editingRequest(path: string, init?: RequestInit) {
  const token = process.env.LIONHEART_AIRTABLE_TOKEN;
  if (!token) throw new Error("The manuscript connection is unavailable.");
  const base = process.env.LIONHEART_AIRTABLE_BASE_ID || "appu7uDUA0BrNXUoC";
  const response = await fetch(`https://api.airtable.com/v0/${base}/${path}`, {
    ...init, cache: "no-store", headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
  });
  if (!response.ok) {
    if (response.status === 401 || response.status === 403) throw new Error("The Airtable connection needs permission to write manuscripts and Versions. Your draft has not been saved.");
    throw new Error(`The manuscript service could not complete this request (${response.status}). Your draft has not been saved.`);
  }
  return response.json();
}
