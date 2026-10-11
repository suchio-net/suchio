import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import react from "@astrojs/react";
import { redirects } from "./src/entwurf/hw/v1/routes.mjs";

export default defineConfig({
  site: "https://suchio.net",
  trailingSlash: "never",
  build: { format: "file" },
  redirects,
  adapter: cloudflare({ imageService: "passthrough" }),
  integrations: [react()],
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
