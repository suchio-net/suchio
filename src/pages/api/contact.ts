import type { APIRoute } from "astro";
import { env } from "cloudflare:workers";
import { handleContactRequest } from "@/server/contact-handler";
import { contactError } from "@/server/contact-response";
import { logFailure } from "@/server/log";
import { withinRateLimit } from "@/server/rate-limit";

export const prerender = false;

export const ALL: APIRoute = async ({ request }) => {
  if (request.method !== "POST") return new Response(null, { status: 405, headers: { Allow: "POST" } });
  try {
    // Anonymous form: a generous per-IP burst limit also permits shared networks.
    if (!(await withinRateLimit(request, env.CONTACT_RATE_LIMITER, "contact"))) return contactError("rate_limited", 60);
  } catch (error) {
    logFailure("contact.rate_limit_unavailable", error);
    return contactError("unavailable");
  }
  return handleContactRequest(request, {
    apiKey: env.RESEND_API_KEY,
    to: env.CONTACT_EMAIL_TO,
    from: env.CONTACT_EMAIL_FROM,
  });
};
