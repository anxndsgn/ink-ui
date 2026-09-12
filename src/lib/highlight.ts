import { createHighlighter, renderNodesToHtml, renderTokens } from "@tanstack/highlight/core";
import { css } from "@tanstack/highlight/languages/css";
import { html } from "@tanstack/highlight/languages/html";
import { js } from "@tanstack/highlight/languages/js";
import { json } from "@tanstack/highlight/languages/json";
import { jsx } from "@tanstack/highlight/languages/jsx";
import { markdown } from "@tanstack/highlight/languages/markdown";
import { shell } from "@tanstack/highlight/languages/shell";
import { ts } from "@tanstack/highlight/languages/ts";
import { tsx } from "@tanstack/highlight/languages/tsx";

export const highlighter = createHighlighter({
  languages: [
    css,
    html,
    js,
    json,
    { ...jsx, aliases: [...(jsx.aliases ?? []), "mdx"] },
    markdown,
    { ...shell, aliases: [...(shell.aliases ?? []), "shellscript", "command"] },
    ts,
    tsx,
  ],
});

export function highlightCodeToHtml(code: string, language: string) {
  const lang = language
    .trim()
    .toLowerCase()
    .replace(/^language-/, "");
  const { tokens } = highlighter.tokenize(code, { lang });

  return renderNodesToHtml(renderTokens(tokens));
}
