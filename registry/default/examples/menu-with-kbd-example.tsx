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
import { Kbd } from "registry/default/ui/kbd";

export function MenuWithKbdExample() {
  return (
    <Menu>
      <MenuTrigger render={<Button variant="outline">Menu</Button>} />
      <MenuContent>
        <MenuItem>
          <MenuItemLabel>New tab</MenuItemLabel>
          <MenuItemAddon>
            <Kbd>⌘T</Kbd>
          </MenuItemAddon>
        </MenuItem>
        <MenuItem>
          <MenuItemLabel>New window</MenuItemLabel>
          <MenuItemAddon>
            <Kbd>⌘N</Kbd>
          </MenuItemAddon>
        </MenuItem>
        <MenuItem>
          <MenuItemLabel>Downloads</MenuItemLabel>
          <MenuItemAddon>
            <Kbd>⌘J</Kbd>
          </MenuItemAddon>
        </MenuItem>
        <MenuSeparator />
        <MenuItem>
          <MenuItemLabel>Settings</MenuItemLabel>
          <MenuItemAddon>
            <Kbd>⌘,</Kbd>
          </MenuItemAddon>
        </MenuItem>
      </MenuContent>
    </Menu>
  );
}
