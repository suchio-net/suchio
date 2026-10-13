import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import i18nConfig from "./src/i18n/config.json" with { type: "json" };
import { redirects as draftRedirects } from "./src/entwurf/hw/v1/routes.mjs";
import { auditReportsIntegration } from "./src/integrations/audit-reports";
import { securityHeadersIntegration } from "./src/integrations/security-headers";
import { draftImagesIntegration } from "./src/integrations/draft-images";
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
    "/entwurf/handwerker-work/favicon.svg": "/entwurf/hw/favicon.svg",
    "/entwurf/hw/v1/favicon.svg": "/entwurf/hw/favicon.svg",
    "/entwurf/parkhotel/index.html": "/entwurf/parkhotel",
    // Old service slugs stay reachable.
    ...Object.fromEntries(legacyServiceRoutes.map(({ from, to }) => [from, { status: 308, destination: to }])),
  },
  // Hovered links load ahead of the click, as the former client router did.
  prefetch: { prefetchAll: true, defaultStrategy: "hover" },
  adapter: cloudflare({ imageService: "passthrough" }),
  integrations: [draftImagesIntegration(), react(), auditReportsIntegration(), securityHeadersIntegration()],
  session: false,
  server: { host: "127.0.0.1", port: 3000 },
  vite: {
    plugins: [tailwindcss()],
    // Local screenshots, build output and Wrangler state hold thousands of directories that never
    // feed the site; watching them slows dev startup on Windows.
    server: {
      watch: {
        ignored: ["**/tmp/**", "**/output/**", "**/dist/**", "**/.wrangler/**"],
      },
    },
  },
});
