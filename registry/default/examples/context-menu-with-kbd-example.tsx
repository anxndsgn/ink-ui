import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuItemAddon,
  ContextMenuItemLabel,
  ContextMenuSeparator,
} from "registry/default/ui/context-menu";
import { Kbd } from "registry/default/ui/kbd";

export function ContextMenuWithKbdExample() {
  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-36 w-72 items-center justify-center rounded-xl border border-dashed text-sm text-muted-foreground">
        Right click here
      </ContextMenuTrigger>
      <ContextMenuContent className="min-w-52">
        <ContextMenuItem>
          <ContextMenuItemLabel>Cut</ContextMenuItemLabel>
          <ContextMenuItemAddon>
            <Kbd>⌘X</Kbd>
          </ContextMenuItemAddon>
        </ContextMenuItem>
        <ContextMenuItem>
          <ContextMenuItemLabel>Copy</ContextMenuItemLabel>
          <ContextMenuItemAddon>
            <Kbd>⌘C</Kbd>
          </ContextMenuItemAddon>
        </ContextMenuItem>
        <ContextMenuItem>
          <ContextMenuItemLabel>Paste</ContextMenuItemLabel>
          <ContextMenuItemAddon>
            <Kbd>⌘V</Kbd>
          </ContextMenuItemAddon>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem>
          <ContextMenuItemLabel>Select all</ContextMenuItemLabel>
          <ContextMenuItemAddon>
            <Kbd>⌘A</Kbd>
          </ContextMenuItemAddon>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
