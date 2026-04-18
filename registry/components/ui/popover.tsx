import { Popover as BasePopover } from "@base-ui/react/popover";
import { cn } from "@registry/lib/utils";
import { XIcon } from "@phosphor-icons/react";

import { Button } from "./button";

const Popover = (props: BasePopover.Root.Props) => (
  <BasePopover.Root data-slot="popover" {...props} />
);

function PopoverTrigger(props: BasePopover.Trigger.Props) {
  return <BasePopover.Trigger data-slot="popover-trigger" {...props} />;
}

const PopoverPortal = (props: BasePopover.Portal.Props) => (
  <BasePopover.Portal data-slot="popover-portal" {...props} />
);
const PopoverClose = (props: BasePopover.Close.Props) => (
  <BasePopover.Close data-slot="popover-close" {...props} />
);

function PopoverContent({
  className,
  children,
  positionerProps,
  ...props
}: BasePopover.Popup.Props & {
  positionerProps?: BasePopover.Positioner.Props;
}) {
  return (
    <BasePopover.Portal>
      <BasePopover.Positioner
        {...positionerProps}
        collisionPadding={positionerProps?.collisionPadding || 8}
        sideOffset={positionerProps?.sideOffset || 8}
      >
        <BasePopover.Popup
          className={cn(
            "z-50 w-80 rounded-2xl bg-popover shadow-lg outline outline-border",
            "origin-(--transform-origin) transition-all duration-150",
            "data-starting-style:scale-90 data-starting-style:opacity-0",
            "data-ending-style:scale-90 data-ending-style:opacity-0",
            className,
          )}
          data-slot="popover-popup"
          {...props}
        >
          {children}
        </BasePopover.Popup>
      </BasePopover.Positioner>
    </BasePopover.Portal>
  );
}

function PopoverTitle({ className, ...props }: BasePopover.Title.Props) {
  return (
    <BasePopover.Title
      className={cn("text-lg font-bold text-foreground", className)}
      data-slot="popover-title"
      {...props}
    />
  );
}

function PopoverHeader({
  className,
  children,
  closeButton = true,
}: {
  className?: string;
  closeButton?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <div className={cn("relative flex flex-col p-4", className)} data-slot="popover-header">
      {closeButton && (
        <PopoverClose
          className="absolute top-3 right-3"
          render={<Button className="size-5" size="icon" variant="secondary" />}
        >
          <XIcon className="size-3" />
        </PopoverClose>
      )}
      {children}
    </div>
  );
}

function PopoverBody({ className, children }: { className?: string; children?: React.ReactNode }) {
  return (
    <div className={cn("flex flex-col gap-3 px-4 pb-4", className)} data-slot="popover-body">
      {children}
    </div>
  );
}

export {
  Popover,
  PopoverTrigger,
  PopoverPortal,
  PopoverClose,
  PopoverContent,
  PopoverTitle,
  PopoverHeader,
  PopoverBody,
};
