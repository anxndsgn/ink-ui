import { Tabs as BaseTabs } from "@base-ui/react/tabs";
import { cn } from "@registry/lib/utils";
import { cva } from "class-variance-authority";
import type { VariantProps } from "class-variance-authority";
import { createContext, useContext } from "react";

type TabsVariant = "default" | "underline";
type TabsSize = "default" | "sm" | "lg";

const TabsSizeContext = createContext<TabsSize>("default");

const tabsListVariants = cva(
  "relative z-0 flex items-center gap-x-0.5 data-[orientation=vertical]:h-fit data-[orientation=vertical]:flex-col data-[orientation=vertical]:gap-y-0.5",
  {
    compoundVariants: [
      { size: "sm", variant: "default", className: "p-1" },
      { size: "default", variant: "default", className: "p-1.5" },
      { size: "lg", variant: "default", className: "p-2" },
      {
        size: "sm",
        variant: "underline",
        className: "data-[orientation=horizontal]:py-0.5 data-[orientation=vertical]:px-0.5",
      },
      {
        size: "default",
        variant: "underline",
        className: "data-[orientation=horizontal]:py-1 data-[orientation=vertical]:px-1",
      },
      {
        size: "lg",
        variant: "underline",
        className: "data-[orientation=horizontal]:py-1.5 data-[orientation=vertical]:px-1.5",
      },
    ],
    defaultVariants: {
      size: "default",
      variant: "default",
    },
    variants: {
      size: {
        sm: "",
        default: "",
        lg: "",
      },
      variant: {
        default: "w-fit justify-center rounded-lg bg-muted",
        underline:
          "border-border data-[orientation=horizontal]:border-b data-[orientation=vertical]:border-l *:data-[slot=tabs-trigger]:hover:bg-muted",
      },
    },
  },
);

const tabIndicatorVariants = cva(
  "absolute transition-[width,height,translate] duration-200 ease-in-out data-[orientation=horizontal]:bottom-0 data-[orientation=horizontal]:left-0 data-[orientation=horizontal]:h-(--active-tab-height) data-[orientation=horizontal]:w-(--active-tab-width) data-[orientation=horizontal]:translate-x-(--active-tab-left) data-[orientation=horizontal]:-translate-y-(--active-tab-bottom) data-[orientation=vertical]:top-0 data-[orientation=vertical]:left-0 data-[orientation=vertical]:h-(--active-tab-height) data-[orientation=vertical]:w-(--active-tab-width) data-[orientation=vertical]:translate-x-(--active-tab-left) data-[orientation=vertical]:translate-y-(--active-tab-top)",
  {
    compoundVariants: [
      {
        size: "sm",
        variant: "underline",
        className: "data-[orientation=horizontal]:h-px data-[orientation=vertical]:w-px",
      },
      {
        size: "default",
        variant: "underline",
        className: "data-[orientation=horizontal]:h-0.5 data-[orientation=vertical]:w-0.5",
      },
      {
        size: "lg",
        variant: "underline",
        className: "data-[orientation=horizontal]:h-1 data-[orientation=vertical]:w-1",
      },
    ],
    defaultVariants: {
      size: "default",
      variant: "default",
    },
    variants: {
      size: {
        default: "",
        lg: "",
        sm: "",
      },
      variant: {
        default: "-z-1 rounded-md bg-popover",
        underline:
          "z-10 bg-accent data-[orientation=horizontal]:translate-y-px data-[orientation=vertical]:-translate-x-px",
      },
    },
  },
);

const tabsTabVariants = cva(
  "flex shrink-0 cursor-pointer items-center justify-center rounded-md font-medium whitespace-nowrap text-muted-foreground transition-[color,background-color,box-shadow] outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring data-active:text-foreground data-disabled:pointer-events-none data-disabled:opacity-50 data-[orientation=vertical]:w-full data-[orientation=vertical]:justify-start [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    defaultVariants: {
      size: "default",
    },
    variants: {
      size: {
        default: "gap-1.5 px-2 py-1.5 text-sm",
        lg: "gap-2 px-3 py-2 text-base",
        sm: "gap-1 px-1.5 py-1.5 text-xs",
      },
    },
  },
);

function Tabs({ className, ...props }: BaseTabs.Root.Props) {
  return (
    <BaseTabs.Root
      className={cn("flex flex-col gap-6 data-[orientation=vertical]:flex-row", className)}
      data-slot="tabs"
      {...props}
    />
  );
}

function TabsList({
  variant = "default",
  size = "default",
  className,
  children,
  ...props
}: BaseTabs.List.Props & {
  variant?: TabsVariant;
  size?: TabsSize;
}) {
  return (
    <BaseTabs.List
      className={cn(tabsListVariants({ className, size, variant }))}
      data-slot="tabs-list"
      {...props}
    >
      <TabsSizeContext.Provider value={size}>
        {children}
        <BaseTabs.Indicator
          className={cn(tabIndicatorVariants({ size, variant }))}
          data-slot="tab-indicator"
        />
      </TabsSizeContext.Provider>
    </BaseTabs.List>
  );
}

type TabsTabProps = BaseTabs.Tab.Props & VariantProps<typeof tabsTabVariants>;

function TabsTab({ className, size, ...props }: TabsTabProps) {
  const inheritedSize = useContext(TabsSizeContext);

  return (
    <BaseTabs.Tab
      className={cn(tabsTabVariants({ className, size: size ?? inheritedSize }))}
      data-slot="tabs-trigger"
      {...props}
    />
  );
}

function TabsPanel({ className, ...props }: BaseTabs.Panel.Props) {
  return (
    <BaseTabs.Panel
      className={cn("flex flex-1 flex-col gap-6 outline-none", className)}
      data-slot="tabs-content"
      {...props}
    />
  );
}

export { Tabs, TabsList, TabsTab, TabsTab as TabsTrigger, TabsPanel, TabsPanel as TabsContent };
