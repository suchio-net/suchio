import { expect, test } from "bun:test";
import { draftRedirect } from "../src/lib/draft-redirect";

const location = (path: string) => draftRedirect(new URL(path, "https://suchio.net"))?.headers.get("location");

test("old draft assets go to their shared location, not the broad project path", () => {
  expect(location("/entwurf/hw/v1/img/bad-led-480.webp")).toBe("/projekte/handwerker-work/img/bad-led-480.webp");
  expect(location("/entwurf/hw/v1/badges/myhammer.webp")).toBe("/projekte/handwerker-work/badges/myhammer.webp");
  expect(location("/entwurf/hw/v1/fonts/dm-sans-latin-opsz-normal.woff2")).toBe(
    "/projekte/handwerker-work/website-a/fonts/dm-sans-latin-opsz-normal.woff2",
  );
  expect(location("/entwurf/hw/v2/fonts/d-din.woff2")).toBe("/projekte/handwerker-work/website-b/fonts/d-din.woff2");
});

test("other draft paths keep their path and query below the project", () => {
  expect(location("/entwurf/hw/analyse.pdf")).toBe("/projekte/handwerker-work/analyse.pdf");
  expect(location("/entwurf/hw/v2/img/x.webp?v=1")).toBe("/projekte/handwerker-work/v2/img/x.webp?v=1");
  expect(draftRedirect(new URL("https://suchio.net/entwurf/hw/x"))?.status).toBe(308);
});

test("paths outside the old draft folder are not redirected", () => {
  expect(location("/entwurf/hw")).toBeUndefined();
  expect(location("/projekte/handwerker-work/img/a.webp")).toBeUndefined();
  expect(location("/")).toBeUndefined();
});
