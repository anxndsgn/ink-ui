import {
  Menu,
  MenuTrigger,
  MenuContent,
  MenuItem,
  MenuItemLabel,
  MenuItemLeadingIcon,
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
            <MenuItemLeadingIcon>
              <UserIcon />
            </MenuItemLeadingIcon>
            <MenuItemLabel>Profile</MenuItemLabel>
          </MenuItem>
          <MenuItem>
            <MenuItemLeadingIcon>
              <BellIcon />
            </MenuItemLeadingIcon>
            <MenuItemLabel>Notifications</MenuItemLabel>
          </MenuItem>
        </MenuGroup>
        <MenuSeparator />
        <MenuGroup>
          <MenuGroupLabel>Preferences</MenuGroupLabel>
          <MenuItem>
            <MenuItemLeadingIcon>
              <ShieldIcon />
            </MenuItemLeadingIcon>
            <MenuItemLabel>Privacy</MenuItemLabel>
          </MenuItem>
          <MenuItem>
            <MenuItemLeadingIcon>
              <FileTextIcon />
            </MenuItemLeadingIcon>
            <MenuItemLabel>Terms</MenuItemLabel>
          </MenuItem>
        </MenuGroup>
      </MenuContent>
    </Menu>
  );
}
