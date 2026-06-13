import { Tag } from "registry/default/ui/tag";
import { Menu, MenuContent, MenuItem, MenuItemLabel, MenuTrigger } from "registry/default/ui/menu";
import { Button } from "registry/default/ui/button";
export function TagInMenuExample() {
  return (
    <Menu>
      <MenuTrigger render={<Button variant="outline">Menu</Button>} />
      <MenuContent>
        <MenuItem>
          <MenuItemLabel>Profile</MenuItemLabel>
          <Tag size="sm" variant="secondary">
            New
          </Tag>
        </MenuItem>
        <MenuItem>
          <MenuItemLabel>Settings</MenuItemLabel>
          <Tag size="sm" variant="outline">
            Beta
          </Tag>
        </MenuItem>
        <MenuItem>
          <MenuItemLabel>Billing</MenuItemLabel>
        </MenuItem>
      </MenuContent>
    </Menu>
  );
}
