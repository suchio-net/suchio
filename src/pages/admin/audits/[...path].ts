import type { APIRoute } from "astro";
import { env } from "cloudflare:workers";
import reports from "virtual:suchio/audit-reports";
import { handleAuditAdmin } from "@/server/audit-admin";
import { logFailure } from "@/server/log";

export const prerender = false;

export const ALL: APIRoute = async ({ request }) => {
  try {
    return await handleAuditAdmin(request, env, reports);
  } catch (error) {
    logFailure("audit.admin_failed", error);
    return new Response("Auswertung vorübergehend nicht verfügbar.", {
      status: 503,
      headers: { "Cache-Control": "no-store", "X-Robots-Tag": "noindex" },
    });
  }
};
