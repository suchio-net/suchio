// Sent with every response. Pages also carry a hash-based policy (src/integrations/security-headers.ts);
// this header adds the directives a <meta> policy cannot set.
export const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value:
      "object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'self'; report-uri /api/security-report",
  },
  { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
] as const;
