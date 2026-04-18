import { useState, useEffect, useRef } from "react";
import { Button } from "@registry/components/ui/button";
import { cn } from "@registry/lib/utils";
import { CaretDownIcon, XIcon } from "@phosphor-icons/react";
import { SidebarSimpleIcon } from "@phosphor-icons/react";
import { ThemeToggle } from "./theme-toggle";

interface NavItem {
  label: string;
  href: string;
}

function normalizePathname(pathname: string) {
  if (!pathname) return "/";
  if (pathname === "/") return "/";
  return pathname.replace(/\/+$/, "");
}

function isActivePath(activePath: string, href: string) {
  const normalized = normalizePathname(href);
  return activePath === normalized || activePath.startsWith(normalized + "/");
}

const staticPages: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Introduction", href: "/introduction" },
  { label: "Colors", href: "/colors" },
];

const componentItems: NavItem[] = [
  { label: "Alert Dialog", href: "/components/alert-dialog" },
  { label: "Button", href: "/components/button" },
  { label: "Card", href: "/components/card" },
  { label: "Checkbox", href: "/components/checkbox" },
  { label: "Dialog", href: "/components/dialog" },
  { label: "Input", href: "/components/input" },
  { label: "Menu", href: "/components/menu" },
  { label: "Popover", href: "/components/popover" },
  { label: "Radio", href: "/components/radio" },
  { label: "Select", href: "/components/select" },
  { label: "Switch", href: "/components/switch" },
  { label: "Tabs", href: "/components/tabs" },
  { label: "Tag", href: "/components/tag" },
];

const LI_STYLE =
  "block rounded-lg text-foreground hover:bg-muted p-2 my-[.05rem] cursor-pointer no-underline relative z-10";
const LI_ACTIVE_STYLE = "font-semibold text-foreground bg-muted";

interface SidebarNavProps {
  currentPath: string;
}

export function SidebarNav({ currentPath }: SidebarNavProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [componentsOpen, setComponentsOpen] = useState(true);

  const activePath = normalizePathname(currentPath);

  // Refs for scroll containers
  const mobileScrollRef = useRef<HTMLDivElement>(null);
  const desktopScrollRef = useRef<HTMLDivElement>(null);

  const toggleSidebar = () => setSidebarOpen((v) => !v);
  const toggleMobileMenu = () => setMobileMenuOpen((v) => !v);

  // Save scroll position on scroll and navigation
  useEffect(() => {
    const STORAGE_KEY = "ink-sidebar-scroll";

    // Save scroll position before navigation
    const handleBeforeUnload = () => {
      const scrollPosition =
        mobileScrollRef.current?.scrollTop || desktopScrollRef.current?.scrollTop || 0;
      sessionStorage.setItem(STORAGE_KEY, scrollPosition.toString());
    };

    // Save on scroll for more reliable restoration
    const handleScroll = (e: Event) => {
      const target = e.target as HTMLElement;
      sessionStorage.setItem(STORAGE_KEY, target.scrollTop.toString());
    };

    // Listen for navigation events
    window.addEventListener("beforeunload", handleBeforeUnload);

    // Attach scroll listeners to both containers
    const mobileContainer = mobileScrollRef.current;
    const desktopContainer = desktopScrollRef.current;

    if (mobileContainer) {
      mobileContainer.addEventListener("scroll", handleScroll);
    }
    if (desktopContainer) {
      desktopContainer.addEventListener("scroll", handleScroll);
    }

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      if (mobileContainer) {
        mobileContainer.removeEventListener("scroll", handleScroll);
      }
      if (desktopContainer) {
        desktopContainer.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  // Shared nav content for both mobile and desktop
  const navContent = (
    <>
      <ul className="flex flex-col gap-px">
        {staticPages.map((item) => (
          <li key={item.href}>
            <a
              href={item.href}
              className={cn(LI_STYLE, isActivePath(activePath, item.href) && LI_ACTIVE_STYLE)}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>

      <div className="my-4 border-b border-border" />

      <div className="mb-4">
        {/* Components Section */}
        <button
          type="button"
          className="flex w-full cursor-pointer items-center justify-between rounded-lg px-2 py-2 text-sm font-medium text-foreground hover:bg-muted"
          onClick={() => setComponentsOpen(!componentsOpen)}
        >
          <span>Components</span>
          <CaretDownIcon
            size={12}
            className={cn(
              "text-muted-foreground transition-transform duration-200",
              !componentsOpen && "-rotate-90",
            )}
          />
        </button>
        <ul
          className={cn(
            "mt-1 flex flex-col gap-px overflow-hidden transition-all duration-200 ease-in-out",
            componentsOpen ? "max-h-500 opacity-100" : "max-h-0 opacity-0",
          )}
        >
          {componentItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className={cn(
                  LI_STYLE,
                  "pl-4",
                  activePath === normalizePathname(item.href) && LI_ACTIVE_STYLE,
                )}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile header bar with hamburger */}
      <div
        className={cn(
          "fixed inset-x-0 top-0 z-50 flex h-12 items-center justify-between border-b border-border bg-background px-3 md:hidden",
        )}
      >
        <Button variant="ghost" size="icon" aria-label="Open menu" onClick={toggleMobileMenu}>
          <SidebarSimpleIcon size={20} />
        </Button>
        <h1 className="text-base font-medium">ink-ui</h1>
        <ThemeToggle />
      </div>

      {/* Mobile slide-out drawer */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-border md:hidden",
          "bg-background transition-transform duration-300 will-change-transform",
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-12 flex-none items-center justify-between border-b border-border px-3">
          <h1 className="text-base font-medium">@anxndsgn/ink-ui</h1>
          <Button variant="ghost" size="icon" aria-label="Close menu" onClick={toggleMobileMenu}>
            <XIcon size={20} />
          </Button>
        </div>
        <div
          ref={mobileScrollRef}
          data-sidebar-scroll="mobile"
          className="min-h-0 grow overflow-y-auto overscroll-contain px-3 py-4 text-sm text-foreground"
          style={{ scrollBehavior: "auto" }}
        >
          {navContent}
        </div>
      </aside>

      {/* Desktop - always visible, panel slides behind it */}
      <div className="fixed top-0 z-999 hidden h-12 items-center justify-between px-3 font-medium md:flex">
        <Button
          variant="ghost"
          size="icon"
          aria-label="Toggle sidebar"
          aria-pressed={sidebarOpen}
          onClick={toggleSidebar}
        >
          <SidebarSimpleIcon size={20} />
        </Button>
      </div>

      {/* Desktop: Sliding panel that opens to the right of the rail */}
      <aside
        data-sidebar-open={sidebarOpen}
        className={cn(
          "fixed inset-y-0 z-40 hidden w-64 flex-col md:flex",
          "transition-transform duration-300 ease-out will-change-transform",
          sidebarOpen ? "translate-x-0 border-r border-border" : "-translate-x-full",
        )}
      >
        <div className="h-12 flex-none border-b border-border" />

        <div
          ref={desktopScrollRef}
          data-sidebar-scroll="desktop"
          className="min-h-0 grow overflow-y-auto overscroll-contain px-3 py-4 text-sm text-foreground"
        >
          {navContent}
        </div>
      </aside>
    </>
  );
}
