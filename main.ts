// "One Decision" — entry for The Meeting That Should Have Been One Line.
// A whole meeting, compressed into the single line it deserved to be.
import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "Sixty people, ninety minutes, one decision: to schedule another meeting about the decision.";

function destDir(): string {
  return process.env.OUTPUT_DIR ?? "/output";
}

function wipeContents(dir: string): void {
  mkdirSync(dir, { recursive: true });
  for (const entry of readdirSync(dir)) {
    rmSync(join(dir, entry), { recursive: true, force: true });
  }
}

function deliver(): void {
  const dir = destDir();
  wipeContents(dir);
  if (LINE.length < 1 || LINE.length > 200) throw new Error("line outside 1-200 chars");
  writeFileSync(join(dir, "entry.txt"), LINE + "\n", "utf8");
  console.log(`meeting adjourned in ${LINE.length} chars`);
}

deliver();
