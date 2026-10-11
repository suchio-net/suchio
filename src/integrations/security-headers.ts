import { createHash } from "node:crypto";
import { glob, readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import type { AstroIntegration } from "astro";
import { securityHeaders } from "../lib/security-headers";

// Client drafts load the client's own photos, fonts, map and booking engine, so the site policy does not apply there.
const isDraft = (page: string) => page.replaceAll("\\", "/").startsWith("entwurf/");

const hash = (content: string) => `'sha256-${createHash("sha256").update(content).digest("base64")}'`;

/** Hashes of every inline script and style element the built site pages contain. */
async function inlineHashes(pages: { file: URL; html: string }[]) {
  const scripts = new Set<string>();
  const styles = new Set<string>();
  for (const { html } of pages) {
    for (const [, attributes, body] of html.matchAll(/<script([^>]*)>([\s\S]*?)<\/script>/g)) {
      // External scripts are covered by 'self'; JSON-LD is data and never executes.
      if (/\bsrc=/.test(attributes) || /type="application\/ld\+json"/.test(attributes)) continue;
      scripts.add(hash(body));
    }
    for (const [, body] of html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)) styles.add(hash(body));
  }
  return { scripts: [...scripts].sort(), styles: [...styles].sort() };
}

/**
 * Enforces a hash-based Content Security Policy on the site pages and writes the site-wide
 * security headers into Cloudflare's `_headers` file.
 *
 * The policy is a `<meta>` element because the Worker also serves some pages (the home page
 * and localized error pages), where `_headers` rules do not apply. Directives a `<meta>` policy
 * cannot carry (frame-ancestors, report-uri) stay in the header from `securityHeaders`.
 */
export function securityHeadersIntegration(): AstroIntegration {
  return {
    name: "suchio:security-headers",
    hooks: {
      "astro:build:done": async ({ dir, logger }) => {
        const root = fileURLToPath(dir);
        const pages: { file: URL; html: string }[] = [];
        for await (const page of glob("**/*.html", { cwd: root })) {
          if (isDraft(page)) continue;
          const file = new URL(page.replaceAll("\\", "/"), dir);
          pages.push({ file, html: await readFile(file, "utf8") });
        }
        const { scripts, styles } = await inlineHashes(pages);
        const policy = [
          "default-src 'self'",
          `script-src 'self' ${scripts.join(" ")}`,
          `style-src 'self' ${styles.join(" ")}`,
          // Components set custom properties such as reveal delays in style attributes.
          "style-src-attr 'unsafe-inline'",
          "img-src 'self' data: blob:",
          "font-src 'self'",
          "connect-src 'self'",
          "object-src 'none'",
          "base-uri 'self'",
          "form-action 'self'",
        ].join("; ");
        const meta = `<meta http-equiv="Content-Security-Policy" content="${policy}">`;
        for (const { file, html } of pages) {
          if (!html.includes('<meta charset="utf-8">')) throw new Error(`Missing charset meta in ${file.pathname}`);
          await writeFile(file, html.replace('<meta charset="utf-8">', `<meta charset="utf-8">${meta}`));
        }

        const headersFile = new URL("_headers", dir);
        const existing = await readFile(headersFile, "utf8").catch(() => "");
        const reportOnly = `${policy}; frame-ancestors 'self'; report-uri /api/security-report`;
        const site = `/*\n${[...securityHeaders, { key: "Content-Security-Policy-Report-Only", value: reportOnly }]
          .map(({ key, value }) => `  ${key}: ${value}`)
          .join("\n")}\n`;
        const drafts =
          "/entwurf/*\n  ! Content-Security-Policy\n  ! Content-Security-Policy-Report-Only\n  X-Robots-Tag: noindex, nofollow, noarchive\n";
        await writeFile(headersFile, [site, drafts, existing.trim()].filter(Boolean).join("\n") + "\n");
        logger.info(
          `Enforced a Content Security Policy on ${pages.length} pages (${scripts.length} script and ${styles.length} style hashes).`,
        );
      },
    },
  };
}
