import { defineConfig, fontProviders } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import i18nConfig from "./src/i18n/config.json" with { type: "json" };
import { redirects as draftRedirects } from "./src/entwurf/hw/v1/routes.mjs";
import { auditReportsIntegration } from "./src/integrations/audit-reports";
import { securityHeadersIntegration } from "./src/integrations/security-headers";
import { draftImagesIntegration } from "./src/integrations/draft-images";
import { socialImagesIntegration } from "./src/integrations/social-images.mjs";
import { legacyServiceRoutes } from "./src/lib/public-routes";

export default defineConfig({
  site: "https://suchio.net",
  // Resolve the locked Fontsource packages locally; builds never fetch a font CDN.
  fonts: [
    {
      name: "DM Sans Variable",
      cssVariable: "--font-dm-sans",
      provider: fontProviders.npm({ remote: false }),
      options: { package: "@fontsource-variable/dm-sans", file: "standard.css" },
      weights: ["100 1000"],
      styles: ["normal"],
      subsets: ["latin", "latin-ext"],
      display: "optional",
      fallbacks: ["-apple-system", "BlinkMacSystemFont", "system-ui", "sans-serif"],
      optimizedFallbacks: false,
    },
    ...[400, 500].map((weight) => ({
      name: "JetBrains Mono",
      cssVariable: "--font-jetbrains-mono",
      provider: fontProviders.npm({ remote: false }),
      options: { package: "@fontsource/jetbrains-mono", file: `latin-${weight}.css` },
      weights: [weight],
      styles: ["normal"],
      subsets: ["latin"],
      formats: ["woff2"],
      display: "swap",
      fallbacks: ["ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "monospace"],
      optimizedFallbacks: false,
    })),
  ],
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
  integrations: [
    draftImagesIntegration(),
    react(),
    auditReportsIntegration(),
    socialImagesIntegration(),
    securityHeadersIntegration(),
  ],
  session: false,
  server: { host: "127.0.0.1", port: 3000 },
  vite: {
    plugins: [tailwindcss()],
  },
});
