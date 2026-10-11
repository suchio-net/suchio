import type { APIRoute } from "astro";
import { env } from "cloudflare:workers";
import reports from "virtual:suchio/audit-reports";
import { handleAuditVisit } from "@/server/audit-measurement";
import { logFailure } from "@/server/log";
import { withinRateLimit } from "@/server/rate-limit";

export const prerender = false;

const noStore = { "Cache-Control": "no-store" };

export const ALL: APIRoute = async ({ request }) => {
  try {
    if (request.method === "POST" && !(await withinRateLimit(request, env.CONTACT_RATE_LIMITER, "audit-consent"))) {
      return new Response(null, { status: 429, headers: noStore });
    }
    return await handleAuditVisit(request, env.AUDIT_DB, reports);
  } catch (error) {
    logFailure("audit.visit_failed", error);
    return new Response(null, { status: 503, headers: noStore });
  }
};
