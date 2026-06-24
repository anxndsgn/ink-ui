import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuItemLabel,
  ContextMenuSeparator,
} from "registry/default/ui/context-menu";

export function ContextMenuExample() {
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
        <ContextMenuItem>
          <ContextMenuItemLabel>Save as…</ContextMenuItemLabel>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
