import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import type { AstroIntegration } from "astro";

const virtualId = "virtual:suchio/audit-reports";
const resolvedId = `\0${virtualId}`;

/**
 * Exposes only the code and company of each audit report to server code, so the Worker does
 * not bundle the full report content from `src/content/audits.json`.
 */
export function auditReportsIntegration(): AstroIntegration {
  return {
    name: "suchio:audit-reports",
    hooks: {
      "astro:config:setup": ({ config, updateConfig }) => {
        const source = new URL("src/content/audits.json", config.root);
        updateConfig({
          vite: {
            plugins: [
              {
                name: "suchio:audit-reports",
                resolveId: (id) => (id === virtualId ? resolvedId : undefined),
                async load(id) {
                  if (id !== resolvedId) return;
                  this.addWatchFile(fileURLToPath(source));
                  const audits: { code: string; company: string }[] = JSON.parse(await readFile(source, "utf8"));
                  return `export default ${JSON.stringify(audits.map(({ code, company }) => ({ code, company })))};`;
                },
              },
            ],
          },
        });
      },
    },
  };
}
