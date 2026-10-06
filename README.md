# Suchio

The German, English, and French website for Suchio, an independent digital growth and technology studio. Built with Astro, TypeScript, and Tailwind CSS on Cloudflare Workers. React islands retain the existing Motion animations, navigation, contact form, and audit consent controls. Public pages are prerendered HTML; dynamic handlers use Workers, D1, and Resend.

## Local development

Use Bun 1.4.0, as pinned in `package.json` and CI.

```sh
bun ci
bun run dev
```

The Astro development server runs at `http://127.0.0.1:3000`, using Cloudflare's local Workers runtime. There is one development and production framework path.

For local contact delivery, copy `.env.example` to `.env.local` and supply `RESEND_API_KEY`, `CONTACT_EMAIL_TO`, and `CONTACT_EMAIL_FROM`. Use a sender configured in Resend. These values are also required as production Worker bindings; local environment files do not configure production. Development uses local D1 data. Apply its schema with `bunx wrangler d1 migrations apply AUDIT_DB --local` before testing audit consent or administration locally.

## Builds and checks

```sh
bun run build
bun run start
```

The build produces static pages and assets in `dist/client` and the Cloudflare Worker and generated deployment configuration in `dist/server`. Astro preview runs the built application locally through Cloudflare's runtime.

Checks are `bun run lint`, `bun run typecheck`, and `bun run test` (unit tests for the contact form, audit measurement, request limits, and security reports). The complete verification sequence lives in [.github/workflows/ci.yml](.github/workflows/ci.yml).

## Deployment

With Cloudflare credentials and production mail bindings configured:

```sh
bun run deploy
```

Use `bun run deploy:redirects` for the separate domain-redirect Worker. Both commands run the CI verification sequence first and stop if checks fail or the source changes during verification. Configuration lives in [wrangler.jsonc](wrangler.jsonc) and [wrangler.redirects.jsonc](wrangler.redirects.jsonc). Deployments use the generated `dist/server/wrangler.json`; the source configuration identifies the custom Worker entrypoint used by Astro in development and builds.

For the existing Cloudflare Git integration, set **Settings → Builds → Build command** to `bun run build` and **Deploy command** to `bunx wrangler deploy --config dist/server/wrangler.json`. These dashboard settings are separate from repository scripts; remove any old `build:vinext` or `deploy:vinext` commands. GitHub CI runs the browser and release checks; the Cloudflare build generates and deploys the application.

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

- Routes and API endpoints: `src/pages`; HTML document and metadata: `src/layouts/site-layout.astro`; production Worker entry point: `src/cloudflare-worker.ts`.
- Shared UI and page compositions: `src/components`.
- Localized copy and locale configuration: `src/i18n`; FAQ and audit data: `src/content`.
- Design tokens and global styles: `src/styles`.
- Unit tests for the Worker endpoints: `tests`.

German is the default locale. Locale configuration is defined in [src/i18n/config.json](src/i18n/config.json).
