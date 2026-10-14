/*
 * Generates the 1200×630 social preview cards in public/social/ from the built site.
 *
 * Cards reuse the site's own visuals in every language: the home hero with its highlighted
 * word, the localized service illustrations, the services menu and the call-to-action button.
 * They are captured from the built pages with reduced motion, so illustrations show their
 * final state, and composed in Chrome with the site's DM Sans files.
 *
 * Usage, after `bun run build`: node scripts/social-cards.mjs
 * Requires Chrome or Chromium; set CHROME_PATH if it is not in a standard location.
 * Run it again after changing page headlines, service copy or illustrations; `bun run check:preview`
 * fails while the recorded headlines or illustration sources differ from the build.
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import sharp from "sharp";
import { launchChrome, sitemapPaths, startPreview } from "./lib/browser.mjs";
import { pageHeadlines, recordFile, sourceHash } from "./lib/social-card-inputs.mjs";

const root = new URL("../", import.meta.url);
const outDir = new URL("public/social/", root);

const dataUrl = (bytes, type) => `data:${type};base64,${Buffer.from(bytes).toString("base64")}`;
const fontFile = (name) => readFile(new URL(`src/assets/fonts/${name}`, root));
const fonts = {
  latin: dataUrl(await fontFile("dm-sans-latin-standard-normal.woff2"), "font/woff2"),
  latinExt: dataUrl(await fontFile("dm-sans-latin-ext-standard-normal.woff2"), "font/woff2"),
};
const wordmark = dataUrl(await readFile(new URL("public/suchio-logo-light.svg", root)), "image/svg+xml");
const escape = (text) => text.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);

const server = await startPreview(4330);
const { origin } = server;
const browser = await launchChrome();

try {
  // Indexable pages come from the sitemap: home, about, contact and the services, per language.
  const urls = await sitemapPaths(origin);
  const pages = urls.map((path) => {
    const [, prefix, rest] = path.match(/^\/(en|fr)(\/.*)?$/) ?? [null, "de", path];
    const base = rest ?? "/";
    return { path, locale: prefix, card: base === "/" ? "home" : base.slice(1).replaceAll("/", "-") };
  });

  const capture = await browser.newPage();
  await capture.setViewport({ width: 1280, height: 900, deviceScaleFactor: 2 });
  await capture.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
  const open = async (path) => {
    await capture.goto(origin + path, { waitUntil: "networkidle0" });
    await capture.evaluate(() => document.fonts.ready);
    await new Promise((resolve) => setTimeout(resolve, 900));
  };
  const shot = async (handle) => dataUrl(await handle.screenshot({ omitBackground: true }), "image/png");

  // Read headlines, capture visuals.
  const content = {};
  for (const page of pages) {
    await open(page.path);
    const data = await capture.evaluate(() => {
      const h1 = document.querySelector("main h1");
      const active = document.querySelector("#services-menu a[aria-current=page]");
      const tile = active?.querySelector("span");
      // The menu shows the current page with a white tile; cards use the service colours instead.
      const tokens = { websites: "websites", seo: "search", ads: "campaigns", automation: "automation" };
      const token = active && tokens[active.getAttribute("href").split("/").pop()];
      const theme = getComputedStyle(document.documentElement);
      return {
        // Keeps the page's line breaks; punctuation after the accent stays on the accent's line.
        headline: h1.innerHTML
          .replace(/\s+/g, " ")
          .replace(/(<em\b[^>]*>.*?<\/em>[.,!?]?)/, '<span class="nowrap">$1</span>')
          .trim(),
        copy: h1.nextElementSibling?.matches("p") ? h1.nextElementSibling.textContent.trim() : "",
        service: active && {
          name: active.querySelector("strong").textContent.trim(),
          icon: tile.querySelector("svg").outerHTML,
          background: theme.getPropertyValue(`--color-service-${token}-bg`),
          color: theme.getPropertyValue(`--color-service-${token}-fg`),
        },
      };
    });
    const visual = { ...data };
    const cta = await capture.$("main .pill-button");
    if (cta && page.card !== "about" && page.card !== "contact") {
      const box = await cta.boundingBox();
      visual.cta = { src: await shot(cta), width: box.width, height: box.height };
    }
    if (page.card.startsWith("services-")) {
      const illustration = await capture.evaluateHandle(
        () => document.querySelector("astro-island[component-export=OfferAnimation]").parentElement,
      );
      visual.illustration = await shot(illustration);
    }
    if (page.card === "about") {
      // The four services as the navigation menu lists them, with their icons and colours.
      visual.services = await capture.evaluate(() =>
        [...document.querySelectorAll("#services-menu a")].map((link) => {
          const tile = link.querySelector("span");
          const style = getComputedStyle(tile);
          return {
            name: link.querySelector("strong").textContent.trim(),
            description: link.querySelector("strong + span").textContent.trim(),
            icon: tile.querySelector("svg").outerHTML,
            background: style.backgroundColor,
            color: style.color,
          };
        }),
      );
    }
    if (page.card === "contact") {
      visual.contact = await capture.evaluate(() => {
        const footerMail = document.querySelector('footer a[href^="mailto:"]');
        return { email: footerMail.textContent.trim() };
      });
    }
    content[`${page.locale}-${page.card}`] = visual;
  }
  // Phone and town come from the published organization data.
  await open("/");
  const organization = await capture.evaluate(() => {
    const graph = JSON.parse(document.querySelector('script[type="application/ld+json"]').textContent)["@graph"];
    return graph.find((node) => node["@type"] === "Organization");
  });

  const card = await browser.newPage();
  await card.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });
  await mkdir(outDir, { recursive: true });

  for (const page of pages) {
    const data = content[`${page.locale}-${page.card}`];
    const illustrations = ["websites", "seo", "ads", "automation"].map(
      (slug) => content[`${page.locale}-services-${slug}`].illustration,
    );
    let visual = "";
    if (data.illustration) visual = `<img class="illustration" src="${data.illustration}" alt="">`;
    else if (data.services)
      visual = `<div class="services">${data.services
        .map(
          (service) =>
            `<div class="service"><span class="tile" style="background:${service.background};color:${service.color}">${service.icon}</span><div><strong>${escape(service.name)}</strong><span>${escape(service.description)}</span></div></div>`,
        )
        .join("")}</div>`;
    else if (page.card === "home")
      visual = `<div class="mosaic">${illustrations.map((src) => `<img src="${src}" alt="">`).join("")}</div>`;
    else if (data.contact)
      visual = `<div class="contact">
        <span class="contact-arrow"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg></span>
        <span class="contact-mail">${escape(data.contact.email)}</span>
        <span class="contact-line">${escape(organization.telephone)}</span>
        <span class="contact-line muted">${escape(organization.address.addressLocality)}</span>
      </div>`;

    const label = data.service
      ? `<div class="label"><span class="tile" style="background:${data.service.background};color:${data.service.color}">${data.service.icon}</span>${escape(data.service.name)}</div>`
      : "";
    const cta = data.cta
      ? `<img class="cta" src="${data.cta.src}" style="width:${data.cta.width}px;height:${data.cta.height}px" alt="">`
      : "";
    const html = `<!doctype html><html lang="${page.locale}"><head><meta charset="utf-8"><style>
      @font-face { font-family: "DM Sans"; src: url(${fonts.latinExt}) format("woff2"); font-weight: 100 1000;
        unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+1E00-1EFF, U+2020, U+20A0-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF; }
      @font-face { font-family: "DM Sans"; src: url(${fonts.latin}) format("woff2"); font-weight: 100 1000;
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD; }
      * { box-sizing: border-box; }
      html, body { margin: 0; width: 1200px; height: 630px; overflow: hidden; }
      body { background: #faf9f6; color: #171717; font-family: "DM Sans", sans-serif; -webkit-font-smoothing: antialiased; }
      .card { display: grid; grid-template-columns: 520px 1fr; column-gap: 56px; width: 1200px; height: 630px; padding: 60px 64px 60px 72px; }
      .left { display: flex; flex-direction: column; min-height: 0; }
      .logo { display: block; align-self: flex-start; height: 36px; width: auto; }
      .text { display: flex; flex: 1; flex-direction: column; justify-content: center; min-height: 0; padding: 24px 0; }
      .label { display: flex; align-items: center; gap: 14px; margin-bottom: 26px; font-size: 22px; font-weight: 600; letter-spacing: -0.015em; }
      .tile { display: grid; place-items: center; width: 44px; height: 44px; border-radius: 10px; }
      .tile svg { width: 23px; height: 23px; }
      h1 { margin: 0; font-size: var(--size, 64px); font-weight: 500; line-height: 1.04; letter-spacing: -0.042em; text-wrap: balance; }
      h1 .hero-accent { position: relative; z-index: 0; display: inline-block; margin-right: 0.1em; color: hsl(212 100% 48%);
        font-style: italic; transform: skewX(-9deg); transform-origin: center bottom; }
      h1 .hero-accent::after { content: ""; position: absolute; z-index: -1; inset: 0.08em -0.1em 0.02em 0.04em; border-radius: 3px; background: #fff500; }
      .copy { margin: 24px 0 0; color: #525252; font-size: 24px; line-height: 1.4; letter-spacing: -0.01em; text-wrap: pretty; }
      .cta { display: block; align-self: flex-start; }
      .right { display: flex; align-items: center; justify-content: center; min-width: 0; min-height: 0; }
      .illustration { display: block; width: 100%; max-height: 510px; object-fit: contain; }
      .services { display: grid; gap: 6px; width: 100%; padding: 12px; border-radius: 16px; background: #fff; box-shadow: 0 0 0 1px rgb(0 0 0 / 8%); }
      .service { display: flex; gap: 18px; align-items: flex-start; padding: 18px 20px; border-radius: 10px; }
      .service + .service { box-shadow: 0 -1px 0 rgb(0 0 0 / 6%); border-radius: 0; }
      .service .tile { flex: none; width: 52px; height: 52px; border-radius: 12px; }
      .service .tile svg { width: 26px; height: 26px; }
      .service strong { display: block; font-size: 23px; font-weight: 600; letter-spacing: -0.015em; }
      .service span:not(.tile) { display: block; margin-top: 4px; color: #525252; font-size: 18px; line-height: 1.35; }
      .nowrap { white-space: nowrap; }
      /* The illustrations share the 24:19 stage they have on the site and appear unframed, as they do there. */
      .mosaic { display: grid; grid-template-columns: 1fr 1fr; gap: 20px 16px; width: 100%; }
      .mosaic img { display: block; width: 100%; aspect-ratio: 24 / 19; object-fit: contain; }
      .contact { display: flex; flex-direction: column; justify-content: flex-end; gap: 10px; position: relative; width: 100%; height: 400px; padding: 40px;
        border-radius: 16px; background: #101010; color: #fff; }
      .contact-mail { font-size: 34px; font-weight: 500; letter-spacing: -0.03em; }
      .contact-line { font-size: 24px; letter-spacing: -0.01em; }
      .muted { color: #a3a3a3; }
      .contact-arrow { position: absolute; top: 40px; left: 40px; display: grid; place-items: center; width: 64px; height: 64px; border-radius: 999px; background: #fff; color: #171717; }
      .contact-arrow svg { width: 30px; height: 30px; }
    </style></head><body><div class="card">
      <div class="left">
        <img class="logo" src="${wordmark}" alt="Suchio">
        <div class="text">${label}<h1>${data.headline}</h1>${data.copy && !data.cta ? `<p class="copy">${escape(data.copy)}</p>` : ""}</div>
        ${cta}
      </div>
      <div class="right">${visual}</div>
    </div></body></html>`;

    await card.setContent(html, { waitUntil: "load" });
    await card.evaluate(() => document.fonts.ready);
    // Shrink the headline until the text block fits without clipping.
    const size = await card.evaluate(() => {
      const text = document.querySelector(".text");
      const h1 = document.querySelector("h1");
      let size = document.querySelector(".hero-accent") ? 76 : document.querySelector(".label") ? 52 : 64;
      for (; size > 34; size -= 2) {
        h1.style.setProperty("--size", `${size}px`);
        if (text.scrollHeight <= text.clientHeight + 1) break;
      }
      return size;
    });
    const png = await card.screenshot({ type: "png" });
    const file = new URL(`${page.locale}-${page.card}.png`, outDir);
    await writeFile(file, await sharp(png).png({ compressionLevel: 9, adaptiveFiltering: true }).toBuffer());
    console.log(`public/social/${page.locale}-${page.card}.png (headline ${size}px)`);
  }
  // The former generic card URL keeps working with the German home card.
  await writeFile(new URL("public/suchio-social-card.png", root), await readFile(new URL("de-home.png", outDir)));
  const record = { sources: await sourceHash(), headlines: await pageHeadlines(origin, urls) };
  await writeFile(recordFile, `${JSON.stringify(record, null, 2)}\n`);
} finally {
  await browser.close();
  await server.stop();
}
