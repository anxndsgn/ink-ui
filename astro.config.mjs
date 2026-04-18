// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import tailwindcss from "@tailwindcss/vite";
import { execSync } from "child_process";
import { readFileSync } from "fs";
import { resolve } from "path";
import { fileURLToPath } from "url";
import { markdownPages } from "./src/lib/astro-markdown-pages.js";

import sitemap from "@astrojs/sitemap";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

function getBuildInfo() {
  // Read version from the docs package
  const docsPkg = JSON.parse(readFileSync(resolve(__dirname, "package.json"), "utf-8"));

  let commitHash = "unknown";
  let commitDate = "unknown";
  let branch = "unknown";

  try {
    commitHash = execSync("git rev-parse --short HEAD", {
      encoding: "utf-8",
    }).trim();
    commitDate = execSync("git log -1 --format=%cI", {
      encoding: "utf-8",
    }).trim();
    branch = execSync("git rev-parse --abbrev-ref HEAD", {
      encoding: "utf-8",
    }).trim();
  } catch (error) {
    console.warn(
      "[ink-docs] Git info unavailable during build:",
      error instanceof Error ? error.message : error,
    );
    console.warn(
      "[ink-docs] This may happen with shallow clones. Set GIT_DEPTH=0 or fetch-depth: 0 in CI.",
    );
  }

  return {
    docsVersion: docsPkg.version,
    commitHash,
    commitDate,
    branch,
    buildDate: new Date().toISOString(),
  };
}

const buildInfo = getBuildInfo();

// https://astro.build/config
export default defineConfig({
  integrations: [mdx(), react(), sitemap(), markdownPages()],
  site: "https://ink-ui.anxndsgn.com/",
  markdown: {
    shikiConfig: {
      themes: {
        light: "github-light",
        dark: "vesper",
      },
      defaultColor: false,
    },
  },
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        "@registry": resolve(__dirname, "registry"),
      },
    },

    define: {
      __DOCS_VERSION__: JSON.stringify(buildInfo.docsVersion),
      __BUILD_COMMIT__: JSON.stringify(buildInfo.commitHash),
      __BUILD_COMMIT_DATE__: JSON.stringify(buildInfo.commitDate),
      __BUILD_BRANCH__: JSON.stringify(buildInfo.branch),
      __BUILD_DATE__: JSON.stringify(buildInfo.buildDate),
    },
  },
});
