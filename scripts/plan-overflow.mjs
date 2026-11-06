import { execFileSync } from "node:child_process";
import { appendFileSync, existsSync, readFileSync } from "node:fs";
import { affectedPaths } from "./lib/overflow-plan.mjs";

const event = JSON.parse(readFileSync(process.env.GITHUB_EVENT_PATH, "utf8"));
let paths = null;
try {
  // Pull requests check the merge checkout against its base. Pushes include every pushed commit.
  const base =
    process.env.GITHUB_EVENT_NAME === "pull_request"
      ? event.pull_request.base.sha
      : process.env.GITHUB_EVENT_NAME === "push"
        ? event.before
        : null;
  if (base && /^[a-f0-9]{40}$/.test(base) && !/^0+$/.test(base)) {
    try {
      execFileSync("git", ["cat-file", "-e", `${base}^{commit}`], { stdio: "ignore" });
    } catch {
      execFileSync("git", ["fetch", "--depth=1", "origin", base], { stdio: "pipe" });
    }
    const files = execFileSync("git", ["diff", "--name-only", "--no-renames", "-z", base, "HEAD", "--"], {
      encoding: "utf8",
    })
      .split("\0")
      .filter(Boolean);
    if (files.every((file) => existsSync(file))) paths = affectedPaths(files);
  }
} catch (error) {
  console.warn(`Cannot determine changed routes; checking all pages. ${error.message}`);
}
const matrix = { shard: paths ? ["1/1"] : ["1/3", "2/3", "3/3"] };
console.log(
  paths ? `Checking affected routes: ${paths.join(", ")}` : "Checking all sitemap pages across three runners.",
);
appendFileSync(process.env.GITHUB_OUTPUT, `matrix=${JSON.stringify(matrix)}\npaths=${JSON.stringify(paths)}\n`);
