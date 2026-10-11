import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import react from "@astrojs/react";
import i18nConfig from "./src/i18n/config.json" with { type: "json" };
import { redirects as draftRedirects } from "./src/entwurf/hw/v1/routes.mjs";
import { auditReportsIntegration } from "./src/integrations/audit-reports";
import { securityHeadersIntegration } from "./src/integrations/security-headers";
import { legacyServiceRoutes } from "./src/lib/public-routes";

export default defineConfig({
  site: "https://suchio.net",
  trailingSlash: "never",
  build: { format: "file" },
  i18n: {
    locales: Object.keys(i18nConfig.locales),
    defaultLocale: i18nConfig.defaultLocale,
    routing: { prefixDefaultLocale: false },
  },
  redirects: {
    ...draftRedirects,
    // Old service slugs stay reachable.
    ...Object.fromEntries(legacyServiceRoutes.map(({ from, to }) => [from, { status: 308, destination: to }])),
  },
  // Hovered links load ahead of the click, as the former client router did.
  prefetch: { prefetchAll: true, defaultStrategy: "hover" },
  adapter: cloudflare({ imageService: "passthrough" }),
  integrations: [react(), auditReportsIntegration(), securityHeadersIntegration()],
  session: false,
  server: { host: "127.0.0.1", port: 3000 },
  vite: {
    plugins: [
      {
        name: "suchio:parkhotel-draft",
        apply: "serve",
        enforce: "post",
        configureServer(server) {
          return () => {
            // Resolve the public HTML draft before Astro's trailing-slash guard.
            server.middlewares.stack.unshift({
              route: "",
              handle(request, _response, next) {
                const url = new URL(request.url ?? "/", "http://localhost");
                if (
                  (request.method === "GET" || request.method === "HEAD") &&
                  (url.pathname === "/entwurf/parkhotel" || url.pathname === "/entwurf/parkhotel/")
                ) {
                  request.url = `/entwurf/parkhotel/index.html${url.search}`;
                }
                next();
              },
            });
          };
        },
      },
    ],
  },
});
