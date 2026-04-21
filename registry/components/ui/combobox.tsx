import * as React from "react";
import { Combobox as BaseCombobox, mergeProps, useRender } from "@base-ui/react";
import { cn } from "@registry/lib/utils";
import { CaretUpDownIcon, CheckIcon, XIcon } from "@phosphor-icons/react";
import { Tag } from "./tag";

const Combobox = BaseCombobox.Root;

function ComboboxValue({ ...props }: BaseCombobox.Value.Props) {
  return <BaseCombobox.Value data-slot="combobox-value" {...props} />;
}

function ComboboxContent({
  className,
  positionerProps,
  children,
  ...props
}: BaseCombobox.Popup.Props & {
  positionerProps?: BaseCombobox.Positioner.Props;
}) {
  return (
    <BaseCombobox.Portal>
      <BaseCombobox.Positioner
        className={cn(
          "z-10 min-w-(--anchor-width) outline-none select-none",
          positionerProps?.className,
        )}
        sideOffset={8}
        {...positionerProps}
      >
        <BaseCombobox.Popup
          className={cn(
            "group origin-(--transform-origin) rounded-xl bg-white p-1.5 text-gray-900 shadow-lg outline outline-gray-900/10 transition-[transform,scale,opacity] data-ending-style:scale-90 data-ending-style:opacity-0 data-starting-style:scale-90 data-starting-style:opacity-0 data-[side=none]:data-ending-style:transition-none data-[side=none]:data-starting-style:scale-100 data-[side=none]:data-starting-style:opacity-100 data-[side=none]:data-starting-style:transition-none dark:bg-gray-900 dark:text-gray-50 dark:shadow-none dark:-outline-offset-1 dark:outline-gray-700",
            className,
          )}
          data-slot="combobox-popup"
          {...props}
        >
          {children}
        </BaseCombobox.Popup>
      </BaseCombobox.Positioner>
    </BaseCombobox.Portal>
  );
}

function ComboboxList({ className, children, ...props }: BaseCombobox.List.Props) {
  return (
    <BaseCombobox.List
      className={cn(
        "relative grid max-h-(--available-height) scroll-py-6 grid-cols-[auto_auto_1fr_auto] overflow-y-auto empty:py-0",
        className,
      )}
      data-slot="combobox-list"
      {...props}
    >
      {children}
    </BaseCombobox.List>
  );
}

function ComboboxItemLeadingIcon({
  className,
  render,
  ...props
}: useRender.ComponentProps<"span">) {
  const iconElement = useRender({
    defaultTagName: "span",
    props: {
      ...mergeProps<"span">(
        {
          className: cn("mr-2 inline-flex size-4 shrink-0", className),
        },
        props,
      ),
      "data-slot": "combobox-item-leading-icon",
    },
    render,
  });
  return iconElement;
}

function ComboboxItemTrailingIcon({
  className,
  render,
  ...props
}: useRender.ComponentProps<"span">) {
  const iconElement = useRender({
    defaultTagName: "span",
    props: {
      ...mergeProps<"span">(
        {
          className: cn("ml-2 inline-flex size-4 shrink-0", className),
        },
        props,
      ),
      "data-slot": "combobox-item-trailing-icon",
    },
    render,
  });
  return iconElement;
}

function ComboboxItemLabel({ className, render, ...props }: useRender.ComponentProps<"span">) {
  const labelElement = useRender({
    defaultTagName: "span",
    props: {
      ...mergeProps<"span">(
        {
          className: cn("col-start-3 flex items-center", className),
        },
        props,
      ),
      "data-slot": "combobox-item-label",
    },
    render,
  });
  return labelElement;
}

function ComboboxItemIndicator({ className, ...props }: BaseCombobox.ItemIndicator.Props) {
  return (
    <ComboboxItemLeadingIcon>
      <BaseCombobox.ItemIndicator
        className={cn("size-4", className)}
        data-slot="combobox-item-indicator"
        render={<CheckIcon className="size-4" />}
        {...props}
      />
    </ComboboxItemLeadingIcon>
  );
}

function ComboboxItem({ className, children, ...props }: BaseCombobox.Item.Props) {
  return (
    <BaseCombobox.Item
      className={cn(
        "group col-span-full grid min-w-(--anchor-width) cursor-default grid-cols-subgrid items-center p-2 text-sm leading-4 outline-none select-none group-data-[side=none]:min-w-[calc(var(--anchor-width)+1rem)] group-data-[side=none]:pr-12 group-data-[side=none]:text-base group-data-[side=none]:leading-4 data-disabled:pointer-events-none data-disabled:cursor-not-allowed data-disabled:opacity-50 data-highlighted:relative data-highlighted:z-0 data-highlighted:text-gray-50 data-highlighted:before:absolute data-highlighted:before:inset-0 data-highlighted:before:z-[-1] data-highlighted:before:rounded-lg data-highlighted:before:bg-gray-900 dark:data-highlighted:text-gray-900 dark:data-highlighted:before:bg-gray-100 pointer-coarse:py-2.5 pointer-coarse:text-[0.925rem]",
        className,
      )}
      data-slot="combobox-item"
      {...props}
    >
      <ComboboxItemIndicator />
      {children}
    </BaseCombobox.Item>
  );
}

function ComboboxTrigger({ children, className, ...props }: BaseCombobox.Trigger.Props) {
  return (
    <BaseCombobox.Trigger
      className={cn(
        "flex min-h-9 min-w-36 cursor-default items-center justify-between gap-3 rounded-lg border border-gray-200 bg-white p-2 text-sm text-gray-900 transition-all duration-150 select-none hover:bg-gray-100 focus-visible:ring-[3px] focus-visible:ring-orange-500/30 focus-visible:outline focus-visible:-outline-offset-1 focus-visible:outline-orange-500 data-popup-open:bg-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-50 dark:hover:bg-gray-800 dark:data-popup-open:bg-gray-800",
        className,
      )}
      data-slot="combobox-trigger"
      {...props}
    >
      {children}
      <CaretUpDownIcon className="size-4 shrink-0" />
    </BaseCombobox.Trigger>
  );
}

function ComboboxInput({
  className,
  children,
  showRemove = true,
  showTrigger = true,
  ...props
}: BaseCombobox.Input.Props & {
  children?: React.ReactNode;
  showTrigger?: boolean;
  showRemove?: boolean;
}) {
  return (
    <BaseCombobox.InputGroup
      className={cn(
        "flex min-h-9 items-center gap-1 rounded-lg border border-input p-2 text-sm text-foreground hover:border-accent",
        "focus-within:border-orange-500 focus-within:ring-[3px] focus-within:ring-orange-500/30",
        "bg-gray-950/5 dark:bg-gray-950/30",
        "transition-all duration-150",
        className,
      )}
      data-slot="combobox-input"
    >
      {children ? (
        <BaseCombobox.Chips className="flex flex-1 flex-wrap items-center gap-1">
          {children}
          <BaseCombobox.Input className="min-w-12 flex-1 leading-4 outline-none" {...props} />
        </BaseCombobox.Chips>
      ) : (
        <BaseCombobox.Input className="w-full leading-4 outline-none" {...props} />
      )}
      {showRemove && (
        <BaseCombobox.Clear className="pr-1">
          <XIcon className="size-4" />
        </BaseCombobox.Clear>
      )}
      {showTrigger && (
        <BaseCombobox.Trigger>
          <CaretUpDownIcon className="size-4" />
        </BaseCombobox.Trigger>
      )}
    </BaseCombobox.InputGroup>
  );
}

function ComboboxEmpty({ className, children, ...props }: BaseCombobox.Empty.Props) {
  return (
    <BaseCombobox.Empty
      className={cn("px-2.5 py-2 text-sm text-gray-600 empty:hidden dark:text-gray-400", className)}
      data-slot="combobox-empty"
      {...props}
    >
      {children}
    </BaseCombobox.Empty>
  );
}

function ComboboxSeparator(props: BaseCombobox.Separator.Props) {
  return (
    <BaseCombobox.Separator
      className="h-px w-full bg-gray-200 dark:bg-gray-800"
      data-slot="combobox-separator"
      {...props}
    />
  );
}

function ComboboxChips({ className, ...props }: BaseCombobox.Chips.Props) {
  return (
    <BaseCombobox.Chips
      className={cn("flex flex-wrap gap-1", className)}
      data-slot="combobox-chips"
      {...props}
    />
  );
}

function ComboboxChip({
  className,
  children,
  showRemove = true,
  ...props
}: BaseCombobox.Chip.Props & { showRemove?: boolean }) {
  return (
    <BaseCombobox.Chip
      render={<Tag variant="outline" size="sm" className="rounded-sm" />}
      className={cn("h-4.5", className)}
      data-slot="combobox-chip"
      {...props}
    >
      {children}
      {showRemove && (
        <BaseCombobox.ChipRemove>
          <XIcon className="size-3" />
        </BaseCombobox.ChipRemove>
      )}
    </BaseCombobox.Chip>
  );
}

function ComboboxGroup({ className, ...props }: BaseCombobox.Group.Props) {
  return (
    <BaseCombobox.Group
      className={cn("col-span-full grid grid-cols-subgrid", className)}
      data-slot="combobox-group"
      {...props}
    />
  );
}

function ComboboxGroupLabel({ className, ...props }: BaseCombobox.GroupLabel.Props) {
  return (
    <BaseCombobox.GroupLabel
      className={cn("col-start-2 py-1.5 text-sm text-muted-foreground select-none", className)}
      data-slot="combobox-group-label"
      {...props}
    />
  );
}

export {
  Combobox,
  ComboboxTrigger,
  ComboboxContent,
  ComboboxList,
  ComboboxItem,
  ComboboxValue,
  ComboboxInput,
  ComboboxEmpty,
  ComboboxSeparator,
  ComboboxChips,
  ComboboxChip,
  ComboboxItemIndicator,
  ComboboxGroup,
  ComboboxGroupLabel,
  ComboboxItemLeadingIcon,
  ComboboxItemTrailingIcon,
  ComboboxItemLabel,
};
