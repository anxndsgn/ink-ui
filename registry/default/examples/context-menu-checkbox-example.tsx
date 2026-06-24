import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItemLabel,
  ContextMenuCheckboxItem,
} from "registry/default/ui/context-menu";
import { useState } from "react";

export function ContextMenuCheckboxExample() {
  const [showStatusBar, setShowStatusBar] = useState(true);
  const [showActivityBar, setShowActivityBar] = useState(false);

  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-36 w-72 items-center justify-center rounded-xl border border-dashed text-sm text-muted-foreground">
        Right click here
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuCheckboxItem checked={showStatusBar} onCheckedChange={setShowStatusBar}>
          <ContextMenuItemLabel>Show status bar</ContextMenuItemLabel>
        </ContextMenuCheckboxItem>
        <ContextMenuCheckboxItem checked={showActivityBar} onCheckedChange={setShowActivityBar}>
          <ContextMenuItemLabel>Show activity bar</ContextMenuItemLabel>
        </ContextMenuCheckboxItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
