# Suchio

Astro generates the multilingual public pages and metadata. Cloudflare Workers handle redirects, APIs, audit administration, and scheduled D1 cleanup. React islands own the existing interactive controls and Motion illustrations.

- Use Bun 1.4.0. The commands in package.json and .github/workflows/ci.yml are the current development, build, and verification paths.
- Preserve the public URLs, locale preference behavior, contact drafts, audit consent, accessibility, and existing visuals and animations during refactors.
- Keep localization and audit data out of browser bundles except for the props an interactive component needs.
- Consult current Astro/Cloudflare documentation and the installed adapter before changing framework or runtime integration. Wrangler configuration is in wrangler.jsonc; generated bindings are in src/worker-configuration.d.ts.
- Keep test mail credentials local; production secrets are Worker bindings. Use local D1 bindings for verification.
- Before starting a dev or preview server or taking screenshots, read "Servers and screenshots" in README.md.
- Review copy, illustration and client-concept (`/projekte/<client>`, Website A/B) changes against CODING_STANDARDS.md before handing them back.

## Where files go

- Industry concepts: `src/examples/<industry>/<concept>/`, with thin routes in `src/pages/examples/<industry>/`. These fictional concepts are separate from client concepts in `src/projekte/`.
- Client concepts: `src/projekte/<client>/`, with thin routes in `src/pages/projekte/<client>/` and static files in `public/projekte/<client>/`. Handwerker.work uses `website-a/` and `website-b/` for Website A and Website B.
- Scratch work: `tmp/<task>/`. It is disposable and may be deleted at any time.
- Repo tools write to `tmp/<tool>/`, for example `tmp/captures` and `tmp/dev.log`.
- Client work, emails, price lists and research belong in the private sibling repo `../suchio-intern`, under `kunden/<client>/`, never in this public repo.
