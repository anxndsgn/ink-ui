import { mergeProps, useRender } from "@base-ui/react";
import { Menu as BaseMenu } from "@base-ui/react/menu";
import { cn } from "@/lib/utils";
import { CheckIcon, DotOutlineIcon } from "@phosphor-icons/react/dist/ssr";
import { cva } from "class-variance-authority";
import type { VariantProps } from "class-variance-authority";

function Menu(props: BaseMenu.Root.Props) {
  return <BaseMenu.Root data-slot="menu" {...props} />;
}

function MenuTrigger(props: BaseMenu.Trigger.Props) {
  return <BaseMenu.Trigger data-slot="menu-trigger" {...props} />;
}

function MenuGroup({ className, ...props }: BaseMenu.Group.Props) {
  return (
    <BaseMenu.Group
      className={cn("col-span-full grid grid-cols-subgrid", className)}
      data-slot="menu-group"
      {...props}
    />
  );
}

function MenuGroupLabel({ className, ...props }: BaseMenu.GroupLabel.Props) {
  return (
    <BaseMenu.GroupLabel
      className={cn("col-start-2 py-1.5 text-sm text-muted-foreground select-none", className)}
      data-slot="menu-group-label"
      {...props}
    />
  );
}

function MenuContent({
  children,
  className,
  positionerProps,
  ...props
}: {
  positionerProps?: BaseMenu.Positioner.Props;
} & BaseMenu.Popup.Props) {
  return (
    <BaseMenu.Portal>
      <BaseMenu.Positioner
        {...positionerProps}
        align={positionerProps?.align ?? "start"}
        alignOffset={positionerProps?.alignOffset ?? -5}
        className={cn("z-50 outline-none", positionerProps?.className)}
        sideOffset={positionerProps?.sideOffset ?? 12}
      >
        <BaseMenu.Popup
          className={cn(
            "min-w-40 origin-(--transform-origin) overflow-hidden rounded-xl bg-popover text-popover-foreground shadow-lg outline outline-border transition-[transform,scale,opacity] data-ending-style:scale-90 data-ending-style:opacity-0 data-starting-style:scale-90 data-starting-style:opacity-0 dark:shadow-none",
            className,
          )}
          data-slot="menu-popup"
          {...props}
        >
          <div
            className="grid max-h-(--available-height) grid-cols-[auto_1fr_auto] overflow-y-auto p-1.5"
            data-slot="menu-scroll-container"
          >
            {children}
          </div>
        </BaseMenu.Popup>
      </BaseMenu.Positioner>
    </BaseMenu.Portal>
  );
}

const menuItemVariants = cva(
  "group col-span-full grid cursor-default grid-cols-subgrid items-center p-2 text-sm leading-4 outline-none select-none data-disabled:pointer-events-none data-disabled:cursor-not-allowed data-disabled:opacity-50 data-highlighted:relative data-highlighted:z-0 data-highlighted:before:absolute data-highlighted:before:inset-0 data-highlighted:before:inset-y-0 data-highlighted:before:z-[-1] data-highlighted:before:rounded-lg [&>[data-slot=menu-item-label]~[data-slot=menu-item-addon]]:col-start-3 [&>[data-slot=menu-item-label]~[data-slot=menu-item-addon]]:ms-2 [&>[data-slot=menu-item-label]~[data-slot=menu-item-addon]]:me-0",
  {
    defaultVariants: {
      variant: "default",
    },
    variants: {
      variant: {
        default:
          "text-popover-foreground data-highlighted:text-primary-foreground data-highlighted:before:bg-primary [&>[data-slot=menu-item-addon]]:text-muted-foreground data-highlighted:[&>[data-slot=menu-item-addon]]:text-primary-foreground",
        destructive:
          "text-destructive data-highlighted:text-destructive-foreground data-highlighted:before:bg-destructive [&>[data-slot=menu-item-addon]]:text-destructive/80 data-highlighted:[&>[data-slot=menu-item-addon]]:text-destructive-foreground",
      },
    },
  },
);

export interface MenuItemProps extends BaseMenu.Item.Props, VariantProps<typeof menuItemVariants> {}

function MenuItem({ variant, className, ...props }: MenuItemProps) {
  return (
    <BaseMenu.Item
      className={cn(
        menuItemVariants({
          className,
          variant,
        }),
      )}
      data-slot="menu-item"
      {...props}
    />
  );
}

export interface MenuLinkItemProps
  extends BaseMenu.LinkItem.Props, VariantProps<typeof menuItemVariants> {}

function MenuLinkItem({ variant, className, ...props }: MenuLinkItemProps) {
  return (
    <BaseMenu.LinkItem
      className={cn(
        menuItemVariants({
          className,
          variant,
        }),
      )}
      data-slot="menu-link-item"
      {...props}
    />
  );
}

function MenuItemAddon({ className, render, ...props }: useRender.ComponentProps<"span">) {
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
      "data-slot": "menu-item-addon",
    },
    render,
  });
  return addonElement;
}

function MenuItemLabel({ className, render, ...props }: useRender.ComponentProps<"span">) {
  const labelElement = useRender({
    defaultTagName: "span",
    props: {
      ...mergeProps<"span">(
        {
          className: cn("col-start-2 flex items-center", className),
        },
        props,
      ),
      "data-slot": "menu-item-label",
    },
    render,
  });
  return labelElement;
}

function MenuSeparator({ className, ...props }: BaseMenu.Separator.Props) {
  return (
    <BaseMenu.Separator
      className={cn("col-span-full mx-2 my-1.5 h-px bg-border", className)}
      data-slot="menu-separator"
      {...props}
    />
  );
}

function MenuSubmenu(props: BaseMenu.SubmenuRoot.Props) {
  return <BaseMenu.SubmenuRoot data-slot="menu-submenu" {...props} />;
}

function MenuSubmenuTrigger({ className, ...props }: BaseMenu.SubmenuTrigger.Props) {
  return (
    <BaseMenu.SubmenuTrigger
      className={cn(
        menuItemVariants(),
        "data-popup-open:relative data-popup-open:z-0 data-popup-open:before:absolute data-popup-open:before:inset-0 data-popup-open:before:inset-y-0 data-popup-open:before:z-[-1] data-popup-open:before:rounded-lg data-popup-open:before:bg-muted data-highlighted:data-popup-open:text-primary-foreground data-highlighted:data-popup-open:before:bg-primary",
        className,
      )}
      data-slot="menu-submenu-trigger"
      {...props}
    />
  );
}

function MenuRadioGroup({ className, ...props }: BaseMenu.RadioGroup.Props) {
  return (
    <BaseMenu.RadioGroup
      className={cn("col-span-full grid grid-cols-subgrid", className)}
      data-slot="menu-radio-group"
      {...props}
    />
  );
}

function MenuRadioItem({ className, children, ...props }: BaseMenu.RadioItem.Props) {
  return (
    <BaseMenu.RadioItem
      className={cn(menuItemVariants(), className)}
      data-slot="menu-radio-item"
      {...props}
    >
      <MenuRadioItemIndicator />

      {children}
    </BaseMenu.RadioItem>
  );
}

function MenuRadioItemIndicator({ className, ...props }: BaseMenu.RadioItemIndicator.Props) {
  return (
    <MenuItemAddon className="size-4">
      <BaseMenu.RadioItemIndicator
        className={cn("size-4", className)}
        data-slot="menu-radio-item-indicator"
        render={<DotOutlineIcon weight="fill" />}
        {...props}
      />
    </MenuItemAddon>
  );
}

function MenuCheckboxItem({ className, children, ...props }: BaseMenu.CheckboxItem.Props) {
  return (
    <BaseMenu.CheckboxItem
      className={cn(menuItemVariants(), className)}
      data-slot="menu-checkbox-item"
      {...props}
    >
      <MenuCheckboxItemIndicator />
      {children}
    </BaseMenu.CheckboxItem>
  );
}

function MenuCheckboxItemIndicator({ className, ...props }: BaseMenu.CheckboxItemIndicator.Props) {
  return (
    <MenuItemAddon className="size-4">
      <BaseMenu.CheckboxItemIndicator
        className={cn("size-4", className)}
        data-slot="menu-checkbox-item-indicator"
        render={<CheckIcon />}
        {...props}
      />
    </MenuItemAddon>
  );
}

export {
  Menu,
  MenuTrigger,
  MenuContent,
  MenuItem,
  MenuLinkItem,
  MenuGroup,
  MenuGroupLabel,
  MenuSeparator,
  MenuItemAddon,
  MenuItemLabel,
  MenuSubmenu,
  MenuSubmenuTrigger,
  MenuRadioGroup,
  MenuRadioItem,
  MenuRadioItemIndicator,
  MenuCheckboxItem,
  MenuCheckboxItemIndicator,
};
