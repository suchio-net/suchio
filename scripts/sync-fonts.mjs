// Refresh the checked-in font files and their @font-face CSS after updating the @fontsource packages.
// The files live in src/assets so the build gives them hashed, immutably cached URLs.
const target = "src/assets/fonts";

const sans = "node_modules/@fontsource-variable/dm-sans";
for (const subset of ["latin", "latin-ext"]) {
  const file = `dm-sans-${subset}-standard-normal.woff2`;
  await Bun.write(`${target}/${file}`, Bun.file(`${sans}/files/${file}`));
}
await Bun.write(`${target}/DM-Sans-OFL.txt`, Bun.file(`${sans}/LICENSE`));
// "optional" keeps the fallback font for the whole visit when the font misses the first paint, so text never shifts.
const sansCss = (await Bun.file(`${sans}/standard.css`).text())
  .replaceAll("font-display: swap", "font-display: optional")
  .replaceAll("url(./files/", "url(../assets/fonts/");
await Bun.write("src/styles/fonts.css", sansCss);
console.log("Updated DM Sans subsets, license and CSS.");

const mono = "node_modules/@fontsource/jetbrains-mono";
let monoCss = "";
for (const weight of [400, 500]) {
  const file = `jetbrains-mono-latin-${weight}-normal.woff2`;
  await Bun.write(`${target}/${file}`, Bun.file(`${mono}/files/${file}`));
  // Every supported browser loads WOFF2, so the WOFF fallback is dropped.
  monoCss += (await Bun.file(`${mono}/latin-${weight}.css`).text())
    .replace(/,\s*url\(\.\/files\/[^)]+\.woff\) format\(["']woff["']\)/, "")
    .replaceAll("url(./files/", "url(../assets/fonts/");
}
await Bun.write(`${target}/JetBrains-Mono-OFL.txt`, Bun.file(`${mono}/LICENSE`));
await Bun.write("src/styles/mono-fonts.css", monoCss);
console.log("Updated JetBrains Mono files, license and CSS.");
