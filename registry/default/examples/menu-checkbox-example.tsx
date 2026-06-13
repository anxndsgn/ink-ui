import {
  Menu,
  MenuTrigger,
  MenuContent,
  MenuItemLabel,
  MenuCheckboxItem,
} from "registry/default/ui/menu";
import { Button } from "registry/default/ui/button";
import { useState } from "react";
export function MenuCheckboxExample() {
  const [showStatusBar, setShowStatusBar] = useState(true);
  const [showActivityBar, setShowActivityBar] = useState(false);

  return (
    <Menu>
      <MenuTrigger render={<Button variant="outline">Menu</Button>} />
      <MenuContent>
        <MenuCheckboxItem checked={showStatusBar} onCheckedChange={setShowStatusBar}>
          <MenuItemLabel>Show status bar</MenuItemLabel>
        </MenuCheckboxItem>
        <MenuCheckboxItem checked={showActivityBar} onCheckedChange={setShowActivityBar}>
          <MenuItemLabel>Show activity bar</MenuItemLabel>
        </MenuCheckboxItem>
      </MenuContent>
    </Menu>
  );
}
