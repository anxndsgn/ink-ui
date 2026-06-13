import {
  Menu,
  MenuTrigger,
  MenuContent,
  MenuItem,
  MenuItemLabel,
  MenuItemLeadingIcon,
  MenuItemTrailingIcon,
  MenuSeparator,
  MenuSubmenu,
  MenuSubmenuTrigger,
} from "registry/default/ui/menu";
import { Button } from "registry/default/ui/button";
import { CaretRightIcon, UsersIcon } from "@phosphor-icons/react";
export function MenuSubmenuExample() {
  return (
    <Menu>
      <MenuTrigger render={<Button variant="outline">Menu</Button>} />
      <MenuContent>
        <MenuItem>
          <MenuItemLabel>New file</MenuItemLabel>
        </MenuItem>
        <MenuSubmenu>
          <MenuSubmenuTrigger>
            <MenuItemLeadingIcon>
              <UsersIcon />
            </MenuItemLeadingIcon>
            <MenuItemLabel>Share with</MenuItemLabel>
            <MenuItemTrailingIcon>
              <CaretRightIcon />
            </MenuItemTrailingIcon>
          </MenuSubmenuTrigger>
          <MenuContent>
            <MenuItem>
              <MenuItemLabel>Team</MenuItemLabel>
            </MenuItem>
            <MenuItem>
              <MenuItemLabel>Organization</MenuItemLabel>
            </MenuItem>
            <MenuSeparator />
            <MenuItem>
              <MenuItemLabel>Get link</MenuItemLabel>
            </MenuItem>
          </MenuContent>
        </MenuSubmenu>
        <MenuSeparator />
        <MenuItem>
          <MenuItemLabel>Settings</MenuItemLabel>
        </MenuItem>
      </MenuContent>
    </Menu>
  );
}
