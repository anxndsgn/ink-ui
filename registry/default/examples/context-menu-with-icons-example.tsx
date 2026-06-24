import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuItemAddon,
  ContextMenuItemLabel,
  ContextMenuSeparator,
} from "registry/default/ui/context-menu";
import { CopyIcon, PencilIcon, ShareIcon, TrashIcon } from "@phosphor-icons/react";

export function ContextMenuWithIconsExample() {
  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-36 w-72 items-center justify-center rounded-xl border border-dashed text-sm text-muted-foreground">
        Right click here
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>
          <ContextMenuItemAddon>
            <PencilIcon />
          </ContextMenuItemAddon>
          <ContextMenuItemLabel>Edit</ContextMenuItemLabel>
        </ContextMenuItem>
        <ContextMenuItem>
          <ContextMenuItemAddon>
            <CopyIcon />
          </ContextMenuItemAddon>
          <ContextMenuItemLabel>Duplicate</ContextMenuItemLabel>
        </ContextMenuItem>
        <ContextMenuItem>
          <ContextMenuItemAddon>
            <ShareIcon />
          </ContextMenuItemAddon>
          <ContextMenuItemLabel>Share</ContextMenuItemLabel>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem variant="destructive">
          <ContextMenuItemAddon>
            <TrashIcon />
          </ContextMenuItemAddon>
          <ContextMenuItemLabel>Delete</ContextMenuItemLabel>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
