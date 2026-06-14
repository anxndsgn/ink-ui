import {
  Menu,
  MenuTrigger,
  MenuContent,
  MenuGroup,
  MenuGroupLabel,
  MenuItem,
  MenuLinkItem,
  MenuItemAddon,
  MenuItemLabel,
  MenuSeparator,
  MenuSubmenu,
  MenuSubmenuTrigger,
  MenuRadioGroup,
  MenuRadioItem,
  MenuCheckboxItem,
} from "registry/default/ui/menu";
import { Button } from "registry/default/ui/button";
import { Kbd } from "registry/default/ui/kbd";
import {
  BrowserIcon,
  CaretRightIcon,
  CopyIcon,
  DownloadIcon,
  FilePlusIcon,
  FolderPlusIcon,
  GearIcon,
  GridFourIcon,
  ListIcon,
  PencilIcon,
  SidebarIcon,
  SquaresFourIcon,
  TrashIcon,
  UserIcon,
} from "@phosphor-icons/react";
import { useState } from "react";

export function MenuComplexExample() {
  const [showStatusBar, setShowStatusBar] = useState(true);
  const [showActivityBar, setShowActivityBar] = useState(false);
  const [view, setView] = useState("list");

  return (
    <Menu>
      <MenuTrigger render={<Button variant="outline">Open menu</Button>} />
      <MenuContent className="min-w-56">
        <MenuGroup>
          <MenuGroupLabel>File</MenuGroupLabel>
          <MenuItem>
            <MenuItemAddon>
              <FilePlusIcon />
            </MenuItemAddon>
            <MenuItemLabel>New file</MenuItemLabel>
            <MenuItemAddon>
              <Kbd>⌘N</Kbd>
            </MenuItemAddon>
          </MenuItem>
          <MenuItem>
            <MenuItemAddon>
              <FolderPlusIcon />
            </MenuItemAddon>
            <MenuItemLabel>New folder</MenuItemLabel>
          </MenuItem>
        </MenuGroup>

        <MenuSeparator />

        <MenuGroup>
          <MenuGroupLabel>Edit</MenuGroupLabel>
          <MenuItem>
            <MenuItemAddon>
              <PencilIcon />
            </MenuItemAddon>
            <MenuItemLabel>Rename</MenuItemLabel>
          </MenuItem>
          <MenuItem>
            <MenuItemAddon>
              <CopyIcon />
            </MenuItemAddon>
            <MenuItemLabel>Duplicate</MenuItemLabel>
          </MenuItem>
          <MenuSubmenu>
            <MenuSubmenuTrigger>
              <MenuItemAddon>
                <DownloadIcon />
              </MenuItemAddon>
              <MenuItemLabel>Export</MenuItemLabel>
              <MenuItemAddon>
                <CaretRightIcon />
              </MenuItemAddon>
            </MenuSubmenuTrigger>
            <MenuContent>
              <MenuItem>
                <MenuItemLabel>Export as PDF</MenuItemLabel>
              </MenuItem>
              <MenuItem>
                <MenuItemLabel>Export as Markdown</MenuItemLabel>
              </MenuItem>
              <MenuSeparator />
              <MenuLinkItem href="#">
                <MenuItemLabel>View export history</MenuItemLabel>
              </MenuLinkItem>
            </MenuContent>
          </MenuSubmenu>
        </MenuGroup>

        <MenuSeparator />

        <MenuGroup>
          <MenuGroupLabel>View</MenuGroupLabel>
          <MenuRadioGroup value={view} onValueChange={setView}>
            <MenuRadioItem value="list">
              <MenuItemLabel>List</MenuItemLabel>
            </MenuRadioItem>
            <MenuRadioItem value="grid">
              <MenuItemLabel>Grid</MenuItemLabel>
            </MenuRadioItem>
            <MenuRadioItem value="gallery">
              <MenuItemLabel>Gallery</MenuItemLabel>
            </MenuRadioItem>
          </MenuRadioGroup>
        </MenuGroup>

        <MenuSeparator />

        <MenuGroup>
          <MenuGroupLabel>Options</MenuGroupLabel>
          <MenuCheckboxItem checked={showStatusBar} onCheckedChange={setShowStatusBar}>
            <MenuItemLabel>Show status bar</MenuItemLabel>
          </MenuCheckboxItem>
          <MenuCheckboxItem checked={showActivityBar} onCheckedChange={setShowActivityBar}>
            <MenuItemLabel>Show activity bar</MenuItemLabel>
          </MenuCheckboxItem>
        </MenuGroup>

        <MenuSeparator />

        <MenuItem>
          <MenuItemAddon>
            <UserIcon />
          </MenuItemAddon>
          <MenuItemLabel>Profile</MenuItemLabel>
        </MenuItem>
        <MenuItem>
          <MenuItemAddon>
            <GearIcon />
          </MenuItemAddon>
          <MenuItemLabel>Settings</MenuItemLabel>
          <MenuItemAddon>
            <Kbd>⌘,</Kbd>
          </MenuItemAddon>
        </MenuItem>

        <MenuSeparator />

        <MenuItem variant="destructive">
          <MenuItemAddon>
            <TrashIcon />
          </MenuItemAddon>
          <MenuItemLabel>Delete project</MenuItemLabel>
        </MenuItem>
      </MenuContent>
    </Menu>
  );
}
