# Suchio

The German, English, and French website for Suchio, an independent digital growth and technology studio. Built with Astro, TypeScript, and Tailwind CSS on Cloudflare Workers. React islands retain the existing Motion illustrations, contact form, and audit consent controls. Navigation uses an Astro component and a small browser script. Public pages are prerendered HTML; dynamic handlers use Workers, D1, and Resend.

## Local development

Use Bun 1.4.0, as pinned in `package.json` and CI, with Node 24 for the Astro CLI and preview host.

```sh
bun ci
bun run dev
```

The Astro development server runs at `http://127.0.0.1:3000`, using Cloudflare's local Workers runtime. There is one development and production framework path. `bun install` also points Git at `.githooks`, whose pre-push hook runs the format, lint, type and test checks (`git push --no-verify` skips it).

### Servers and screenshots

- A dev server on port 3000 belongs to whoever started it. Reuse it and read its errors in `tmp/dev.log`, which `bun run dev` writes. Do not start a second one: Astro allows one per project, and a second run re-optimizes the shared Vite cache under the first, which then answers with 500 errors.
- After dependency changes, restart the dev server; a long-running one keeps pointing at outdated files in `node_modules/.vite`.
- Scripts that look at the built site start their own preview on a separate port and close it: `check:preview`, `check:overflow`, `capture` and `social-cards`. On Windows a preview left running locks `dist`, so stop any preview before `bun run build`.
- For screenshots, run `bun run capture` after a build (or `--dev` against the dev server). It captures pages after their animations end at phone and desktop width, in any locales (`--locales=de,en,fr`), and with `--visuals` puts the offer illustrations side by side. Output goes to `tmp/captures/`. Use it when the in-app preview browser times out.

For local contact delivery, copy `.env.example` to `.env.local` and supply `RESEND_API_KEY`, `CONTACT_EMAIL_TO`, and `CONTACT_EMAIL_FROM`. Use a sender configured in Resend. These values are also required as production Worker bindings; local environment files do not configure production. Development uses local D1 data. Apply its schema with `bunx wrangler d1 migrations apply AUDIT_DB --local` before testing audit consent or administration locally.

## Builds and checks

```sh
bun run build
bun run start
```

The build produces static pages and assets in `dist/client` and the Cloudflare Worker and generated deployment configuration in `dist/server`. Astro preview runs the built application locally through Cloudflare's runtime.

`bun run check` runs `format:check`, `lint`, `typecheck`, `types:workers --check` and `test` in parallel and lists any that fail; it takes about 13 seconds, most of it `astro check`, and the pre-push hook runs it too. Prettier and ESLint keep their caches in `node_modules/.cache`; clear the Prettier cache after upgrading its plugins. Tests cover contact delivery, audit consent and administration, request limits, security reports, locale paths, redirects, and the sitemap. After building, `bun run check:preview` starts the built Worker with local bindings, checks public routes, localized 404s, legacy redirects, metadata, draft pages, draft assets, and whether the social cards still match the page headlines and illustrations, then closes the preview. `bun run check:overflow` plays every indexable page (or just the paths given, such as `/en services/seo`) in Chrome at phone and desktop width and fails if a page ends up wider than the screen; it runs in its own workflow, [.github/workflows/browser.yml](.github/workflows/browser.yml), because deployment builds have no browser. A local health response may indicate missing mail configuration; the production availability check requires it to be ready. The complete verification sequence lives in [.github/workflows/ci.yml](.github/workflows/ci.yml).

## Deployment

With Cloudflare credentials and production mail bindings configured:

```sh
bun run deploy
```

Use `bun run deploy:redirects` for the separate domain-redirect Worker. Both commands run the CI verification sequence first and stop if checks fail or the source changes during verification. Configuration lives in [wrangler.jsonc](wrangler.jsonc) and [wrangler.redirects.jsonc](wrangler.redirects.jsonc). Deployments use the generated `dist/server/wrangler.json`; the source configuration identifies the custom Worker entrypoint used by Astro in development and builds.

For the existing Cloudflare Git integration, set **Settings → Builds → Build command** to `bun run deploy --check-only` and **Deploy command** to `bunx wrangler deploy --config dist/server/wrangler.json`. Use Bun 1.4.0 and Node 24 in that build environment. This runs the same verification sequence before Cloudflare can deploy; GitHub CI alone does not gate a separate Cloudflare build. The [build and deploy commands are separate Cloudflare trigger settings](https://developers.cloudflare.com/workers/ci-cd/builds/api-reference/). Remove any old `build:vinext` or `deploy:vinext` commands. Dashboard settings have to be applied to the account; editing this README does not change them.

To verify the release without publishing:

```sh
bun run deploy --check-only
```

## Editing the site

### Audit measurement and administration

The production Worker serves `/admin/audits` with a built-in login for `contact@suchio.net`. No Cloudflare Access subscription or additional identity provider is used. Only a SHA-256 digest of a generated 256-bit password is provisioned as a Worker secret. Human-chosen low-entropy passwords are not supported by this verifier. The session is an opaque random token in a Secure, HttpOnly, SameSite=Strict cookie; D1 stores only its hash and the allowed identity. Sessions expire after one hour, logout revokes them server-side, and password rotation invalidates previous sessions. Login attempts are rate-limited; mutation endpoints require same-origin POSTs. Missing configuration fails closed.

Provision the credential with `bun scripts/setup-audit-admin.mjs`. It writes the login details only to ignored `.wrangler/audit-admin-login.txt` and provisions the password digest via Wrangler. Store the password in a password manager and remove this local plaintext file afterward. Use `--resume` if provisioning failed or `--rotate` for a new password. No paid plan should be activated for this feature; it uses the existing Worker and D1 resources within their applicable quotas.

The EU-jurisdiction D1 database is bound as `AUDIT_DB`; schema files live in `migrations/audit-visits`. Apply locally with `bunx wrangler d1 migrations apply AUDIT_DB --local`, and to production with `bunx wrangler d1 migrations apply AUDIT_DB --remote` before deployment. Deploy through the verification command above. Then check logged-out denial, login, logout and session replay denial, link checks, a consent followed by withdrawal, and the scheduled cleanup. Never describe configuration alone as a successful live login.

The dashboard shows **confirmed visits**, not unique readers or complete traffic. Declining leaves the full report accessible. Per-report receipts prevent duplicate submissions; no automatic recount occurs on reload. Preview links use `?audit_preview=1`. The separate link check verifies the published HTML's report marker, not rendering or form delivery. Records expire after 30 days and an hourly cron purges them. At campaign closure or report-wide withdrawal, use **Messdaten löschen** for each affected report; campaign closure is a manual operation. Before reusing restored backups, run the expiry purge and reapply any intervening deletions. Provider backups and security logs have separate retention rules. Preserve the versioned consent text while records referring to it exist.

Focused verification: `bun test tests/audit-measurement.spec.ts`.

- Routes and API endpoints: `src/pages`; HTML document and metadata: `src/layouts/site-layout.astro`; production Worker entry point: `src/worker.ts`.
- Shared UI and page compositions: `src/components`.
- Localized copy and locale configuration: `src/i18n`; FAQ and audit data: `src/content`.
- Design tokens and global styles: `src/styles`.
- Unit tests for the Worker endpoints: `tests`.

German is the default locale. Locale configuration is defined in [src/i18n/config.json](src/i18n/config.json).

Contact drafts use tab-scoped `sessionStorage` to survive page and language changes. Successful submission clears the draft and retry ID; server rendering never reads either. Blocked browser storage falls back to page memory with the existing unload warning. The privacy policy describes this behavior in each locale.

### Fonts, images, and client drafts

Font files live in `src/assets/fonts`, so builds serve them with hashed, immutably cached URLs. DM Sans uses `font-display: optional` (text never switches fonts mid-visit) and only its Latin subset is preloaded. After updating the Fontsource packages, run `bun scripts/sync-fonts.mjs` to refresh the files and their `@font-face` CSS. The Astro Fonts API is not used: it lets the Fontsource CSS override `display` and does not expose subsets for a Latin-only preload.

Drafts stay in this app and are excluded from indexing. Their GSAP, Lenis, and Three.js modules load only on draft routes. Suchio's 2D illustrations use Motion, except the SEO illustration, which uses GSAP and SplitText; its chunk loads only when the illustration nears the viewport. Static pages such as About load no React runtime.

Client concepts live at `/projekte/<client>`, with their code in `src/projekte/<client>/`, thin routes in `src/pages/projekte/<client>/`, and static files in `public/projekte/<client>/`.

Handwerker.work's Website A and Website B share `src/projekte/handwerker-work/shared/`: content, the photo manifest, schema helpers, and picture/note/draft-tool components. Each website owns its layout, navigation and page compositions in `website-a/` or `website-b/`. The 20 original photos live in `src/projekte/handwerker-work/photos/`; `src/integrations/draft-images.ts` generates shared AVIF/WebP files in `public/projekte/handwerker-work/img/` for development and builds. Derivatives and the `.astro/draft-images` cache are ignored by Git. The cache key includes the original, widths, encoder versions, and processing settings. Generation preserves the approved sharpening and quality; Astro's default image transforms do not reproduce that treatment, so these prepared assets use the passthrough service. Change photos or widths in the manifest and restart/build to regenerate. Published `/entwurf/hw` pages and assets redirect permanently to the project space; Website A's own subpage redirects remain temporary section links. The unused `/entwurf/handwerker-work` alias is retired. Report provenance and PDF regeneration instructions live in `src/projekte/handwerker-work/analyse/PROVENANCE.md`.

The examples overview at `/examples` and the hotel industry page at `/examples/hotels` are indexable in German, English (`/en`) and French (`/fr`). All locales use English path slugs. Industry concepts live in `src/examples/<industry>/<concept>/`, with thin routes in `src/pages/examples/<industry>/`; client concepts remain in `src/projekte/`. The industry page shows each concept as a tile that opens the concept directly; tiles are registered in `src/examples/<industry>/concepts.ts`, with their copy under `concepts` in `src/i18n/<locale>/examples.ts`.

The hotel concept is served without localization at `/examples/hotels/flughotel-nordtor`, excluded from the sitemap and marked noindex in its meta tag and response header. Its finished HTML lives in `src/examples/hotels/flughotel-nordtor/index.html` and is emitted unchanged by an Astro page. The old `/entwurf/parkhotel`, `/entwurf/parkhotel/` and `/entwurf/parkhotel/index.html` URLs permanently redirect (308) to `/examples/hotels`. An unused social banner is preserved in `src/assets/brand` instead of being deployed.

### Social cards and icons

Every page has a 1200×630 preview card in `public/social` for link previews (Open Graph and X). Indexable pages have their own card per language; legal, audit and error pages use their language's home card. Cards reuse the site's visuals: the home headline with its highlighted word, the localized service illustrations, the services list and the call-to-action buttons. After changing headlines, service copy or illustrations, run `bun run build` and then `bun run social-cards` (needs Chrome or Chromium; set `CHROME_PATH` if it is not found), and commit the updated images with `scripts/social-cards.json`. That file records the headlines and illustration sources the cards were made from; `bun run check:preview` fails when the build no longer matches it. Tests fail if a page has no card or a card has the wrong size.

`bun run icons` regenerates the favicons, Apple touch icon, web app manifest icons and the structured-data logo from the approved mark. Search engines use the 48px multiples; home screen icons fill the square and keep the mark inside the circle Android crops to.

### Dependency maintenance

Dependabot checks the Bun lockfile through the [npm ecosystem](https://docs.github.com/en/code-security/reference/supply-chain-security/supported-ecosystems-and-repositories), and checks GitHub Actions weekly. Review major upgrades against the existing animations and interaction behavior. Fontsource, Fontkit, and Sharp are build tooling; they stay in devDependencies.

The inherited `overrides` deliberately retain these transitive versions while framework dependencies move: `js-yaml` (YAML parsing), `source-map-js` (source maps), `http-cache-semantics` (HTTP caching), `nanoid` (IDs), `brace-expansion@1` and `brace-expansion@5` (glob expansion), and `undici` (HTTP transport). These are resolution constraints, not evidence of a specific vulnerability. `sharp` is pinned to the tested encoder so responsive-image output remains reproducible. Check `bun audit`, upstream requirements, and the full verification sequence when changing or removing a pin; avoid treating a newer major as a drop-in fix. The current resolved tree passes `bun audit`.

### Account configuration and SEO follow-ups

Review [AI Crawl Control](https://developers.cloudflare.com/ai-crawl-control/features/manage-ai-crawlers/) and [managed robots.txt](https://developers.cloudflare.com/bots/additional-configurations/managed-robots-txt/) in the Cloudflare zone so search and answer crawlers intended to discover Suchio are allowed. Repository robots rules cannot override edge blocks. [Crawler Hints](https://developers.cloudflare.com/cache/advanced-configuration/crawler-hints/) can notify participating search engines when cached content changes. These account settings are separate from the deployed code.

The sitemap omits `lastmod` until content has reliable modification timestamps; build time and repository-wide commit time are not page modification dates. Structured data describes only published business facts, with Organization, owner, WebSite, page, service, breadcrumb, and FAQ nodes. `llms.txt` supplies a public text summary, with no claim that it guarantees AI citations.

The domain redirect Worker remains in service. Cloudflare's HTTPS and Redirect Rules can replace it after equivalent rules are configured and verified for HTTP, `www`, paths, and query strings. Removing it first would break those entry points.
