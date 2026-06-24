import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuItemAddon,
  ContextMenuItemLabel,
  ContextMenuSeparator,
  ContextMenuSubmenu,
  ContextMenuSubmenuTrigger,
} from "registry/default/ui/context-menu";
import { CaretRightIcon } from "@phosphor-icons/react";

export function ContextMenuSubmenuExample() {
  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-36 w-72 items-center justify-center rounded-xl border border-dashed text-sm text-muted-foreground">
        Right click here
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>
          <ContextMenuItemLabel>Back</ContextMenuItemLabel>
        </ContextMenuItem>
        <ContextMenuItem>
          <ContextMenuItemLabel>Reload</ContextMenuItemLabel>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuSubmenu>
          <ContextMenuSubmenuTrigger>
            <ContextMenuItemLabel>Share</ContextMenuItemLabel>
            <ContextMenuItemAddon>
              <CaretRightIcon />
            </ContextMenuItemAddon>
          </ContextMenuSubmenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem>
              <ContextMenuItemLabel>Copy link</ContextMenuItemLabel>
            </ContextMenuItem>
            <ContextMenuItem>
              <ContextMenuItemLabel>Email</ContextMenuItemLabel>
            </ContextMenuItem>
            <ContextMenuItem>
              <ContextMenuItemLabel>Messages</ContextMenuItemLabel>
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenuSubmenu>
      </ContextMenuContent>
    </ContextMenu>
  );
}
