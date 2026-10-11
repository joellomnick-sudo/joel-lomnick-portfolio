import { createHash } from "node:crypto";
import { inflateRawSync } from "node:zlib";

export const bookEditions = {
  one: { filename: "Lionheart_Volume_I_2026-10-11.pdf", sha256: "be2b46c5b061f73de75cb2dc858a76ff60dcaafe1eb43936f1f2c310644c403d", title: "The Making of Lionheart" },
  two: { filename: "Lionheart_Volume_II_2026-10-11.pdf", sha256: "c8cf26f3455b2e6246e87beb12ebcd5815ddf3e2a3ea723251bad68997e350f9", title: "The Cost of Being Lionheart" },
} as const;

// Read only the requested, checksum-pinned PDF. Never extract archive paths to disk.
export function extractEdition(zip: Buffer, volume: keyof typeof bookEditions) {
  let end = zip.length - 22;
  const minimum = Math.max(0, zip.length - 65557);
  while (end >= minimum && zip.readUInt32LE(end) !== 0x06054b50) end--;
  if (end < minimum) throw new Error("Invalid book archive");
  const entries = zip.readUInt16LE(end + 10);
  let offset = zip.readUInt32LE(end + 16);
  const edition = bookEditions[volume];
  for (let i = 0; i < entries; i++) {
    if (offset + 46 > zip.length || zip.readUInt32LE(offset) !== 0x02014b50) throw new Error("Invalid book entry");
    const method = zip.readUInt16LE(offset + 10);
    const size = zip.readUInt32LE(offset + 20);
    const outputSize = zip.readUInt32LE(offset + 24);
    const nameLength = zip.readUInt16LE(offset + 28);
    const extraLength = zip.readUInt16LE(offset + 30);
    const commentLength = zip.readUInt16LE(offset + 32);
    const local = zip.readUInt32LE(offset + 42);
    const name = zip.subarray(offset + 46, offset + 46 + nameLength).toString("utf8").replace(/^\/+/, "");
    if (name === edition.filename) {
      if (outputSize > 10_000_000 || local + 30 > zip.length || zip.readUInt32LE(local) !== 0x04034b50) throw new Error("Invalid book size");
      const start = local + 30 + zip.readUInt16LE(local + 26) + zip.readUInt16LE(local + 28);
      if (start + size > zip.length) throw new Error("Incomplete book archive");
      const compressed = zip.subarray(start, start + size);
      const pdf = method === 0 ? compressed : method === 8 ? inflateRawSync(compressed, { maxOutputLength: 10_000_000 }) : null;
      if (!pdf || pdf.length !== outputSize || !pdf.subarray(0, 5).equals(Buffer.from("%PDF-")) || createHash("sha256").update(pdf).digest("hex") !== edition.sha256) throw new Error("Book edition verification failed");
      return pdf;
    }
    offset += 46 + nameLength + extraLength + commentLength;
  }
  throw new Error("The selected edition is not in the book folder");
}

export async function fetchEdition(volume: keyof typeof bookEditions) {
  const configured = process.env.LIONHEART_BOOK_FOLDER_URL;
  if (!configured) throw new Error("The book folder is not configured");
  const url = new URL(configured);
  if (url.protocol !== "https:" || url.hostname !== "www.dropbox.com") throw new Error("Invalid book folder");
  url.searchParams.set("dl", "1");
  const response = await fetch(url, { cache: "no-store", signal: AbortSignal.timeout(45000) });
  if (!response.ok) throw new Error("Book folder unavailable");
  const archive = Buffer.from(await response.arrayBuffer());
  if (archive.length > 25_000_000) throw new Error("Book folder exceeds download limit");
  return extractEdition(archive, volume);
}
