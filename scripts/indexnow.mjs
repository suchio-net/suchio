import { siteOrigin } from "../src/lib/site-config.ts";

const key = "0a001c5ee491f6f1902786635dd04184";
const host = "suchio.net";
const keyLocation = new URL(`/${key}.txt`, siteOrigin).href;

async function fetchText(url) {
  const response = await fetch(url, { redirect: "error", signal: AbortSignal.timeout(30_000) });
  if (response.status !== 200) throw new Error(`GET ${url} returned HTTP ${response.status}.`);
  return response.text();
}

function decodeXml(value) {
  const entities = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'" };
  return value.replace(/&(amp|lt|gt|quot|apos|#\d+|#x[\da-f]+);/gi, (_, entity) => {
    if (entity.startsWith("#x")) return String.fromCodePoint(parseInt(entity.slice(2), 16));
    if (entity.startsWith("#")) return String.fromCodePoint(parseInt(entity.slice(1), 10));
    return entities[entity];
  });
}

try {
  const args = process.argv.slice(2);
  if (args.some((argument) => argument !== "--dry-run")) throw new Error("Use only the --dry-run option.");
  const xml = await fetchText(new URL("/sitemap.xml", siteOrigin));
  const urlList = [
    ...new Set(
      [...xml.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/g)]
        .map(([, location]) => new URL(decodeXml(location)))
        .filter((url) => url.host === host)
        .map((url) => url.href),
    ),
  ];
  if (!urlList.length) throw new Error(`The sitemap has no URLs for ${host}.`);
  const body = { host, key, keyLocation, urlList };
  console.log(`IndexNow: ${urlList.length} URLs.`);
  if (args.includes("--dry-run")) {
    console.log(urlList.join("\n"));
    console.log(JSON.stringify(body, null, 2));
    console.log("Dry run: no POST sent. Live key verification runs before submission.");
  } else {
    if ((await fetchText(keyLocation)) !== key)
      throw new Error(`The live key file at ${keyLocation} does not contain the expected IndexNow key.`);
    const response = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(body),
      redirect: "error",
      signal: AbortSignal.timeout(30_000),
    });
    console.log(`IndexNow response: HTTP ${response.status}.`);
    if (response.status !== 200 && response.status !== 202)
      throw new Error(`IndexNow submission failed with HTTP ${response.status}.`);
  }
} catch (error) {
  console.error(`IndexNow failed: ${error instanceof Error ? error.message : String(error)}`);
  process.exitCode = 1;
}
