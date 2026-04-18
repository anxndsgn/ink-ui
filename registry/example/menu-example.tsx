import {
  Menu,
  MenuTrigger,
  MenuContent,
  MenuItem,
  MenuItemLabel,
  MenuItemLeadingIcon,
  MenuItemTrailingIcon,
  MenuGroup,
  MenuGroupLabel,
  MenuSeparator,
  MenuCheckboxItem,
  MenuRadioGroup,
  MenuRadioItem,
  MenuSubmenu,
  MenuSubmenuTrigger,
} from "@registry/components/ui/menu";
import { Button } from "@registry/components/ui/button";
import {
  GearIcon,
  UserIcon,
  SignOutIcon,
  BellIcon,
  ShieldIcon,
  FileTextIcon,
  CaretRightIcon,
  UsersIcon,
} from "@phosphor-icons/react";
import { useState } from "react";

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
