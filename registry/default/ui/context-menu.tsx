import { mergeProps, useRender } from "@base-ui/react";
import { ContextMenu as BaseContextMenu } from "@base-ui/react/context-menu";
import { cn } from "@/lib/utils";
import { CheckIcon, DotOutlineIcon } from "@phosphor-icons/react/dist/ssr";
import { cva } from "class-variance-authority";
import type { VariantProps } from "class-variance-authority";

function ContextMenu(props: BaseContextMenu.Root.Props) {
  return <BaseContextMenu.Root data-slot="context-menu" {...props} />;
}

function ContextMenuTrigger({ className, ...props }: BaseContextMenu.Trigger.Props) {
  return (
    <BaseContextMenu.Trigger
      className={cn("select-none", className)}
      data-slot="context-menu-trigger"
      {...props}
    />
  );
}

function ContextMenuGroup({ className, ...props }: BaseContextMenu.Group.Props) {
  return (
    <BaseContextMenu.Group
      className={cn("col-span-full grid grid-cols-subgrid", className)}
      data-slot="context-menu-group"
      {...props}
    />
  );
}

function ContextMenuGroupLabel({ className, ...props }: BaseContextMenu.GroupLabel.Props) {
  return (
    <BaseContextMenu.GroupLabel
      className={cn("col-start-2 py-1.5 text-sm text-muted-foreground select-none", className)}
      data-slot="context-menu-group-label"
      {...props}
    />
  );
}

function ContextMenuContent({
  children,
  className,
  positionerProps,
  ...props
}: {
  positionerProps?: BaseContextMenu.Positioner.Props;
} & BaseContextMenu.Popup.Props) {
  return (
    <BaseContextMenu.Portal>
      <BaseContextMenu.Positioner
        {...positionerProps}
        className={cn("z-50 outline-none", positionerProps?.className)}
      >
        <BaseContextMenu.Popup
          className={cn(
            "min-w-40 origin-(--transform-origin) overflow-hidden rounded-xl bg-popover text-popover-foreground shadow-lg outline outline-border transition-[transform,scale,opacity] data-ending-style:scale-90 data-ending-style:opacity-0 data-starting-style:scale-90 data-starting-style:opacity-0 dark:shadow-none",
            className,
          )}
          data-slot="context-menu-popup"
          {...props}
        >
          <div
            className="grid max-h-(--available-height) grid-cols-[auto_1fr_auto] overflow-y-auto p-1.5"
            data-slot="context-menu-scroll-container"
          >
            {children}
          </div>
        </BaseContextMenu.Popup>
      </BaseContextMenu.Positioner>
    </BaseContextMenu.Portal>
  );
}

const contextMenuItemVariants = cva(
  "group col-span-full grid cursor-default grid-cols-subgrid items-center p-2 text-sm leading-4 outline-none select-none data-disabled:pointer-events-none data-disabled:cursor-not-allowed data-disabled:opacity-50 data-highlighted:relative data-highlighted:z-0 data-highlighted:before:absolute data-highlighted:before:inset-0 data-highlighted:before:inset-y-0 data-highlighted:before:z-[-1] data-highlighted:before:rounded-lg [&>[data-slot=context-menu-item-label]~[data-slot=context-menu-item-addon]]:col-start-3 [&>[data-slot=context-menu-item-label]~[data-slot=context-menu-item-addon]]:ms-2 [&>[data-slot=context-menu-item-label]~[data-slot=context-menu-item-addon]]:me-0",
  {
    defaultVariants: {
      variant: "default",
    },
    variants: {
      variant: {
        default:
          "text-popover-foreground data-highlighted:text-primary-foreground data-highlighted:before:bg-primary [&>[data-slot=context-menu-item-addon]]:text-muted-foreground data-highlighted:[&>[data-slot=context-menu-item-addon]]:text-primary-foreground",
        destructive:
          "text-destructive data-highlighted:text-destructive-foreground data-highlighted:before:bg-destructive [&>[data-slot=context-menu-item-addon]]:text-destructive/80 data-highlighted:[&>[data-slot=context-menu-item-addon]]:text-destructive-foreground",
      },
    },
  },
);

export interface ContextMenuItemProps
  extends BaseContextMenu.Item.Props, VariantProps<typeof contextMenuItemVariants> {}

function ContextMenuItem({ variant, className, ...props }: ContextMenuItemProps) {
  return (
    <BaseContextMenu.Item
      className={cn(
        contextMenuItemVariants({
          className,
          variant,
        }),
      )}
      data-slot="context-menu-item"
      {...props}
    />
  );
}

export interface ContextMenuLinkItemProps
  extends BaseContextMenu.LinkItem.Props, VariantProps<typeof contextMenuItemVariants> {}

function ContextMenuLinkItem({ variant, className, ...props }: ContextMenuLinkItemProps) {
  return (
    <BaseContextMenu.LinkItem
      className={cn(
        contextMenuItemVariants({
          className,
          variant,
        }),
      )}
      data-slot="context-menu-link-item"
      {...props}
    />
  );
}

function ContextMenuItemAddon({ className, render, ...props }: useRender.ComponentProps<"span">) {
  const addonElement = useRender({
    defaultTagName: "span",
    props: {
      ...mergeProps<"span">(
        {
          className: cn(
            "col-start-1 me-2 inline-flex shrink-0 items-center justify-center gap-1.5 whitespace-nowrap [&_svg:not([class*='size-'])]:size-4",
            className,
          ),
        },
        props,
      ),
      "data-slot": "context-menu-item-addon",
    },
    render,
  });
  return addonElement;
}

function ContextMenuItemLabel({ className, render, ...props }: useRender.ComponentProps<"span">) {
  const labelElement = useRender({
    defaultTagName: "span",
    props: {
      ...mergeProps<"span">(
        {
          className: cn("col-start-2 flex items-center", className),
        },
        props,
      ),
      "data-slot": "context-menu-item-label",
    },
    render,
  });
  return labelElement;
}

function ContextMenuSeparator({ className, ...props }: BaseContextMenu.Separator.Props) {
  return (
    <BaseContextMenu.Separator
      className={cn("col-span-full mx-2 my-1.5 h-px bg-border", className)}
      data-slot="context-menu-separator"
      {...props}
    />
  );
}

function ContextMenuSubmenu(props: BaseContextMenu.SubmenuRoot.Props) {
  return <BaseContextMenu.SubmenuRoot data-slot="context-menu-submenu" {...props} />;
}

function ContextMenuSubmenuTrigger({ className, ...props }: BaseContextMenu.SubmenuTrigger.Props) {
  return (
    <BaseContextMenu.SubmenuTrigger
      className={cn(
        contextMenuItemVariants(),
        "data-popup-open:relative data-popup-open:z-0 data-popup-open:before:absolute data-popup-open:before:inset-0 data-popup-open:before:inset-y-0 data-popup-open:before:z-[-1] data-popup-open:before:rounded-lg data-popup-open:before:bg-muted data-highlighted:data-popup-open:text-primary-foreground data-highlighted:data-popup-open:before:bg-primary",
        className,
      )}
      data-slot="context-menu-submenu-trigger"
      {...props}
    />
  );
}

function ContextMenuRadioGroup({ className, ...props }: BaseContextMenu.RadioGroup.Props) {
  return (
    <BaseContextMenu.RadioGroup
      className={cn("col-span-full grid grid-cols-subgrid", className)}
      data-slot="context-menu-radio-group"
      {...props}
    />
  );
}

function ContextMenuRadioItem({ className, children, ...props }: BaseContextMenu.RadioItem.Props) {
  return (
    <BaseContextMenu.RadioItem
      className={cn(contextMenuItemVariants(), className)}
      data-slot="context-menu-radio-item"
      {...props}
    >
      <ContextMenuRadioItemIndicator />

      {children}
    </BaseContextMenu.RadioItem>
  );
}

function ContextMenuRadioItemIndicator({
  className,
  ...props
}: BaseContextMenu.RadioItemIndicator.Props) {
  return (
    <ContextMenuItemAddon className="size-4">
      <BaseContextMenu.RadioItemIndicator
        className={cn("size-4", className)}
        data-slot="context-menu-radio-item-indicator"
        render={<DotOutlineIcon weight="fill" />}
        {...props}
      />
    </ContextMenuItemAddon>
  );
}

function ContextMenuCheckboxItem({
  className,
  children,
  ...props
}: BaseContextMenu.CheckboxItem.Props) {
  return (
    <BaseContextMenu.CheckboxItem
      className={cn(contextMenuItemVariants(), className)}
      data-slot="context-menu-checkbox-item"
      {...props}
    >
      <ContextMenuCheckboxItemIndicator />
      {children}
    </BaseContextMenu.CheckboxItem>
  );
}

function ContextMenuCheckboxItemIndicator({
  className,
  ...props
}: BaseContextMenu.CheckboxItemIndicator.Props) {
  return (
    <ContextMenuItemAddon className="size-4">
      <BaseContextMenu.CheckboxItemIndicator
        className={cn("size-4", className)}
        data-slot="context-menu-checkbox-item-indicator"
        render={<CheckIcon />}
        {...props}
      />
    </ContextMenuItemAddon>
  );
}

export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLinkItem,
  ContextMenuGroup,
  ContextMenuGroupLabel,
  ContextMenuSeparator,
  ContextMenuItemAddon,
  ContextMenuItemLabel,
  ContextMenuSubmenu,
  ContextMenuSubmenuTrigger,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuRadioItemIndicator,
  ContextMenuCheckboxItem,
  ContextMenuCheckboxItemIndicator,
};
