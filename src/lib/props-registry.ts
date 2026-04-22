export interface PropDef {
  name: string;
  type: string;
  defaultValue?: string;
  description: string;
}

export interface ComponentPropsEntry {
  props: PropDef[];
  extends?: {
    name: string;
    href: string;
  };
}

export const propsRegistry: Record<string, ComponentPropsEntry> = {
  Button: {
    extends: {
      name: "Base UI Button",
      href: "https://base-ui.com/react/components/button",
    },
    props: [
      {
        name: "variant",
        type: '"default" | "secondary" | "outline" | "ghost" | "destructive" | "revert"',
        defaultValue: '"default"',
        description: "Visual style of the button.",
      },
      {
        name: "size",
        type: '"default" | "sm" | "lg" | "icon" | "icon-sm"',
        defaultValue: '"default"',
        description: "Size of the button.",
      },
      {
        name: "loading",
        type: "boolean",
        defaultValue: "false",
        description: "When true, shows a spinner and disables the button.",
      },
    ],
  },
  Menu: {
    extends: {
      name: "Base UI Menu.Root",
      href: "https://base-ui.com/react/components/menu#api-reference",
    },
    props: [],
  },
  MenuTrigger: {
    extends: {
      name: "Base UI Menu.Trigger",
      href: "https://base-ui.com/react/components/menu#api-reference",
    },
    props: [],
  },
  MenuContent: {
    extends: {
      name: "Base UI Menu.Popup",
      href: "https://base-ui.com/react/components/menu#api-reference",
    },
    props: [
      {
        name: "positionerProps",
        type: "BaseMenu.Positioner.Props",
        description:
          "Props forwarded to the underlying Positioner component. Includes align, side, sideOffset, alignOffset, collisionPadding, etc.",
      },
    ],
  },
  MenuItem: {
    extends: {
      name: "Base UI Menu.Item",
      href: "https://base-ui.com/react/components/menu#api-reference",
    },
    props: [
      {
        name: "variant",
        type: '"default" | "destructive"',
        defaultValue: '"default"',
        description: "Visual style of the menu item.",
      },
    ],
  },
  MenuLinkItem: {
    extends: {
      name: "Base UI Menu.LinkItem",
      href: "https://base-ui.com/react/components/menu#api-reference",
    },
    props: [
      {
        name: "variant",
        type: '"default" | "destructive"',
        defaultValue: '"default"',
        description: "Visual style of the menu item.",
      },
    ],
  },
  MenuGroup: {
    extends: {
      name: "Base UI Menu.Group",
      href: "https://base-ui.com/react/components/menu#api-reference",
    },
    props: [],
  },
  MenuGroupLabel: {
    extends: {
      name: "Base UI Menu.GroupLabel",
      href: "https://base-ui.com/react/components/menu#api-reference",
    },
    props: [],
  },
  MenuSeparator: {
    extends: {
      name: "Base UI Menu.Separator",
      href: "https://base-ui.com/react/components/menu#api-reference",
    },
    props: [],
  },
  MenuItemLeadingIcon: {
    props: [
      {
        name: "render",
        type: "React.ReactElement | ((props, state) => React.ReactElement)",
        description:
          "Custom element or render function used instead of the default span container.",
      },
    ],
  },
  MenuItemTrailingIcon: {
    props: [
      {
        name: "render",
        type: "React.ReactElement | ((props, state) => React.ReactElement)",
        description:
          "Custom element or render function used instead of the default span container.",
      },
    ],
  },
  MenuItemLabel: {
    props: [
      {
        name: "render",
        type: "React.ReactElement | ((props, state) => React.ReactElement)",
        description:
          "Custom element or render function used instead of the default span container.",
      },
    ],
  },
  MenuSubmenu: {
    extends: {
      name: "Base UI Menu.SubmenuRoot",
      href: "https://base-ui.com/react/components/menu#api-reference",
    },
    props: [],
  },
  MenuSubmenuTrigger: {
    extends: {
      name: "Base UI Menu.SubmenuTrigger",
      href: "https://base-ui.com/react/components/menu#api-reference",
    },
    props: [],
  },
  MenuRadioGroup: {
    extends: {
      name: "Base UI Menu.RadioGroup",
      href: "https://base-ui.com/react/components/menu#api-reference",
    },
    props: [],
  },
  MenuRadioItem: {
    extends: {
      name: "Base UI Menu.RadioItem",
      href: "https://base-ui.com/react/components/menu#api-reference",
    },
    props: [],
  },
  MenuCheckboxItem: {
    extends: {
      name: "Base UI Menu.CheckboxItem",
      href: "https://base-ui.com/react/components/menu#api-reference",
    },
    props: [],
  },
  MenuRadioItemIndicator: {
    extends: {
      name: "Base UI Menu.RadioItemIndicator",
      href: "https://base-ui.com/react/components/menu#api-reference",
    },
    props: [],
  },
  MenuCheckboxItemIndicator: {
    extends: {
      name: "Base UI Menu.CheckboxItemIndicator",
      href: "https://base-ui.com/react/components/menu#api-reference",
    },
    props: [],
  },
  Select: {
    extends: {
      name: "Base UI Select.Root",
      href: "https://base-ui.com/react/components/select#api-reference",
    },
    props: [],
  },
  SelectTrigger: {
    extends: {
      name: "Base UI Select.Trigger",
      href: "https://base-ui.com/react/components/select#api-reference",
    },
    props: [
      {
        name: "variant",
        type: '"default" | "secondary" | "outline" | "ghost" | "destructive" | "revert"',
        defaultValue: '"outline"',
        description: "Visual style of the trigger button.",
      },
      {
        name: "size",
        type: '"default" | "sm" | "lg" | "icon" | "icon-sm"',
        defaultValue: '"default"',
        description: "Size of the trigger button.",
      },
    ],
  },
  SelectContent: {
    extends: {
      name: "Base UI Select.Popup",
      href: "https://base-ui.com/react/components/select#api-reference",
    },
    props: [
      {
        name: "positionerProps",
        type: "BaseSelect.Positioner.Props",
        description:
          "Props forwarded to the underlying Positioner component. Includes align, side, sideOffset, alignOffset, collisionPadding, etc.",
      },
      {
        name: "listProps",
        type: "BaseSelect.List.Props",
        description: "Props forwarded to the underlying List component.",
      },
    ],
  },
  SelectItem: {
    extends: {
      name: "Base UI Select.Item",
      href: "https://base-ui.com/react/components/select#api-reference",
    },
    props: [],
  },
  SelectValue: {
    extends: {
      name: "Base UI Select.Value",
      href: "https://base-ui.com/react/components/select#api-reference",
    },
    props: [],
  },
  SelectSeparator: {
    extends: {
      name: "Base UI Select.Separator",
      href: "https://base-ui.com/react/components/select#api-reference",
    },
    props: [],
  },
  Slider: {
    extends: {
      name: "Base UI Slider.Root",
      href: "https://base-ui.com/react/components/slider#api-reference",
    },
    props: [],
  },
  Switch: {
    extends: {
      name: "Base UI Switch.Root",
      href: "https://base-ui.com/react/components/switch#api-reference",
    },
    props: [],
  },
  Tag: {
    props: [
      {
        name: "variant",
        type: '"default" | "outline" | "secondary"',
        defaultValue: '"default"',
        description: "Visual style of the tag.",
      },
      {
        name: "size",
        type: '"default" | "sm" | "lg"',
        defaultValue: '"default"',
        description: "Size of the tag.",
      },
    ],
  },
  Input: {
    extends: {
      name: "Base UI Input",
      href: "https://base-ui.com/react/components/input",
    },
    props: [
      {
        name: "variant",
        type: '"default" | "outline"',
        defaultValue: '"default"',
        description: "Visual style of the input.",
      },
      {
        name: "block",
        type: "boolean",
        defaultValue: "true",
        description: "When true, the input stretches to fill its container.",
      },
    ],
  },
  Dialog: {
    extends: {
      name: "Base UI Dialog.Root",
      href: "https://base-ui.com/react/components/dialog#api-reference",
    },
    props: [],
  },
  DialogTrigger: {
    extends: {
      name: "Base UI Dialog.Trigger",
      href: "https://base-ui.com/react/components/dialog#api-reference",
    },
    props: [],
  },
  DialogContent: {
    extends: {
      name: "Base UI Dialog.Popup",
      href: "https://base-ui.com/react/components/dialog#api-reference",
    },
    props: [
      {
        name: "dialogPortalProps",
        type: "BaseDialog.Portal.Props",
        description: "Props forwarded to the underlying Portal component.",
      },
      {
        name: "dialogBackdropProps",
        type: "BaseDialog.Backdrop.Props",
        description: "Props forwarded to the underlying Backdrop component.",
      },
    ],
  },
  DialogHeader: {
    props: [
      {
        name: "closeButton",
        type: "boolean",
        defaultValue: "true",
        description: "Whether to show the default close button in the header.",
      },
      {
        name: "className",
        type: "string",
        description: "Additional CSS classes to apply to the header container.",
      },
    ],
  },
  DialogBody: {
    props: [
      {
        name: "className",
        type: "string",
        description: "Additional CSS classes to apply to the body container.",
      },
    ],
  },
  DialogFooter: {
    props: [
      {
        name: "direction",
        type: '"row" | "column"',
        defaultValue: '"column"',
        description: "Layout direction for the footer actions.",
      },
      {
        name: "className",
        type: "string",
        description: "Additional CSS classes to apply to the footer container.",
      },
    ],
  },
  DialogTitle: {
    extends: {
      name: "Base UI Dialog.Title",
      href: "https://base-ui.com/react/components/dialog#api-reference",
    },
    props: [],
  },
  DialogDescription: {
    extends: {
      name: "Base UI Dialog.Description",
      href: "https://base-ui.com/react/components/dialog#api-reference",
    },
    props: [
      {
        name: "className",
        type: "string",
        description: "Additional CSS classes to apply to the description element.",
      },
    ],
  },
  DialogBackdrop: {
    extends: {
      name: "Base UI Dialog.Backdrop",
      href: "https://base-ui.com/react/components/dialog#api-reference",
    },
    props: [
      {
        name: "className",
        type: "string",
        description: "Additional CSS classes to apply to the backdrop element.",
      },
    ],
  },
  DialogClose: {
    extends: {
      name: "Base UI Dialog.Close",
      href: "https://base-ui.com/react/components/dialog#api-reference",
    },
    props: [],
  },
  DialogPortal: {
    extends: {
      name: "Base UI Dialog.Portal",
      href: "https://base-ui.com/react/components/dialog#api-reference",
    },
    props: [],
  },
  Card: {
    props: [
      {
        name: "className",
        type: "string",
        description: "Additional CSS classes to apply to the card container.",
      },
    ],
  },
  CardHeader: {
    props: [
      {
        name: "className",
        type: "string",
        description: "Additional CSS classes to apply to the header container.",
      },
    ],
  },
  CardTitle: {
    props: [
      {
        name: "className",
        type: "string",
        description: "Additional CSS classes to apply to the title element.",
      },
    ],
  },
  CardDescription: {
    props: [
      {
        name: "className",
        type: "string",
        description: "Additional CSS classes to apply to the description element.",
      },
    ],
  },
  CardAction: {
    props: [
      {
        name: "className",
        type: "string",
        description: "Additional CSS classes to apply to the action container.",
      },
    ],
  },
  CardPanel: {
    props: [
      {
        name: "className",
        type: "string",
        description: "Additional CSS classes to apply to the panel container.",
      },
    ],
  },
  CardFooter: {
    props: [
      {
        name: "direction",
        type: '"row" | "column"',
        defaultValue: '"row"',
        description: "Layout direction for the footer content.",
      },
      {
        name: "className",
        type: "string",
        description: "Additional CSS classes to apply to the footer container.",
      },
    ],
  },
  AlertDialog: {
    extends: {
      name: "Base UI AlertDialog.Root",
      href: "https://base-ui.com/react/components/alert-dialog#api-reference",
    },
    props: [],
  },
  AlertDialogTrigger: {
    extends: {
      name: "Base UI AlertDialog.Trigger",
      href: "https://base-ui.com/react/components/alert-dialog#api-reference",
    },
    props: [],
  },
  AlertDialogContent: {
    extends: {
      name: "Base UI AlertDialog.Popup",
      href: "https://base-ui.com/react/components/alert-dialog#api-reference",
    },
    props: [],
  },
  AlertDialogHeader: {
    props: [
      {
        name: "className",
        type: "string",
        description: "Additional CSS classes to apply to the header container.",
      },
    ],
  },
  AlertDialogFooter: {
    props: [
      {
        name: "className",
        type: "string",
        description: "Additional CSS classes to apply to the footer container.",
      },
    ],
  },
  AlertDialogTitle: {
    extends: {
      name: "Base UI AlertDialog.Title",
      href: "https://base-ui.com/react/components/alert-dialog#api-reference",
    },
    props: [],
  },
  AlertDialogDescription: {
    extends: {
      name: "Base UI AlertDialog.Description",
      href: "https://base-ui.com/react/components/alert-dialog#api-reference",
    },
    props: [],
  },
  AlertDialogBackdrop: {
    extends: {
      name: "Base UI AlertDialog.Backdrop",
      href: "https://base-ui.com/react/components/alert-dialog#api-reference",
    },
    props: [
      {
        name: "className",
        type: "string",
        description: "Additional CSS classes to apply to the backdrop element.",
      },
    ],
  },
  AlertDialogClose: {
    extends: {
      name: "Base UI AlertDialog.Close",
      href: "https://base-ui.com/react/components/alert-dialog#api-reference",
    },
    props: [],
  },
  AlertDialogCloseButton: {
    extends: {
      name: "Base UI AlertDialog.Close",
      href: "https://base-ui.com/react/components/alert-dialog#api-reference",
    },
    props: [],
  },
  AlertDialogPortal: {
    extends: {
      name: "Base UI AlertDialog.Portal",
      href: "https://base-ui.com/react/components/alert-dialog#api-reference",
    },
    props: [],
  },
  RadioGroup: {
    extends: {
      name: "Base UI RadioGroup",
      href: "https://base-ui.com/react/components/radio#api-reference",
    },
    props: [],
  },
  Checkbox: {
    extends: {
      name: "Base UI Checkbox.Root",
      href: "https://base-ui.com/react/components/checkbox#api-reference",
    },
    props: [],
  },
  CheckboxGroup: {
    extends: {
      name: "Base UI CheckboxGroup",
      href: "https://base-ui.com/react/components/checkbox-group#api-reference",
    },
    props: [],
  },
  Radio: {
    extends: {
      name: "Base UI Radio",
      href: "https://base-ui.com/react/components/radio#api-reference",
    },
    props: [],
  },
  Tabs: {
    extends: {
      name: "Base UI Tabs.Root",
      href: "https://base-ui.com/react/components/tabs#api-reference",
    },
    props: [],
  },
  TabsList: {
    extends: {
      name: "Base UI Tabs.List",
      href: "https://base-ui.com/react/components/tabs#api-reference",
    },
    props: [
      {
        name: "variant",
        type: '"default" | "underline"',
        defaultValue: '"default"',
        description: "Visual style of the tabs list.",
      },
      {
        name: "size",
        type: '"default" | "sm" | "lg"',
        defaultValue: '"default"',
        description: "Size of the tabs and indicator.",
      },
    ],
  },
  TabsTab: {
    extends: {
      name: "Base UI Tabs.Tab",
      href: "https://base-ui.com/react/components/tabs#api-reference",
    },
    props: [
      {
        name: "size",
        type: '"default" | "sm" | "lg"',
        description: "Override the tab size. Inherits from TabsList by default.",
      },
    ],
  },
  TabsPanel: {
    extends: {
      name: "Base UI Tabs.Panel",
      href: "https://base-ui.com/react/components/tabs#api-reference",
    },
    props: [],
  },
  Popover: {
    extends: {
      name: "Base UI Popover.Root",
      href: "https://base-ui.com/react/components/popover#api-reference",
    },
    props: [],
  },
  PopoverTrigger: {
    extends: {
      name: "Base UI Popover.Trigger",
      href: "https://base-ui.com/react/components/popover#api-reference",
    },
    props: [],
  },
  PopoverContent: {
    extends: {
      name: "Base UI Popover.Popup",
      href: "https://base-ui.com/react/components/popover#api-reference",
    },
    props: [
      {
        name: "positionerProps",
        type: "BasePopover.Positioner.Props",
        description:
          "Props forwarded to the underlying Positioner component. Includes align, side, sideOffset, alignOffset, collisionPadding, etc.",
      },
    ],
  },
  PopoverHeader: {
    props: [
      {
        name: "closeButton",
        type: "boolean",
        defaultValue: "true",
        description: "Whether to show the default close button in the header.",
      },
      {
        name: "className",
        type: "string",
        description: "Additional CSS classes to apply to the header container.",
      },
    ],
  },
  PopoverBody: {
    props: [
      {
        name: "className",
        type: "string",
        description: "Additional CSS classes to apply to the body container.",
      },
    ],
  },
  PopoverTitle: {
    extends: {
      name: "Base UI Popover.Title",
      href: "https://base-ui.com/react/components/popover#api-reference",
    },
    props: [],
  },
  PopoverClose: {
    extends: {
      name: "Base UI Popover.Close",
      href: "https://base-ui.com/react/components/popover#api-reference",
    },
    props: [],
  },
  PopoverPortal: {
    extends: {
      name: "Base UI Popover.Portal",
      href: "https://base-ui.com/react/components/popover#api-reference",
    },
    props: [],
  },
  ScrollArea: {
    extends: {
      name: "Base UI ScrollArea.Root",
      href: "https://base-ui.com/react/components/scroll-area#api-reference",
    },
    props: [
      {
        name: "viewportProps",
        type: "BaseScrollArea.Viewport.Props",
        description: "Props forwarded to the underlying Viewport component.",
      },
    ],
  },
  ScrollBar: {
    extends: {
      name: "Base UI ScrollArea.Scrollbar",
      href: "https://base-ui.com/react/components/scroll-area#api-reference",
    },
    props: [
      {
        name: "orientation",
        type: '"vertical" | "horizontal"',
        defaultValue: '"vertical"',
        description: "Orientation of the scrollbar.",
      },
    ],
  },
  Combobox: {
    extends: {
      name: "Base UI Combobox.Root",
      href: "https://base-ui.com/react/components/combobox#api-reference",
    },
    props: [],
  },
  ComboboxTrigger: {
    extends: {
      name: "Base UI Combobox.Trigger",
      href: "https://base-ui.com/react/components/combobox#api-reference",
    },
    props: [],
  },
  ComboboxContent: {
    extends: {
      name: "Base UI Combobox.Popup",
      href: "https://base-ui.com/react/components/combobox#api-reference",
    },
    props: [
      {
        name: "positionerProps",
        type: "BaseCombobox.Positioner.Props",
        description:
          "Props forwarded to the underlying Positioner component. Includes align, side, sideOffset, alignOffset, collisionPadding, etc.",
      },
    ],
  },
  ComboboxList: {
    extends: {
      name: "Base UI Combobox.List",
      href: "https://base-ui.com/react/components/combobox#api-reference",
    },
    props: [],
  },
  ComboboxItem: {
    extends: {
      name: "Base UI Combobox.Item",
      href: "https://base-ui.com/react/components/combobox#api-reference",
    },
    props: [],
  },
  ComboboxValue: {
    extends: {
      name: "Base UI Combobox.Value",
      href: "https://base-ui.com/react/components/combobox#api-reference",
    },
    props: [],
  },
  ComboboxInput: {
    extends: {
      name: "Base UI Combobox.Input",
      href: "https://base-ui.com/react/components/combobox#api-reference",
    },
    props: [
      {
        name: "showRemove",
        type: "boolean",
        defaultValue: "true",
        description: "Whether to show the clear button. Hidden automatically when children are provided.",
      },
      {
        name: "showTrigger",
        type: "boolean",
        defaultValue: "true",
        description: "Whether to show the dropdown trigger button.",
      },
    ],
  },
  ComboboxEmpty: {
    extends: {
      name: "Base UI Combobox.Empty",
      href: "https://base-ui.com/react/components/combobox#api-reference",
    },
    props: [],
  },
  ComboboxSeparator: {
    extends: {
      name: "Base UI Combobox.Separator",
      href: "https://base-ui.com/react/components/combobox#api-reference",
    },
    props: [],
  },
  ComboboxChips: {
    extends: {
      name: "Base UI Combobox.Chips",
      href: "https://base-ui.com/react/components/combobox#api-reference",
    },
    props: [],
  },
  ComboboxChip: {
    extends: {
      name: "Base UI Combobox.Chip",
      href: "https://base-ui.com/react/components/combobox#api-reference",
    },
    props: [
      {
        name: "showRemove",
        type: "boolean",
        defaultValue: "true",
        description: "Whether to show the remove button on the chip.",
      },
    ],
  },
  ComboboxItemIndicator: {
    extends: {
      name: "Base UI Combobox.ItemIndicator",
      href: "https://base-ui.com/react/components/combobox#api-reference",
    },
    props: [],
  },
  ComboboxGroup: {
    extends: {
      name: "Base UI Combobox.Group",
      href: "https://base-ui.com/react/components/combobox#api-reference",
    },
    props: [],
  },
  ComboboxGroupLabel: {
    extends: {
      name: "Base UI Combobox.GroupLabel",
      href: "https://base-ui.com/react/components/combobox#api-reference",
    },
    props: [],
  },
  ComboboxItemLeadingIcon: {
    props: [
      {
        name: "render",
        type: "React.ReactElement | ((props, state) => React.ReactElement)",
        description:
          "Custom element or render function used instead of the default span container.",
      },
    ],
  },
  ComboboxItemTrailingIcon: {
    props: [
      {
        name: "render",
        type: "React.ReactElement | ((props, state) => React.ReactElement)",
        description:
          "Custom element or render function used instead of the default span container.",
      },
    ],
  },
  ComboboxItemLabel: {
    props: [
      {
        name: "render",
        type: "React.ReactElement | ((props, state) => React.ReactElement)",
        description:
          "Custom element or render function used instead of the default span container.",
      },
    ],
  },
  ToastProvider: {
    extends: {
      name: "Base UI Toast.Provider",
      href: "https://base-ui.com/react/components/toast#api-reference",
    },
    props: [
      {
        name: "position",
        type:
          '"top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right"',
        defaultValue: '"bottom-right"',
        description: "Placement of the toast stack on the screen.",
      },
    ],
  },
  Tooltip: {
    extends: {
      name: "Base UI Tooltip.Root",
      href: "https://base-ui.com/react/components/tooltip#api-reference",
    },
    props: [],
  },
  TooltipTrigger: {
    extends: {
      name: "Base UI Tooltip.Trigger",
      href: "https://base-ui.com/react/components/tooltip#api-reference",
    },
    props: [
      {
        name: "delay",
        type: "number",
        defaultValue: "100",
        description: "Delay in milliseconds before the tooltip opens.",
      },
    ],
  },
  TooltipContent: {
    extends: {
      name: "Base UI Tooltip.Popup",
      href: "https://base-ui.com/react/components/tooltip#api-reference",
    },
    props: [
      {
        name: "positionerProps",
        type: "BaseTooltip.Positioner.Props",
        description:
          "Props forwarded to the underlying Positioner component. Includes align, side, sideOffset, alignOffset, collisionPadding, etc.",
      },
      {
        name: "portalProps",
        type: "BaseTooltip.Portal.Props",
        description: "Props forwarded to the underlying Portal component.",
      },
    ],
  },
  TooltipViewport: {
    extends: {
      name: "Base UI Tooltip.Viewport",
      href: "https://base-ui.com/react/components/tooltip#api-reference",
    },
    props: [],
  },
  TooltipProvider: {
    extends: {
      name: "Base UI Tooltip.Provider",
      href: "https://base-ui.com/react/components/tooltip#api-reference",
    },
    props: [],
  },
  Separator: {
    extends: {
      name: "Base UI Separator",
      href: "https://base-ui.com/react/components/separator",
    },
    props: [
      {
        name: "orientation",
        type: '"horizontal" | "vertical"',
        defaultValue: '"horizontal"',
        description: "The orientation of the separator.",
      },
    ],
  },
};
