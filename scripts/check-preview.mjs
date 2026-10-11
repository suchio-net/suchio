import { preview } from "astro";
import { spawn } from "node:child_process";

// Uses the built Worker with local bindings; no deployment or mail delivery occurs.
const server = await preview({ server: { host: "127.0.0.1", port: 4310 } });
try {
  // Astro's preview host uses Node, just like the Astro CLI. Bun runs the TypeScript-aware checker.
  const checker = spawn("bun", ["scripts/check-site.mjs", `http://127.0.0.1:${server.port}`], { stdio: "inherit" });
  await new Promise((resolve, reject) => {
    checker.once("error", reject);
    checker.once("exit", (code) => (code === 0 ? resolve() : reject(new Error(`Preview checks failed (${code})`))));
  });
} finally {
  await server.stop();
}
