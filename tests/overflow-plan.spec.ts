import { expect, test } from "bun:test";
import { execFileSync } from "node:child_process";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { affectedPaths, selectOverflowPaths } from "../scripts/lib/overflow-plan.mjs";
import { indexableBasePaths, publicRoutes } from "../src/lib/public-routes";

const indexable = new Set<string>(indexableBasePaths);
const sitemap = publicRoutes.filter(({ basePath }) => indexable.has(basePath)).map(({ pathname }) => pathname);

test("direct page changes include every translation and normalize index routes", () => {
  expect(affectedPaths(["src/pages/[...locale]/about.astro"])).toEqual(["/about", "/en/about", "/fr/about"]);
  expect(affectedPaths(["src/pages/[...locale]/index.astro"])).toEqual(["/", "/en", "/fr"]);
  expect(affectedPaths(["src/pages/[...locale]/examples/index.astro"])).toEqual([
    "/en/examples",
    "/examples",
    "/fr/examples",
  ]);
});

test("shared, dynamic and unknown changes require full coverage", () => {
  for (const file of [
    "src/styles/global.css",
    "src/components/contact-form.tsx",
    "src/i18n/de/about.ts",
    "src/pages/[...locale]/services/[service].astro",
    "bun.lock",
    ".github/workflows/browser.yml",
  ])
    expect(affectedPaths(["src/pages/[...locale]/about.astro", file])).toBeNull();
  expect(affectedPaths([])).toBeNull();
});

test("shards cover every sitemap page exactly once and distribute translations", () => {
  const shards = ["1/3", "2/3", "3/3"].map((shard) => selectOverflowPaths(sitemap, null, shard));
  expect(shards.flat().sort()).toEqual([...sitemap].sort());
  for (const shard of shards) {
    expect(shard).toHaveLength(12);
    expect(shard.filter((path) => ["/", "/en", "/fr"].includes(path))).toHaveLength(1);
  }
});

test("unknown routes fall back to all pages and empty sitemaps fail", () => {
  expect(selectOverflowPaths(sitemap, ["/removed"])).toHaveLength(sitemap.length);
  expect(selectOverflowPaths(sitemap, ["/about", "/en/about", "/fr/about"])).toHaveLength(3);
  expect(() => selectOverflowPaths([], null)).toThrow();
  for (const shard of ["0/3", "4/3", "1/0", "1", "garbage"])
    expect(() => selectOverflowPaths(sitemap, null, shard)).toThrow();
});

test("the CI planner handles multi-commit pushes, pull requests, deletions and full-run events", () => {
  const parent = resolve("tmp/overflow-tests");
  mkdirSync(parent, { recursive: true });
  const cwd = mkdtempSync(`${parent}/repo-`);
  const git = (...args: string[]) =>
    execFileSync("git", args, { cwd, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }).trim();
  const commit = () => {
    git("add", ".");
    git("-c", "user.name=Test", "-c", "user.email=test@example.invalid", "commit", "-qm", "Test change");
    return git("rev-parse", "HEAD");
  };
  const run = (eventName: string, event: object) => {
    const eventPath = resolve(cwd, ".git/event.json");
    const outputPath = resolve(cwd, ".git/output");
    writeFileSync(eventPath, JSON.stringify(event));
    writeFileSync(outputPath, "");
    execFileSync("node", [resolve("scripts/plan-overflow.mjs")], {
      cwd,
      env: { ...process.env, GITHUB_EVENT_NAME: eventName, GITHUB_EVENT_PATH: eventPath, GITHUB_OUTPUT: outputPath },
      stdio: "pipe",
    });
    return Object.fromEntries(
      readFileSync(outputPath, "utf8")
        .trim()
        .split("\n")
        .map((line) => {
          const separator = line.indexOf("=");
          return [line.slice(0, separator), JSON.parse(line.slice(separator + 1))];
        }),
    );
  };
  try {
    git("init", "-q");
    mkdirSync(resolve(cwd, "src/pages/[...locale]"), { recursive: true });
    const page = resolve(cwd, "src/pages/[...locale]/about.astro");
    writeFileSync(page, "Initial page");
    const before = commit();
    writeFileSync(page, "Changed page");
    commit();
    expect(run("push", { before }).paths).toEqual(["/about", "/en/about", "/fr/about"]);
    expect(run("pull_request", { pull_request: { base: { sha: before } } }).matrix.shard).toEqual(["1/1"]);
    expect(run("schedule", {}).matrix.shard).toEqual(["1/3", "2/3", "3/3"]);
    expect(run("workflow_dispatch", {}).paths).toBeNull();
    expect(run("push", { before: "0".repeat(40) }).paths).toBeNull();
    expect(run("push", { before: "a".repeat(40) }).paths).toBeNull();
    rmSync(page);
    commit();
    expect(run("push", { before }).paths).toBeNull();
    writeFileSync(page, "Restored page");
    writeFileSync(resolve(cwd, "shared.css"), "Shared change");
    commit();
    writeFileSync(page, "Another page change");
    commit();
    expect(run("push", { before }).paths).toBeNull();
  } finally {
    rmSync(cwd, { recursive: true, force: true });
  }
});
