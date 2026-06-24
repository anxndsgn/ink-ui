import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItemLabel,
  ContextMenuGroup,
  ContextMenuGroupLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
} from "registry/default/ui/context-menu";
import { useState } from "react";

export function ContextMenuRadioExample() {
  const [view, setView] = useState("list");

  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-36 w-72 items-center justify-center rounded-xl border border-dashed text-sm text-muted-foreground">
        Right click here
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuGroup>
          <ContextMenuGroupLabel>View</ContextMenuGroupLabel>
          <ContextMenuRadioGroup value={view} onValueChange={setView}>
            <ContextMenuRadioItem value="list">
              <ContextMenuItemLabel>List</ContextMenuItemLabel>
            </ContextMenuRadioItem>
            <ContextMenuRadioItem value="grid">
              <ContextMenuItemLabel>Grid</ContextMenuItemLabel>
            </ContextMenuRadioItem>
            <ContextMenuRadioItem value="calendar">
              <ContextMenuItemLabel>Calendar</ContextMenuItemLabel>
            </ContextMenuRadioItem>
          </ContextMenuRadioGroup>
        </ContextMenuGroup>
      </ContextMenuContent>
    </ContextMenu>
  );
}
