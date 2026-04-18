import { Tag } from "@registry/components/ui/tag";
import {
  Menu,
  MenuContent,
  MenuItem,
  MenuItemLabel,
  MenuTrigger,
} from "@registry/components/ui/menu";
import { Button } from "@registry/components/ui/button";

export function TagExample() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Tag>Tag</Tag>
    </div>
  );
}

export function SecondaryTagExample() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Tag variant="secondary">Secondary</Tag>
    </div>
  );
}

export function OutlineTagExample() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Tag variant="outline">Outline</Tag>
    </div>
  );
}

export function TagSizesExample() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Tag size="sm">Small</Tag>
      <Tag size="default">Default</Tag>
      <Tag size="lg">Large</Tag>
    </div>
  );
}

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
