import { useEffect, useRef, useState } from "react";
import { cn } from "@registry/lib/utils";
import { GithubLogoIcon } from "@phosphor-icons/react";
import { ThemeToggle } from "../theme-toggle";
import { BaseUIIcon } from "./icons/base-ui-icon";

interface StickyDocHeaderProps {
  title: string;
  githubSourceUrl?: string | null;
  baseUIUrl?: string | null;
}

export function StickyDocHeader({ title, githubSourceUrl, baseUIUrl }: StickyDocHeaderProps) {
  const [showStickyTitle, setShowStickyTitle] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const headerRef = useRef<HTMLElement>(null);

  // Watch for sidebar state changes
  useEffect(() => {
    const checkSidebarState = () => {
      const sidebar = document.querySelector("aside[data-sidebar-open]");
      if (sidebar) {
        const isOpen = sidebar.getAttribute("data-sidebar-open") === "true";
        setSidebarOpen(isOpen);
      }
    };

    // Check initially
    checkSidebarState();

    // Watch for attribute changes
    const sidebar = document.querySelector("aside[data-sidebar-open]");
    if (!sidebar) return;

    const observer = new MutationObserver(checkSidebarState);
    observer.observe(sidebar, {
      attributes: true,
      attributeFilter: ["data-sidebar-open"],
    });

    return () => observer.disconnect();
  }, []);

  // Watch for page header visibility
  useEffect(() => {
    const pageHeader = document.getElementById("page-header");
    if (!headerRef.current || !pageHeader) return;

    const margin = Math.round(headerRef.current.getBoundingClientRect().bottom);

    // Show sticky title when page header's bottom edge scrolls past the sticky header's bottom edge
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowStickyTitle(!entry.isIntersecting);
      },
      { rootMargin: `-${margin}px 0px 0px 0px` },
    );

    observer.observe(pageHeader);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Sticky title that appears when sidebar is collapsed */}
      {!sidebarOpen && (
        <div
          className={cn(
            "pointer-events-none fixed top-0 left-12 z-50 flex h-12 items-center font-medium transition-opacity duration-200 select-none",
            showStickyTitle ? "opacity-100" : "opacity-0",
          )}
          style={{ paddingLeft: "4.25rem" }}
        >
          <span className="pointer-events-auto flex items-center gap-2 text-base">
            <span className="text-muted-foreground">/ </span>
            <span className="font-semibold">{title}</span>
            {githubSourceUrl && (
              <a
                href={githubSourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-foreground"
                title="View source on GitHub"
                aria-label="View source on GitHub"
                tabIndex={showStickyTitle ? 0 : -1}
              >
                <GithubLogoIcon size={18} weight="fill" />
              </a>
            )}
            {baseUIUrl && (
              <a
                href={baseUIUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-foreground"
                title="View Base UI documentation"
                aria-label="View Base UI documentation"
                tabIndex={showStickyTitle ? 0 : -1}
              >
                <BaseUIIcon size={18} />
              </a>
            )}
          </span>
        </div>
      )}

      {/* Sticky header bar */}
      <header
        ref={headerRef}
        className="sticky top-12 z-10 flex h-12 border-b border-border bg-background md:top-0"
      >
        <div className="flex min-w-0 flex-1 items-center justify-between px-4">
          <div
            className={cn(
              "flex items-center gap-2 transition-opacity duration-200",
              showStickyTitle && sidebarOpen ? "opacity-100" : "pointer-events-none opacity-0",
            )}
          >
            <span className="text-lg font-semibold text-foreground">{title}</span>
            {githubSourceUrl && (
              <a
                href={githubSourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground"
                title="View source on GitHub"
                aria-label="View source on GitHub"
                tabIndex={showStickyTitle && sidebarOpen ? 0 : -1}
              >
                <GithubLogoIcon size={20} weight="fill" />
              </a>
            )}
            {baseUIUrl && (
              <a
                href={baseUIUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground"
                title="View Base UI documentation"
                aria-label="View Base UI documentation"
                tabIndex={showStickyTitle && sidebarOpen ? 0 : -1}
              >
                <BaseUIIcon size={20} />
              </a>
            )}
          </div>
          <a
            href="https://github.com/anxndsgn/ink-ui"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-sm text-muted-foreground hover:text-foreground"
          >
            @anxndsgn/ink-ui
          </a>
        </div>
        <div className="hidden w-12 shrink-0 items-center justify-center md:flex">
          <ThemeToggle />
        </div>
      </header>
    </>
  );
}
