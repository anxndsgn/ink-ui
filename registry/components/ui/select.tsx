import { Select as BaseSelect } from "@base-ui/react/select";
import { cn } from "@registry/lib/utils";
import { CaretDownIcon, CheckIcon } from "@phosphor-icons/react";
import type { VariantProps } from "class-variance-authority";

import { buttonVariants } from "./button";

function Select<T>(props: BaseSelect.Root.Props<T>) {
  return <BaseSelect.Root data-slot="select" {...props} />;
}

function SelectTrigger({
  children,
  className,
  variant = "outline",
  size = "default",
  ...props
}: BaseSelect.Trigger.Props & VariantProps<typeof buttonVariants>) {
  return (
    <BaseSelect.Trigger
      className={(state) =>
        cn(
          buttonVariants({ className, size, variant }),
          "justify-between gap-3 **:data-[slot=select-icon]:transition-transform **:data-[slot=select-icon]:duration-150",
          state.open && "**:data-[slot=select-icon]:rotate-180",
          className,
        )
      }
      data-slot="select-trigger"
      {...props}
    >
      {children}

      <BaseSelect.Icon render={<CaretDownIcon className="size-4" data-slot="select-icon" />} />
    </BaseSelect.Trigger>
  );
}

function SelectValue(props: BaseSelect.Value.Props) {
  return <BaseSelect.Value data-slot="select-value" {...props} />;
}

function SelectContent({
  className,
  positionerProps,
  listProps,
  children,
  ...props
}: BaseSelect.Popup.Props & {
  positionerProps?: BaseSelect.Positioner.Props;
  listProps?: BaseSelect.List.Props;
}) {
  return (
    <BaseSelect.Portal>
      <BaseSelect.Positioner
        {...positionerProps}
        alignItemWithTrigger={positionerProps?.alignItemWithTrigger ?? false}
        sideOffset={8}
        className={cn(
          "z-10 min-w-(--anchor-width) outline-none select-none",
          positionerProps?.className,
        )}
      >
        <BaseSelect.Popup
          className={cn(
            "group origin-(--transform-origin) rounded-xl bg-popover bg-clip-padding text-popover-foreground shadow-lg outline outline-border transition-[transform,scale,opacity] data-ending-style:scale-90 data-ending-style:opacity-0 data-starting-style:scale-90 data-starting-style:opacity-0 data-[side=none]:data-ending-style:transition-none data-[side=none]:data-starting-style:scale-100 data-[side=none]:data-starting-style:opacity-100 data-[side=none]:data-starting-style:transition-none dark:shadow-none",
            className,
          )}
          data-slot="select-popup"
          {...props}
        >
          <BaseSelect.List
            className="relative grid max-h-(--available-height) scroll-py-6 grid-cols-[auto_1fr] overflow-y-auto p-1.5"
            data-slot="select-list"
            {...listProps}
          >
            {children}
          </BaseSelect.List>
        </BaseSelect.Popup>
      </BaseSelect.Positioner>
    </BaseSelect.Portal>
  );
}

function SelectItem({ className, children, ...props }: BaseSelect.Item.Props) {
  return (
    <BaseSelect.Item
      className={cn(
        "group/selectitem col-span-full grid min-w-(--anchor-width) cursor-default grid-cols-subgrid items-center gap-2 py-2 pr-4 pl-2.5 text-sm leading-4 outline-none select-none group-data-[side=none]:min-w-[calc(var(--anchor-width)+1rem)] group-data-[side=none]:pr-12 group-data-[side=none]:text-base group-data-[side=none]:leading-4 data-highlighted:relative data-highlighted:z-0 data-highlighted:text-primary-foreground data-highlighted:before:absolute data-highlighted:before:inset-0 data-highlighted:before:z-[-1] data-highlighted:before:rounded-lg data-highlighted:before:bg-primary pointer-coarse:py-2.5 pointer-coarse:text-[0.925rem]",
        className,
      )}
      data-slot="select-item"
      {...props}
    >
      <SelectItemIndicator />
      <BaseSelect.ItemText className="col-start-2" data-slot="select-item-text">
        {children}
      </BaseSelect.ItemText>
    </BaseSelect.Item>
  );
}

function SelectItemIndicator({ className, ...props }: BaseSelect.ItemIndicator.Props) {
  return (
    <div className="col-start-1 size-4">
      <BaseSelect.ItemIndicator
        className={className}
        data-slot="select-item-indicator"
        render={<CheckIcon />}
        {...props}
      />
    </div>
  );
}

function SelectSeparator(props: BaseSelect.Separator.Props) {
  return (
    <BaseSelect.Separator
      className="col-span-full my-1.5 h-px bg-border"
      data-slot="select-separator"
      {...props}
    />
  );
}

export { Select, SelectTrigger, SelectContent, SelectItem, SelectValue, SelectSeparator };
