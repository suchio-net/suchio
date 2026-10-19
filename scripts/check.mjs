import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

const tasks = [["format:check"], ["lint"], ["typecheck"], ["types:workers", "--check"], ["test"]];
const cwd = fileURLToPath(new URL("../", import.meta.url));
const started = performance.now();

const results = await Promise.all(
  tasks.map(
    (task) =>
      new Promise((resolve) => {
        const name = task.join(" ");
        const start = performance.now();
        const output = [];
        // Spawn the executable directly: no shell quoting or platform-specific command syntax.
        const child = spawn("bun", ["run", ...task], {
          cwd,
          stdio: ["ignore", "pipe", "pipe"],
          windowsHide: true,
        });
        child.stdout.on("data", (chunk) => output.push(chunk));
        child.stderr.on("data", (chunk) => output.push(chunk));
        child.on("error", (error) => output.push(Buffer.from(`${error.message}\n`)));
        child.on("close", (code, signal) => {
          const passed = code === 0;
          const seconds = ((performance.now() - start) / 1000).toFixed(2);
          const details = Buffer.concat(output).toString();
          process.stdout.write(
            `\n[${passed ? "PASS" : "FAIL"}] ${name} (${seconds}s${passed ? "" : `, exit ${signal ?? code}`})\n` +
              details +
              (details.endsWith("\n") ? "" : "\n"),
          );
          resolve({ name, passed });
        });
      }),
  ),
);

const failed = results.filter((result) => !result.passed);
const seconds = ((performance.now() - started) / 1000).toFixed(2);
console.log(
  `\n${failed.length ? "FAIL" : "PASS"}: ${results.length - failed.length}/${results.length} checks passed in ${seconds}s${failed.length ? `; failed: ${failed.map((result) => result.name).join(", ")}` : ""}`,
);
process.exitCode = failed.length ? 1 : 0;
