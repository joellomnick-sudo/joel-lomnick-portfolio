import { createHash } from "node:crypto";
import { mkdir, readFile, readdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const manifestPath = path.join(root, "data", "publicAssets.json");
const publicDir = path.join(root, "public");
const reportPath = path.join(root, "artifacts", "audits", "public-assets-local.json");
const rawManifest = await readFile(manifestPath, "utf8");
const manifest = JSON.parse(rawManifest);
const failures = [];
const warnings = [];

async function filesUnder(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await filesUnder(absolute));
    if (entry.isFile()) files.push(absolute);
  }
  return files;
}

function projectPath(assetPath) {
  return path.join(root, ...assetPath.replace(/^\//, "").split("/"));
}

async function exists(filePath) {
  try {
    return (await stat(filePath)).isFile();
  } catch {
    return false;
  }
}

async function sha256(filePath) {
  return createHash("sha256").update(await readFile(filePath)).digest("hex");
}

const ids = new Set();
const roles = new Set();
const activePaths = new Set();
const lowerPaths = new Map();
const hashes = new Map();
const active = manifest.assets.filter((asset) => asset.status === "active");
const archived = manifest.assets.filter((asset) => asset.status === "archived");

for (const asset of manifest.assets) {
  if (ids.has(asset.id)) failures.push(`Duplicate asset id: ${asset.id}`);
  ids.add(asset.id);
  if (roles.has(asset.role)) failures.push(`Duplicate asset role: ${asset.role}`);
  roles.add(asset.role);
  if (asset.replacementAssetId && !manifest.assets.some((candidate) => candidate.id === asset.replacementAssetId)) {
    failures.push(`Missing replacement asset ${asset.replacementAssetId} for ${asset.id}`);
  }
}

for (const asset of active) {
  if (!asset.publicPath || asset.archivePath) {
    failures.push(`Active asset ${asset.id} must have only a publicPath`);
    continue;
  }
  if (!/^\/[a-z0-9./-]+$/.test(asset.publicPath)) failures.push(`Unsafe public path: ${asset.publicPath}`);
  const lowered = asset.publicPath.toLowerCase();
  if (lowerPaths.has(lowered)) failures.push(`Case-insensitive public path collision: ${asset.publicPath}`);
  lowerPaths.set(lowered, asset.id);
  activePaths.add(asset.publicPath);
  const absolute = path.join(publicDir, ...asset.publicPath.replace(/^\//, "").split("/"));
  if (!await exists(absolute)) {
    failures.push(`Missing active file: ${asset.publicPath}`);
    continue;
  }
  const actualHash = await sha256(absolute);
  if (asset.sha256 !== actualHash) failures.push(`Hash mismatch for ${asset.id}: expected ${asset.sha256}, received ${actualHash}`);
  const hashOwners = hashes.get(actualHash) || [];
  hashOwners.push(asset.id);
  hashes.set(actualHash, hashOwners);
  if (asset.type === "pdf" && (!Number.isInteger(asset.pageCount) || asset.pageCount < 1)) failures.push(`Missing PDF page count: ${asset.id}`);
  if (!asset.usedBy.length) warnings.push(`Active asset has no declared consumer: ${asset.id}`);
}

for (const asset of archived) {
  if (asset.publicPath || !asset.archivePath) {
    failures.push(`Archived asset ${asset.id} must have only an archivePath`);
    continue;
  }
  if (!await exists(projectPath(asset.archivePath))) failures.push(`Missing archived file: ${asset.archivePath}`);
}

const publicFiles = (await filesUnder(publicDir)).map((file) => `/${path.relative(publicDir, file).replaceAll("\\", "/")}`);
for (const file of publicFiles) if (!activePaths.has(file)) failures.push(`Unregistered public file: ${file}`);
for (const [hash, owners] of hashes) if (owners.length > 1) failures.push(`Exact duplicate active files (${hash}): ${owners.join(", ")}`);

const sourceRoots = ["app", "components", "data", "tests"];
const literalPattern = /["'`]\/(?:images|documents)\/[a-zA-Z0-9_./-]+|["'`]\/og(?:-image)?\.[a-z]+/g;
for (const sourceRoot of sourceRoots) {
  for (const file of await filesUnder(path.join(root, sourceRoot))) {
    if (!/\.(?:ts|tsx|js|mjs|json)$/.test(file) || file === manifestPath) continue;
    const contents = await readFile(file, "utf8");
    const matches = contents.match(literalPattern) || [];
    for (const match of matches) failures.push(`Hard-coded public asset path in ${path.relative(root, file)}: ${match.slice(1)}`);
  }
}

const report = {
  generatedAt: new Date().toISOString(),
  manifestVersion: manifest.manifestVersion,
  manifestHash: createHash("sha256").update(JSON.stringify(manifest)).digest("hex"),
  counts: { registered: manifest.assets.length, active: active.length, archived: archived.length, publicFiles: publicFiles.length },
  failures,
  warnings,
};

await mkdir(path.dirname(reportPath), { recursive: true });
await writeFile(reportPath, `${JSON.stringify(report, null, 2)}\n`);
console.log(`Public asset audit: ${failures.length} failure(s), ${warnings.length} warning(s)`);
console.log(`Manifest ${report.manifestVersion}: ${report.manifestHash}`);
console.log(`Active ${active.length}; archived ${archived.length}; public files ${publicFiles.length}`);
for (const failure of failures) console.error(`FAIL ${failure}`);
for (const warning of warnings) console.warn(`WARN ${warning}`);
if (failures.length) process.exitCode = 1;
