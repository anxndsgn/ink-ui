import { describe, it, expect } from "vitest";
import { existsSync, readFileSync } from "fs";
import { join } from "path";

const distDir = join(import.meta.dirname, "../../dist");

describe("markdown pages integration", () => {
  it("generates index.md for the homepage", () => {
    const indexPath = join(distDir, "index.md");

    expect(existsSync(indexPath)).toBe(true);

    const content = readFileSync(indexPath, "utf-8");
    // Content may be empty for minimal pages; the integration should still produce the file
    expect(typeof content).toBe("string");
  });
});
