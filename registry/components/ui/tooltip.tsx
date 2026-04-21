import { Tooltip as BaseTooltip } from "@base-ui/react/tooltip";
import { cn } from "@registry/lib/utils";

const createTooltipHandle = BaseTooltip.createHandle;

function Tooltip({ children, ...props }: BaseTooltip.Root.Props) {
  return (
    <BaseTooltip.Root data-slot="tooltip" {...props}>
      {children}
    </BaseTooltip.Root>
  );
}

function TooltipProvider({ ...props }: BaseTooltip.Provider.Props) {
  return <BaseTooltip.Provider data-slot="tooltip-provider" {...props} />;
}

function TooltipTrigger({ delay = 100, ...props }: BaseTooltip.Trigger.Props) {
  return <BaseTooltip.Trigger delay={delay} data-slot="tooltip-trigger" {...props} />;
}

function TooltipContent({
  className,
  children,
  positionerProps,
  portalProps,
  ...props
}: BaseTooltip.Popup.Props & {
  positionerProps?: BaseTooltip.Positioner.Props;
  portalProps?: BaseTooltip.Portal.Props;
}) {
  return (
    <BaseTooltip.Portal {...portalProps}>
      <BaseTooltip.Positioner
        alignOffset={positionerProps?.alignOffset || 0}
        className={cn(
          "outline-none",
          "h-(--positioner-height) w-(--positioner-width) max-w-(--available-width) transition-[top,left,right,bottom,transform] duration-[0.35s] ease-[cubic-bezier(0.22,1,0.36,1)] data-instant:transition-none",
          positionerProps?.className,
        )}
        side={positionerProps?.side || "top"}
        sideOffset={positionerProps?.sideOffset || 4}
        {...positionerProps}
      >
        <BaseTooltip.Popup
          className={cn(
            "flex h-(--popup-height,auto) w-(--popup-width,auto) origin-(--transform-origin) flex-col rounded-lg bg-gray-900 px-3 py-2 text-sm text-gray-50 transition-[transform,scale,opacity] data-ending-style:scale-90 data-ending-style:opacity-0 data-instant:duration-0 data-starting-style:scale-90 data-starting-style:opacity-0 dark:outline dark:-outline-offset-1 dark:outline-gray-700",
            className,
          )}
          data-slot="tooltip-popup"
          {...props}
        >
          {children}
        </BaseTooltip.Popup>
      </BaseTooltip.Positioner>
    </BaseTooltip.Portal>
  );
}

function TooltipViewport({
  children,
  className: _className,
  ...props
}: BaseTooltip.Viewport.Props) {
  return (
    <BaseTooltip.Viewport
      className="relative h-full w-full overflow-clip px-(--viewport-inline-padding) py-1 [--viewport-inline-padding:0.5rem] **:data-current:w-[calc(var(--popup-width)-2*var(--viewport-inline-padding))] **:data-current:translate-x-0 **:data-current:opacity-100 **:data-current:transition-[translate,opacity] **:data-current:duration-[350ms,175ms] **:data-current:ease-[cubic-bezier(0.22,1,0.36,1)] **:data-previous:w-[calc(var(--popup-width)-2*var(--viewport-inline-padding))] **:data-previous:translate-x-0 **:data-previous:opacity-100 **:data-previous:transition-[translate,opacity] **:data-previous:duration-[350ms,175ms] **:data-previous:ease-[cubic-bezier(0.22,1,0.36,1)] data-[activation-direction~='left']:[&_[data-current][data-starting-style]]:-translate-x-1/2 data-[activation-direction~='left']:[&_[data-current][data-starting-style]]:opacity-0 data-[activation-direction~='right']:[&_[data-current][data-starting-style]]:translate-x-1/2 data-[activation-direction~='right']:[&_[data-current][data-starting-style]]:opacity-0 data-[activation-direction~='left']:[&_[data-previous][data-ending-style]]:translate-x-1/2 data-[activation-direction~='left']:[&_[data-previous][data-ending-style]]:opacity-0 data-[activation-direction~='right']:[&_[data-previous][data-ending-style]]:-translate-x-1/2 data-[activation-direction~='right']:[&_[data-previous][data-ending-style]]:opacity-0 [[data-instant]_&_[data-current]]:transition-none [[data-instant]_&_[data-previous]]:transition-none"
      data-slot="tooltip-viewport"
      {...props}
    >
      {children}
    </BaseTooltip.Viewport>
  );
}

export {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
  TooltipViewport,
  createTooltipHandle,
};
