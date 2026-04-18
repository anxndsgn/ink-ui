import { ScrollArea as BaseScrollArea } from "@base-ui/react/scroll-area";
import { cn } from "@registry/lib/utils";

function ScrollArea({
  className,
  rootClassName,
  children,
  orientation = "both",
  ...props
}: BaseScrollArea.Root.Props & {
  orientation?: "horizontal" | "vertical" | "both";
  rootClassName?: string;
}) {
  return (
    <BaseScrollArea.Root className={cn("size-full min-h-0", rootClassName)} {...props}>
      <BaseScrollArea.Viewport
        className={cn(
          "size-full overscroll-contain rounded-[inherit] transition-shadow outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background",
          className,
        )}
        data-slot="scroll-area-viewport"
      >
        {children}
      </BaseScrollArea.Viewport>
      {(orientation === "vertical" || orientation === "both") && (
        <ScrollBar orientation="vertical" />
      )}
      {(orientation === "horizontal" || orientation === "both") && (
        <ScrollBar orientation="horizontal" />
      )}
      {orientation === "both" && <BaseScrollArea.Corner data-slot="scroll-area-corner" />}
    </BaseScrollArea.Root>
  );
}

function ScrollBar({
  className,
  orientation = "vertical",
  ...props
}: BaseScrollArea.Scrollbar.Props) {
  return (
    <BaseScrollArea.Scrollbar
      className={cn(
        "pointer-events-none flex justify-center rounded opacity-0 transition-opacity delay-300 data-hovering:pointer-events-auto data-hovering:opacity-100 data-hovering:delay-0 data-hovering:duration-75 data-scrolling:pointer-events-auto data-scrolling:opacity-100 data-scrolling:delay-0 data-scrolling:duration-75",
        "m-1 data-[orientation=horizontal]:h-1 data-[orientation=horizontal]:flex-col data-[orientation=vertical]:w-1",
        className,
      )}
      data-slot="scroll-area-scrollbar"
      orientation={orientation}
      {...props}
    >
      <BaseScrollArea.Thumb
        className="relative flex-1 rounded-full bg-muted-foreground/30"
        data-slot="scroll-area-thumb"
      />
    </BaseScrollArea.Scrollbar>
  );
}

export { ScrollArea, ScrollBar };
