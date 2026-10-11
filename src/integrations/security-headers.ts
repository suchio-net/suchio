import { readFile, writeFile } from "node:fs/promises";
import type { AstroIntegration } from "astro";
import { securityHeaders } from "../lib/security-headers";

/**
 * Writes the site-wide security headers into Cloudflare's `_headers` file. Any rules
 * already in the file (such as the adapter's immutable cache rule for `/_astro/*`) are kept.
 */
export function securityHeadersIntegration(): AstroIntegration {
  return {
    name: "suchio:security-headers",
    hooks: {
      "astro:build:done": async ({ dir, logger }) => {
        const file = new URL("_headers", dir);
        const existing = await readFile(file, "utf8").catch(() => "");
        const site = `/*\n${securityHeaders.map(({ key, value }) => `  ${key}: ${value}`).join("\n")}\n`;
        // Client drafts load the client's own photos, fonts, map and booking engine, so the site CSP does not apply there.
        const drafts =
          "/entwurf/*\n  ! Content-Security-Policy\n  ! Content-Security-Policy-Report-Only\n  X-Robots-Tag: noindex, nofollow, noarchive\n";
        await writeFile(file, [site, drafts, existing.trim()].filter(Boolean).join("\n") + "\n");
        logger.info("Wrote security headers to _headers.");
      },
    },
  };
}
