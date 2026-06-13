import {
  Menu,
  MenuTrigger,
  MenuContent,
  MenuItem,
  MenuItemLabel,
  MenuSeparator,
} from "registry/default/ui/menu";
import { Button } from "registry/default/ui/button";
export function MenuExample() {
  return (
    <Menu>
      <MenuTrigger render={<Button variant="outline">Menu</Button>} />
      <MenuContent>
        <MenuItem>
          <MenuItemLabel>Profile</MenuItemLabel>
        </MenuItem>
        <MenuItem>
          <MenuItemLabel>Settings</MenuItemLabel>
        </MenuItem>
        <MenuSeparator />
        <MenuItem>
          <MenuItemLabel>Log out</MenuItemLabel>
        </MenuItem>
      </MenuContent>
    </Menu>
  );
}
