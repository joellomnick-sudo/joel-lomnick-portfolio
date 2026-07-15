import { spawn } from "node:child_process";
import { once } from "node:events";

const baseURL = "http://127.0.0.1:3010";
const nextServer = spawn(
  process.execPath,
  ["node_modules/next/dist/bin/next", "start", "-p", "3010"],
  {
    env: process.env,
    stdio: ["ignore", "pipe", "pipe"],
    windowsHide: true,
  },
);

nextServer.stdout.pipe(process.stdout);
nextServer.stderr.pipe(process.stderr);

async function waitForServer() {
  const deadline = Date.now() + 180_000;
  while (Date.now() < deadline) {
    if (nextServer.exitCode !== null) {
      throw new Error(`Next.js test server exited with code ${nextServer.exitCode}.`);
    }
    try {
      const response = await fetch(`${baseURL}/api/version`, { cache: "no-store" });
      if (response.ok) return;
    } catch {
      // The server is still starting.
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  throw new Error("Next.js test server did not become ready within 180 seconds.");
}

async function stopServer() {
  if (nextServer.exitCode !== null) return;
  nextServer.kill("SIGTERM");
  await Promise.race([
    once(nextServer, "exit"),
    new Promise((resolve) => setTimeout(resolve, 5_000)),
  ]);
  if (nextServer.exitCode === null) nextServer.kill("SIGKILL");
}

let exitCode = 1;
try {
  await waitForServer();
  const playwright = spawn(
    process.execPath,
    ["node_modules/@playwright/test/cli.js", "test", ...process.argv.slice(2)],
    {
      env: { ...process.env, PLAYWRIGHT_EXTERNAL_SERVER: "1" },
      stdio: "inherit",
      windowsHide: true,
    },
  );
  const [code] = await once(playwright, "exit");
  exitCode = typeof code === "number" ? code : 1;
} finally {
  await stopServer();
}

process.exitCode = exitCode;
