import {
  Menu,
  MenuTrigger,
  MenuContent,
  MenuItemLabel,
  MenuGroup,
  MenuGroupLabel,
  MenuRadioGroup,
  MenuRadioItem,
} from "registry/default/ui/menu";
import { Button } from "registry/default/ui/button";
import { useState } from "react";
export function MenuRadioExample() {
  const [view, setView] = useState("list");

  return (
    <Menu>
      <MenuTrigger render={<Button variant="outline">Menu</Button>} />
      <MenuContent>
        <MenuGroup>
          <MenuGroupLabel>View</MenuGroupLabel>
          <MenuRadioGroup value={view} onValueChange={setView}>
            <MenuRadioItem value="list">
              <MenuItemLabel>List</MenuItemLabel>
            </MenuRadioItem>
            <MenuRadioItem value="grid">
              <MenuItemLabel>Grid</MenuItemLabel>
            </MenuRadioItem>
            <MenuRadioItem value="calendar">
              <MenuItemLabel>Calendar</MenuItemLabel>
            </MenuRadioItem>
          </MenuRadioGroup>
        </MenuGroup>
      </MenuContent>
    </Menu>
  );
}
