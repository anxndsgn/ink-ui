import { useState } from "react";
import { Button } from "@registry/components/ui/button";
import { ScrollArea } from "@registry/components/ui/scroll-area";
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
  { label: "Acknowledgements", href: "/acknowledgements" },
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
  { label: "Scroll Area", href: "/components/scroll-area" },
  { label: "Slider", href: "/components/slider" },
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

  const toggleSidebar = () => setSidebarOpen((v) => !v);
  const toggleMobileMenu = () => setMobileMenuOpen((v) => !v);

  // Shared nav content for both mobile and desktop
  const navContent = (
    <div className="px-3 py-4">
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
    </div>
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
        <h1 className="text-base font-medium">Ink UI</h1>
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
          <h1 className="text-base font-medium">Ink UI</h1>
          <Button variant="ghost" size="icon" aria-label="Close menu" onClick={toggleMobileMenu}>
            <XIcon size={20} />
          </Button>
        </div>
        <ScrollArea className="min-h-0 grow text-sm text-foreground">{navContent}</ScrollArea>
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

        <ScrollArea className="min-h-0 grow text-sm text-foreground">{navContent}</ScrollArea>
      </aside>
    </>
  );
}
