import type { APIRoute } from "astro";
import { env } from "cloudflare:workers";
import { logFailure } from "@/server/log";
import { withinRateLimit } from "@/server/rate-limit";
import { handleSecurityReport } from "@/server/security-report";

export const prerender = false;

const noStore = { "Cache-Control": "no-store" };

export const ALL: APIRoute = async ({ request }) => {
  if (request.method === "POST") {
    try {
      if (!(await withinRateLimit(request, env.CONTACT_RATE_LIMITER, "security-report"))) {
        return new Response(null, { status: 429, headers: { ...noStore, "Retry-After": "60" } });
      }
    } catch (error) {
      logFailure("security_report.rate_limit_unavailable", error);
      return new Response(null, { status: 503, headers: noStore });
    }
  }
  return handleSecurityReport(request);
};
