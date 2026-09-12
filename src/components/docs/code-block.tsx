import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import {
  Children,
  isValidElement,
  useMemo,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { highlightCodeToHtml } from "../../lib/highlight";
import { cn } from "../../lib/utils";
import { CopyButton } from "./copy-button";

const COLLAPSE_LINE_THRESHOLD = 16;

export type CodeBlockProps = {
  code?: string;
  language?: string;
  lang?: string;
  title?: string;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  tabIndex?: number;
  "data-language"?: string;
  "data-title"?: string;
};

export function CodeBlock({
  code,
  language,
  lang,
  title,
  children,
  className,
  style,
  tabIndex,
  "data-language": dataLanguage,
  "data-title": dataTitle,
}: CodeBlockProps) {
  const extracted = extractCode(children);
  const source = stripTrailingNewline(code ?? extracted.code);
  const resolvedLanguage = language ?? lang ?? extracted.language ?? dataLanguage ?? "text";
  const isHighlighted = code === undefined && Boolean(className?.split(/\s+/).includes("th-code"));
  const highlightedHtml = useMemo(
    () => (isHighlighted ? undefined : highlightCodeToHtml(source, resolvedLanguage)),
    [isHighlighted, source, resolvedLanguage],
  );
  const lineCount = countLines(source);
  const isCollapsible = lineCount > COLLAPSE_LINE_THRESHOLD;
  const [expanded, setExpanded] = useState(false);
  const collapsed = isCollapsible && !expanded;

  return (
    <figure className="m-0 overflow-hidden rounded-lg bg-muted text-foreground">
      <figcaption className="flex items-center justify-between border-b border-border p-2 pl-4 text-xs font-bold text-muted-foreground">
        <span>{title ?? dataTitle ?? resolvedLanguage}</span>
        <CopyButton value={source} label="Copy code" />
      </figcaption>
      <div className="relative">
        <div
          className={cn(
            "overflow-x-auto",
            isCollapsible && "pb-10",
            collapsed &&
              "max-h-[calc(1.75rem*16+2rem+2.5rem)] overflow-y-hidden code-collapse-fade",
          )}
        >
          <pre
            className={cn("th-code m-0 p-4", className)}
            style={style}
            tabIndex={tabIndex}
            data-language={resolvedLanguage}
          >
            {isHighlighted ? (
              <code className="text-[0.86rem] leading-7 text-inherit">{extracted.children}</code>
            ) : (
              <code
                className="text-[0.86rem] leading-7 text-inherit"
                dangerouslySetInnerHTML={{ __html: highlightedHtml ?? "" }}
              />
            )}
          </pre>
        </div>
        {isCollapsible ? (
          <div className="absolute inset-x-0 bottom-0 flex justify-center border-t border-border bg-muted p-2">
            <button
              type="button"
              className="inline-flex items-center gap-1 rounded-sm px-2 py-1 text-xs text-muted-foreground hover:text-foreground"
              onClick={() => setExpanded((value) => !value)}
            >
              {expanded ? <ChevronUpIcon size={14} /> : <ChevronDownIcon size={14} />}
              {expanded ? "Show less" : "Show more"}
            </button>
          </div>
        ) : null}
      </div>
    </figure>
  );
}

function extractCode(children: ReactNode) {
  const child = Children.toArray(children)[0];

  if (!isValidElement<{ children?: ReactNode; className?: string }>(child)) {
    return { code: collectText(children), children, language: undefined };
  }

  return {
    code: collectText(child.props.children),
    children: child.props.children,
    language: child.props.className
      ?.split(/\s+/)
      .find((name) => name.startsWith("language-"))
      ?.slice("language-".length),
  };
}

function collectText(value: ReactNode): string {
  if (typeof value === "string" || typeof value === "number") {
    return String(value);
  }

  if (Array.isArray(value)) {
    return value.map(collectText).join("");
  }

  if (isValidElement<{ children?: ReactNode }>(value)) {
    return collectText(value.props.children);
  }

  return "";
}

function stripTrailingNewline(value: string) {
  return value.replace(/\n$/, "");
}

function countLines(value: string) {
  if (!value) return 0;
  return value.split("\n").length;
}
