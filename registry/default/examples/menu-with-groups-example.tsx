import {
  Menu,
  MenuTrigger,
  MenuContent,
  MenuItem,
  MenuItemAddon,
  MenuItemLabel,
  MenuGroup,
  MenuGroupLabel,
  MenuSeparator,
} from "registry/default/ui/menu";
import { Button } from "registry/default/ui/button";
import { UserIcon, BellIcon, ShieldIcon, FileTextIcon } from "@phosphor-icons/react";
export function MenuWithGroupsExample() {
  return (
    <Menu>
      <MenuTrigger render={<Button variant="outline">Menu</Button>} />
      <MenuContent>
        <MenuGroup>
          <MenuGroupLabel>Account</MenuGroupLabel>
          <MenuItem>
            <MenuItemAddon>
              <UserIcon />
            </MenuItemAddon>
            <MenuItemLabel>Profile</MenuItemLabel>
          </MenuItem>
          <MenuItem>
            <MenuItemAddon>
              <BellIcon />
            </MenuItemAddon>
            <MenuItemLabel>Notifications</MenuItemLabel>
          </MenuItem>
        </MenuGroup>
        <MenuSeparator />
        <MenuGroup>
          <MenuGroupLabel>Preferences</MenuGroupLabel>
          <MenuItem>
            <MenuItemAddon>
              <ShieldIcon />
            </MenuItemAddon>
            <MenuItemLabel>Privacy</MenuItemLabel>
          </MenuItem>
          <MenuItem>
            <MenuItemAddon>
              <FileTextIcon />
            </MenuItemAddon>
            <MenuItemLabel>Terms</MenuItemLabel>
          </MenuItem>
        </MenuGroup>
      </MenuContent>
    </Menu>
  );
}
