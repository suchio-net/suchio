// Refresh the checked-in font files and their @font-face CSS after updating the @fontsource packages.
// The files live in src/assets so the build gives them hashed, immutably cached URLs.
const target = "src/assets/fonts";

const sans = "node_modules/@fontsource-variable/google-sans-flex";
// scripts/fonts/build-google-sans-flex.py builds the font files; this script writes their license and CSS.
const subsets = ["latin-ext", "latin"];
await Bun.write(`${target}/Google-Sans-Flex-OFL.txt`, Bun.file(`${sans}/LICENSE`));
const sansSource = await Bun.file(`${sans}/rond.css`).text();
// "optional" keeps the fallback font for the whole visit when the font misses the first paint, so text never shifts.
const sansCss = subsets
  .map(
    (subset) =>
      sansSource.match(new RegExp(`/\\* google-sans-flex-${subset}-rond-normal \\*/\\s*@font-face \\{[^}]+\\}`))[0],
  )
  .join("\n\n")
  .replaceAll("font-display: swap", "font-display: optional")
  .replaceAll("font-weight: 1 1000", "font-weight: 300 800")
  .replaceAll("-rond-normal", "-rounded")
  .replaceAll("url(./files/", "url(../assets/fonts/");
await Bun.write("src/styles/fonts.css", `${sansCss}\n`);
console.log("Updated Google Sans Flex license and CSS.");

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
