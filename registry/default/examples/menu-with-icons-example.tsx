import {
  Menu,
  MenuTrigger,
  MenuContent,
  MenuItem,
  MenuItemLabel,
  MenuItemLeadingIcon,
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
          <MenuItemLeadingIcon>
            <UserIcon />
          </MenuItemLeadingIcon>
          <MenuItemLabel>Profile</MenuItemLabel>
        </MenuItem>
        <MenuItem>
          <MenuItemLeadingIcon>
            <GearIcon />
          </MenuItemLeadingIcon>
          <MenuItemLabel>Settings</MenuItemLabel>
        </MenuItem>
        <MenuSeparator />
        <MenuItem>
          <MenuItemLeadingIcon>
            <SignOutIcon />
          </MenuItemLeadingIcon>
          <MenuItemLabel>Log out</MenuItemLabel>
        </MenuItem>
      </MenuContent>
    </Menu>
  );
}
