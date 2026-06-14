import {
  Menu,
  MenuTrigger,
  MenuContent,
  MenuItem,
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
          <Kbd className="col-start-4">⌘T</Kbd>
        </MenuItem>
        <MenuItem>
          <MenuItemLabel>New window</MenuItemLabel>
          <Kbd className="col-start-4">⌘N</Kbd>
        </MenuItem>
        <MenuItem>
          <MenuItemLabel>Downloads</MenuItemLabel>
          <Kbd className="col-start-4">⌘J</Kbd>
        </MenuItem>
        <MenuSeparator />
        <MenuItem>
          <MenuItemLabel>Settings</MenuItemLabel>
          <Kbd className="col-start-4">⌘,</Kbd>
        </MenuItem>
      </MenuContent>
    </Menu>
  );
}
