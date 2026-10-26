import { handle } from "@astrojs/cloudflare/handler";
import { defaultLocale, hasLocale, localeCookie, type Locale } from "./i18n/config";
import { draftRedirect } from "./lib/draft-redirect";
import { securityHeaders } from "./lib/security-headers";
import { purgeAdminSessions } from "./server/audit-admin-auth";
import { purgeAuditVisits } from "./server/audit-measurement";
import { logFailure } from "./server/log";

// Worker entry: Astro serves pages and endpoints; this adds what static pages cannot do themselves.
type Env = Pick<CloudflareBindings, "ASSETS" | "AUDIT_DB">;

function cookieLocale(request: Request) {
  const prefix = `${localeCookie}=`;
  const value = request.headers
    .get("cookie")
    ?.split(";")
    .map((entry) => entry.trim())
    .find((entry) => entry.startsWith(prefix))
    ?.slice(prefix.length);
  return value && hasLocale(value) ? value : undefined;
}

function isInternalNavigation(request: Request, url: URL) {
  if (request.headers.get("sec-fetch-site") === "same-origin") return true;
  const referer = request.headers.get("referer");
  if (!referer) return false;
  try {
    return new URL(referer).origin === url.origin;
  } catch {
    return false;
  }
}

/** Adds the site-wide security headers without replacing stricter ones a response already sets. */
function withSecurityHeaders(response: Response) {
  const headers = new Headers(response.headers);
  for (const { key, value } of securityHeaders) if (!headers.has(key)) headers.set(key, value);
  return new Response(response.body, { headers, status: response.status, statusText: response.statusText });
}

function redirect(location: string, locale?: Locale) {
  const headers = new Headers({ location });
  if (locale) headers.set("set-cookie", `${localeCookie}=${locale}; Path=/; Max-Age=31536000; SameSite=Lax; Secure`);
  return new Response(null, { headers, status: 307 });
}

/** Locale redirects that depend on the request: the stored preference and the unprefixed default locale. */
function localeRedirect(request: Request, url: URL) {
  if (request.method !== "GET" && request.method !== "HEAD") return undefined;
  // Internal links (such as the language switcher) reach "/" deliberately; only external entries follow the stored locale.
  if (url.pathname === "/" && !isInternalNavigation(request, url)) {
    const locale = cookieLocale(request) ?? defaultLocale;
    if (locale !== defaultLocale) return redirect(`/${locale}${url.search}`);
  }
  if (url.pathname === `/${defaultLocale}` || url.pathname.startsWith(`/${defaultLocale}/`)) {
    return redirect(`${url.pathname.slice(defaultLocale.length + 1) || "/"}${url.search}`, defaultLocale);
  }
  return undefined;
}

async function localizedNotFound(request: Request, url: URL, env: Env) {
  const locale = url.pathname.split("/")[1];
  const path = locale && hasLocale(locale) && locale !== defaultLocale ? `/${locale}/404` : "/404";
  const page = await env.ASSETS.fetch(new Request(new URL(path, url), { method: request.method }));
  return new Response(page.body, { status: 404, headers: page.headers });
}

export default {
  async scheduled(_controller: ScheduledController, env: Env) {
    const results = await Promise.allSettled([purgeAuditVisits(env.AUDIT_DB), purgeAdminSessions(env.AUDIT_DB)]);
    for (const result of results) if (result.status === "rejected") logFailure("audit.purge_failed", result.reason);
  },
  async fetch(request: Request, env: Env, context: ExecutionContext) {
    const url = new URL(request.url);
    const response = draftRedirect(url) ?? localeRedirect(request, url) ?? (await handle(request, env, context));
    const missingPage = response.status === 404 && (request.method === "GET" || request.method === "HEAD");
    return withSecurityHeaders(missingPage ? await localizedNotFound(request, url, env) : response);
  },
} satisfies ExportedHandler<Env>;
