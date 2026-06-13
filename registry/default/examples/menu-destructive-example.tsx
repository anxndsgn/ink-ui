import {
  Menu,
  MenuTrigger,
  MenuContent,
  MenuItem,
  MenuItemLabel,
  MenuSeparator,
} from "registry/default/ui/menu";
import { Button } from "registry/default/ui/button";
export function MenuDestructiveExample() {
  return (
    <Menu>
      <MenuTrigger render={<Button variant="outline">Menu</Button>} />
      <MenuContent>
        <MenuItem>
          <MenuItemLabel>Edit</MenuItemLabel>
        </MenuItem>
        <MenuItem>
          <MenuItemLabel>Duplicate</MenuItemLabel>
        </MenuItem>
        <MenuSeparator />
        <MenuItem variant="destructive">
          <MenuItemLabel>Delete</MenuItemLabel>
        </MenuItem>
      </MenuContent>
    </Menu>
  );
}
