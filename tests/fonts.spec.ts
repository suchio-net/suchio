import { expect, test } from "bun:test";

test("DM Sans keeps optional display so text never swaps fonts mid-visit", async () => {
  const css = await Bun.file("src/styles/fonts.css").text();
  expect(css.match(/font-display: optional/g)?.length).toBe(2);
  expect(css).not.toContain("font-display: swap");
});
