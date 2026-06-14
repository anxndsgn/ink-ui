import {
  Menu,
  MenuTrigger,
  MenuContent,
  MenuItem,
  MenuItemAddon,
  MenuItemLabel,
  MenuSeparator,
} from "registry/default/ui/menu";
import { Button } from "registry/default/ui/button";
import { GearIcon, UserIcon, SignOutIcon } from "@phosphor-icons/react";
export function MenuWithIconsExample() {
  return (
    <Menu>
      <MenuTrigger render={<Button variant="outline">Menu</Button>} />
      <MenuContent>
        <MenuItem>
          <MenuItemAddon>
            <UserIcon />
          </MenuItemAddon>
          <MenuItemLabel>Profile</MenuItemLabel>
          <MenuItemAddon>Personal</MenuItemAddon>
        </MenuItem>
        <MenuItem>
          <MenuItemAddon>
            <GearIcon />
          </MenuItemAddon>
          <MenuItemLabel>Settings</MenuItemLabel>
        </MenuItem>
        <MenuSeparator />
        <MenuItem>
          <MenuItemAddon>
            <SignOutIcon />
          </MenuItemAddon>
          <MenuItemLabel>Log out</MenuItemLabel>
        </MenuItem>
      </MenuContent>
    </Menu>
  );
}
