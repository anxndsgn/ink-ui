import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@registry/lib/utils";
import { CaretDownIcon } from "@phosphor-icons/react";

export interface TocHeading {
  depth: number;
  slug: string;
  text: string;
}

interface TableOfContentsProps {
  /** Static headings (MDX pages). Omit to scrape from the DOM (.astro pages). */
  headings?: TocHeading[];
  /**
   * - `"sidebar"` (default) — vertical list with active indicator bar
   * - `"select"` — native `<select>` jump menu for compact layouts
   */
  layout?: "sidebar" | "select";
}

/**
 * Scrape h2–h4 elements from the rendered `.ink-prose` container.
 * Only runs client-side for .astro pages that don't pass headings statically.
 */
function scrapeHeadings(): TocHeading[] {
  if (typeof document === "undefined") return [];

  const content = document.querySelector(".ink-prose");
  if (!content) return [];

  return Array.from(content.querySelectorAll("h2, h3, h4"))
    .filter((el) => el.id)
    .map((el) => ({
      depth: Number.parseInt(el.tagName[1]),
      slug: el.id,
      text: el.textContent?.trim() ?? "",
    }));
}

export function TableOfContents({
  headings: headingsProp,
  layout = "sidebar",
}: TableOfContentsProps) {
  // Track whether we've hydrated to avoid SSR/client mismatch when scraping
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const headings = useMemo(() => {
    if (headingsProp && headingsProp.length > 0) {
      return headingsProp.filter((h) => h.depth <= 4);
    }
    // Only scrape after mount to avoid hydration mismatch
    if (!hasMounted) return [];
    return scrapeHeadings();
  }, [headingsProp, hasMounted]);

  const [activeId, setActiveId] = useState<string>(headings[0]?.slug ?? "");

  // When a TOC link is clicked we temporarily suppress the observer so the
  // active state doesn't flicker as the page scrolls to the target heading.
  const suppressObserverRef = useRef(false);
  const suppressTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  // Clean up the suppression timer on unmount.
  useEffect(() => () => clearTimeout(suppressTimerRef.current), []);

  const handleClick = useCallback((slug: string) => {
    setActiveId(slug);
    suppressObserverRef.current = true;
    clearTimeout(suppressTimerRef.current);
    suppressTimerRef.current = setTimeout(() => {
      suppressObserverRef.current = false;
    }, 1000);
  }, []);

  // Callback ref: wire up the IntersectionObserver when the <nav> mounts.
  const navRef = useCallback(
    (node: HTMLElement | null) => {
      if (!node || headings.length === 0) return;

      const elements = headings
        .map((h) => document.getElementById(h.slug))
        .filter((el): el is HTMLElement => el !== null);

      if (elements.length === 0) return;

      const observer = new IntersectionObserver(
        (entries) => {
          if (suppressObserverRef.current) return;

          const visible = entries
            .filter((e) => e.isIntersecting)
            .toSorted(
              (a, b) => (a.target as HTMLElement).offsetTop - (b.target as HTMLElement).offsetTop,
            );

          if (visible.length > 0) {
            setActiveId(visible[0].target.id);
            return;
          }

          // No headings visible -- clamp to first or last based on scroll position.
          const first = document.getElementById(headings[0].slug);
          const last = document.getElementById(headings.at(-1)!.slug);

          if (first && window.scrollY < first.offsetTop) {
            setActiveId(headings[0].slug);
          } else if (last && window.scrollY >= last.offsetTop) {
            setActiveId(headings.at(-1)!.slug);
          }
        },
        { rootMargin: "-10% 0px -70% 0px", threshold: [0, 1] },
      );

      for (const el of elements) observer.observe(el);

      // Disconnect when the node unmounts (React will call the ref with null).
      return () => observer.disconnect();
    },
    [headings],
  );

  if (headings.length === 0) return null;

  // Compact jump menu for smaller screens
  if (layout === "select") {
    return (
      <nav aria-label="Table of contents" ref={navRef} className="relative">
        <select
          aria-label="Jump to section"
          value={activeId}
          onChange={(e) => {
            const slug = e.target.value;
            handleClick(slug);
            document.getElementById(slug)?.scrollIntoView({ behavior: "smooth" });
          }}
          className="w-full appearance-none rounded-lg border border-input px-4 py-2.5 pr-10 text-sm text-foreground"
        >
          {headings.map((heading) => (
            <option key={heading.slug} value={heading.slug}>
              {"\u00A0".repeat(Math.max(0, heading.depth - 2) * 2)}
              {heading.text}
            </option>
          ))}
        </select>
        <CaretDownIcon
          size={16}
          weight="bold"
          className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground"
        />
      </nav>
    );
  }

  // Sidebar layout (default)
  return (
    <section>
      <p className="mb-3 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
        On this page
      </p>
      <nav
        aria-label="Table of contents"
        className="relative space-y-1.5 before:absolute before:inset-y-0 before:left-0.5 before:w-px before:bg-border"
        ref={navRef}
      >
        {headings.map((heading) => {
          const isActive = activeId === heading.slug;
          return (
            <a
              key={heading.slug}
              href={`#${heading.slug}`}
              onClick={() => handleClick(heading.slug)}
              className={cn(
                "group relative block truncate py-1 text-sm no-underline",
                heading.depth <= 2 && "pl-5",
                heading.depth === 3 && "pl-8",
                heading.depth >= 4 && "pl-11",
                isActive
                  ? "font-medium text-foreground"
                  : "text-muted-foreground hover:bg-muted hover:font-medium hover:text-foreground",
              )}
            >
              <span
                aria-hidden="true"
                className={cn(
                  "absolute inset-y-0 left-0.5 w-0.5",
                  isActive ? "bg-accent opacity-100" : "bg-accent opacity-0 group-hover:opacity-60",
                )}
              />
              <span className="block min-w-0 leading-5">{heading.text}</span>
            </a>
          );
        })}
      </nav>
    </section>
  );
}
