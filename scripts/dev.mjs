/*
 * Runs `astro dev` and copies its output to tmp/dev.log, so an agent can read the errors of a dev
 * server it did not start instead of starting a second one. The log restarts with each run.
 */
import { spawn } from "node:child_process";
import { createWriteStream, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";

mkdirSync("tmp", { recursive: true });
const log = createWriteStream("tmp/dev.log");
const astro = fileURLToPath(new URL("../node_modules/astro/bin/astro.mjs", import.meta.url));
const child = spawn(process.execPath, [astro, "dev", ...process.argv.slice(2)], {
  stdio: ["inherit", "pipe", "pipe"],
  env: { ...process.env, FORCE_COLOR: process.env.FORCE_COLOR ?? "1" },
});
log.write(`astro dev started ${new Date().toISOString()}, process ${child.pid}\n`);
const ansi = /\x1b\[[\d;]*m/g;
for (const [source, target] of [
  [child.stdout, process.stdout],
  [child.stderr, process.stderr],
]) {
  source.on("data", (chunk) => {
    target.write(chunk);
    log.write(chunk.toString().replace(ansi, ""));
  });
}
// Ctrl+C reaches astro as well; wait for it to shut down rather than leaving it orphaned.
process.on("SIGINT", () => {});
child.on("exit", (code, signal) => {
  log.end(`astro dev exited (${signal ?? code})\n`);
  process.exitCode = code ?? 1;
});
