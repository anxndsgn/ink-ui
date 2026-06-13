import { mergeProps, useRender } from "@base-ui/react";
import { Drawer as BaseDrawer } from "@base-ui/react/drawer";
import { XIcon } from "@phosphor-icons/react";
import { createContext, useContext } from "react";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { ScrollArea } from "./scroll-area";

type DrawerPosition = "right" | "left" | "top" | "bottom";

const DrawerContext = createContext<{ position: DrawerPosition }>({ position: "bottom" });

const directionMap: Record<DrawerPosition, BaseDrawer.Root.Props["swipeDirection"]> = {
  bottom: "down",
  left: "left",
  right: "right",
  top: "up",
};

const createDrawerHandle = BaseDrawer.createHandle;

function Drawer({
  swipeDirection,
  position = "bottom",
  ...props
}: BaseDrawer.Root.Props & { position?: DrawerPosition }) {
  return (
    <DrawerContext.Provider value={{ position }}>
      <BaseDrawer.Root
        data-slot="drawer"
        swipeDirection={swipeDirection ?? directionMap[position]}
        {...props}
      />
    </DrawerContext.Provider>
  );
}

function DrawerTrigger(props: BaseDrawer.Trigger.Props) {
  return <BaseDrawer.Trigger data-slot="drawer-trigger" {...props} />;
}

function DrawerClose(props: BaseDrawer.Close.Props) {
  return <BaseDrawer.Close data-slot="drawer-close" {...props} />;
}

const DrawerPortal = (props: BaseDrawer.Portal.Props) => (
  <BaseDrawer.Portal data-slot="drawer-portal" {...props} />
);

const DrawerContentArea = BaseDrawer.Content;

function DrawerSwipeArea({
  className,
  position: positionProp,
  ...props
}: BaseDrawer.SwipeArea.Props & { position?: DrawerPosition }) {
  const { position: contextPosition } = useContext(DrawerContext);
  const position = positionProp ?? contextPosition;

  return (
    <BaseDrawer.SwipeArea
      className={cn(
        "fixed z-50 touch-none",
        position === "bottom" && "inset-x-0 bottom-0 h-8",
        position === "top" && "inset-x-0 top-0 h-8",
        position === "left" && "inset-y-0 left-0 w-8",
        position === "right" && "inset-y-0 right-0 w-8",
        className,
      )}
      data-slot="drawer-swipe-area"
      {...props}
    />
  );
}

function DrawerBackdrop({ className, ...props }: BaseDrawer.Backdrop.Props) {
  return (
    <BaseDrawer.Backdrop
      className={cn(
        "fixed inset-0 z-50 bg-black/30 opacity-[calc(1-var(--drawer-swipe-progress))] backdrop-blur-md transition-opacity duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] data-ending-style:opacity-0 data-ending-style:duration-[calc(var(--drawer-swipe-strength)*400ms)] data-starting-style:opacity-0 data-swiping:duration-0",
        className,
      )}
      data-slot="drawer-backdrop"
      {...props}
    />
  );
}

function DrawerViewport({
  className,
  position,
  variant = "default",
  ...props
}: BaseDrawer.Viewport.Props & {
  position?: DrawerPosition;
  variant?: "default" | "inset";
}) {
  return (
    <BaseDrawer.Viewport
      className={cn(
        "fixed inset-0 z-50 touch-none [--bleed:--spacing(12)] [--inset:--spacing(0)]",
        position === "bottom" && "grid grid-rows-[1fr_auto] pt-12",
        position === "top" && "grid grid-rows-[auto_1fr] pb-12",
        position === "left" && "flex justify-start",
        position === "right" && "flex justify-end",
        variant === "inset" && "px-(--inset) sm:[--inset:--spacing(4)]",
        variant === "inset" && position !== "bottom" && "pt-(--inset)",
        variant === "inset" && position !== "top" && "pb-(--inset)",
        className,
      )}
      data-slot="drawer-viewport"
      {...props}
    />
  );
}

function DrawerContent({
  className,
  children,
  showCloseButton = false,
  showBar = false,
  position: positionProp,
  variant = "default",
  portalProps,
  ...props
}: BaseDrawer.Popup.Props & {
  showCloseButton?: boolean;
  showBar?: boolean;
  position?: DrawerPosition;
  variant?: "default" | "inset";
  portalProps?: BaseDrawer.Portal.Props;
}) {
  const { position: contextPosition } = useContext(DrawerContext);
  const position = positionProp ?? contextPosition;

  return (
    <DrawerPortal {...portalProps}>
      <DrawerBackdrop />
      <DrawerViewport position={position} variant={variant}>
        <BaseDrawer.Popup
          className={cn(
            "relative flex max-h-full min-h-0 w-full min-w-0 flex-col bg-dialog text-dialog-foreground shadow-xs ring ring-border outline-none",
            "transition-[transform,height,background-color] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] will-change-transform",
            "touch-none",
            "[--peek:calc(--spacing(6)-1px)] [--scale-base:calc(max(0,1-(var(--nested-drawers)*var(--stack-step))))] [--scale:clamp(0,calc(var(--scale-base)+(var(--stack-step)*var(--stack-progress))),1)] [--shrink:calc(1-var(--scale))] [--stack-peek-offset:max(0px,calc((var(--nested-drawers)-var(--stack-progress))*var(--peek)))] [--stack-progress:clamp(0,var(--drawer-swipe-progress),1)] [--stack-step:0.05]",
            "after:pointer-events-none after:absolute after:bg-dialog data-swiping:select-none",
            "data-ending-style:duration-[calc(var(--drawer-swipe-strength)*400ms)]",
            position === "bottom" &&
              "row-start-2 mx-auto transform-[translateY(calc(var(--drawer-snap-point-offset)+var(--drawer-swipe-movement-y)))] after:inset-x-0 after:top-full after:h-(--bleed) has-data-[slot=drawer-bar]:pt-2 data-ending-style:transform-[translateY(calc(100%+var(--inset)))] data-starting-style:transform-[translateY(calc(100%+var(--inset)))]",
            position === "top" &&
              "mx-auto transform-[translateY(var(--drawer-swipe-movement-y))] after:inset-x-0 after:bottom-full after:h-(--bleed) has-data-[slot=drawer-bar]:pb-2 data-ending-style:transform-[translateY(calc(-100%-var(--inset)))] data-starting-style:transform-[translateY(calc(-100%-var(--inset)))]",
            position === "left" &&
              "w-[calc(100%-(--spacing(12)))] max-w-md transform-[translateX(var(--drawer-swipe-movement-x))] after:inset-y-0 after:inset-e-full after:w-(--bleed) has-data-[slot=drawer-bar]:pe-2 data-ending-style:transform-[translateX(calc(-100%-var(--inset)))] data-starting-style:transform-[translateX(calc(-100%-var(--inset)))]",
            position === "right" &&
              "col-start-2 w-[calc(100%-(--spacing(12)))] max-w-md transform-[translateX(var(--drawer-swipe-movement-x))] after:inset-y-0 after:inset-s-full after:w-(--bleed) has-data-[slot=drawer-bar]:ps-2 data-ending-style:transform-[translateX(calc(100%+var(--inset)))] data-starting-style:transform-[translateX(calc(100%+var(--inset)))]",
            position === "bottom" && "rounded-t-3xl",
            position === "top" && "rounded-b-3xl",
            position === "left" && "rounded-e-3xl",
            position === "right" && "rounded-s-3xl",
            variant === "inset" &&
              "**:data-[slot=drawer-footer]:rounded-b-[calc(var(--radius-3xl)-1px)] sm:rounded-3xl sm:after:bg-transparent",
            (position === "bottom" || position === "top") &&
              "h-(--drawer-height,auto) [--height:max(0px,calc(var(--drawer-frontmost-height,var(--drawer-height))))] data-nested-drawer-open:h-(--height)",
            position === "bottom" &&
              "origin-[50%_calc(100%-var(--inset))] data-nested-drawer-open:transform-[translateY(calc(var(--drawer-swipe-movement-y)-var(--stack-peek-offset)-(var(--shrink)*var(--height))))_scale(var(--scale))]",
            position === "top" &&
              "origin-[50%_var(--inset)] data-nested-drawer-open:transform-[translateY(calc(var(--drawer-swipe-movement-y)+var(--stack-peek-offset)+(var(--shrink)*var(--height))))_scale(var(--scale))]",
            position === "left" &&
              "origin-right data-nested-drawer-open:transform-[translateX(calc(var(--drawer-swipe-movement-x)+var(--stack-peek-offset)))_scale(var(--scale))]",
            position === "right" &&
              "origin-left data-nested-drawer-open:transform-[translateX(calc(var(--drawer-swipe-movement-x)-var(--stack-peek-offset)))_scale(var(--scale))]",
            className,
          )}
          data-slot="drawer-popup"
          {...props}
        >
          {showBar && <DrawerBar position={position} />}
          {children}
          {showCloseButton && (
            <DrawerClose
              aria-label="Close"
              className="absolute top-4 right-4"
              render={<Button className="size-5" size="icon" variant="secondary" />}
            >
              <XIcon className="size-3" />
            </DrawerClose>
          )}
        </BaseDrawer.Popup>
      </DrawerViewport>
    </DrawerPortal>
  );
}

function DrawerBar({
  className,
  position: positionProp,
  ...props
}: {
  className?: string;
  position?: DrawerPosition;
}) {
  const { position: contextPosition } = useContext(DrawerContext);
  const position = positionProp ?? contextPosition;
  const horizontal = position === "left" || position === "right";

  return (
    <div
      aria-hidden
      className={cn(
        "absolute flex touch-none items-center justify-center p-3 before:rounded-full before:bg-input",
        horizontal ? "inset-y-0 before:h-12 before:w-1" : "inset-x-0 before:h-1 before:w-12",
        position === "top" && "bottom-0",
        position === "bottom" && "top-0",
        position === "left" && "right-0",
        position === "right" && "left-0",
        className,
      )}
      data-slot="drawer-bar"
      {...props}
    />
  );
}

function DrawerHeader({ className, children }: { className?: string; children?: React.ReactNode }) {
  return (
    <div className={cn("flex flex-col gap-1.5 p-6", className)} data-slot="drawer-header">
      {children}
    </div>
  );
}

function DrawerTitle(props: BaseDrawer.Title.Props) {
  return <BaseDrawer.Title className="text-lg font-bold" data-slot="drawer-title" {...props} />;
}

function DrawerDescription({ className, ...props }: BaseDrawer.Description.Props) {
  return (
    <BaseDrawer.Description
      className={cn("text-sm text-muted-foreground", className)}
      data-slot="drawer-description"
      {...props}
    />
  );
}

function DrawerBody({
  className,
  scrollable = true,
  ...props
}: useRender.ComponentProps<"div"> & { scrollable?: boolean }) {
  const content = useRender({
    defaultTagName: "div",
    props: {
      ...mergeProps<"div">(props, {
        className: cn("flex flex-col gap-3 px-6 pb-6", className),
      }),
      "data-slot": "drawer-body",
    },
  });

  if (scrollable) {
    return <ScrollArea className="min-h-0 flex-1 touch-auto">{content}</ScrollArea>;
  }
  return content;
}

function DrawerFooter({
  children,
  direction = "column",
  className,
}: {
  children: React.ReactNode;
  direction?: "row" | "column";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex gap-2 border-t border-border bg-muted p-6",
        direction === "row" && "flex-row justify-end",
        direction === "column" && "flex-col",
        className,
      )}
      data-slot="drawer-footer"
    >
      {children}
    </div>
  );
}

export {
  Drawer,
  DrawerTrigger,
  DrawerClose,
  DrawerPortal,
  DrawerBackdrop,
  DrawerViewport,
  DrawerContent,
  DrawerContentArea,
  DrawerSwipeArea,
  DrawerBar,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerBody,
  DrawerFooter,
  createDrawerHandle,
};
