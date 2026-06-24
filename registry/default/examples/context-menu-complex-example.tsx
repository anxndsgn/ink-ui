import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuGroupLabel,
  ContextMenuItem,
  ContextMenuLinkItem,
  ContextMenuItemAddon,
  ContextMenuItemLabel,
  ContextMenuSeparator,
  ContextMenuSubmenu,
  ContextMenuSubmenuTrigger,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuCheckboxItem,
} from "registry/default/ui/context-menu";
import { Kbd } from "registry/default/ui/kbd";
import {
  ArrowClockwiseIcon,
  ArrowLeftIcon,
  CaretRightIcon,
  CopyIcon,
  DownloadIcon,
  GearIcon,
  PencilIcon,
  ShareIcon,
  TrashIcon,
} from "@phosphor-icons/react";
import { useState } from "react";

export function ContextMenuComplexExample() {
  const [showBookmarks, setShowBookmarks] = useState(true);
  const [showFullUrls, setShowFullUrls] = useState(false);
  const [view, setView] = useState("list");

  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-40 w-80 items-center justify-center rounded-xl border border-dashed text-sm text-muted-foreground">
        Right click here
      </ContextMenuTrigger>
      <ContextMenuContent className="min-w-56">
        <ContextMenuGroup>
          <ContextMenuGroupLabel>Navigation</ContextMenuGroupLabel>
          <ContextMenuItem>
            <ContextMenuItemAddon>
              <ArrowLeftIcon />
            </ContextMenuItemAddon>
            <ContextMenuItemLabel>Back</ContextMenuItemLabel>
            <ContextMenuItemAddon>
              <Kbd>⌘[</Kbd>
            </ContextMenuItemAddon>
          </ContextMenuItem>
          <ContextMenuItem>
            <ContextMenuItemAddon>
              <ArrowClockwiseIcon />
            </ContextMenuItemAddon>
            <ContextMenuItemLabel>Reload</ContextMenuItemLabel>
            <ContextMenuItemAddon>
              <Kbd>⌘R</Kbd>
            </ContextMenuItemAddon>
          </ContextMenuItem>
        </ContextMenuGroup>

        <ContextMenuSeparator />

        <ContextMenuGroup>
          <ContextMenuGroupLabel>Edit</ContextMenuGroupLabel>
          <ContextMenuItem>
            <ContextMenuItemAddon>
              <PencilIcon />
            </ContextMenuItemAddon>
            <ContextMenuItemLabel>Rename</ContextMenuItemLabel>
          </ContextMenuItem>
          <ContextMenuItem>
            <ContextMenuItemAddon>
              <CopyIcon />
            </ContextMenuItemAddon>
            <ContextMenuItemLabel>Duplicate</ContextMenuItemLabel>
          </ContextMenuItem>
          <ContextMenuSubmenu>
            <ContextMenuSubmenuTrigger>
              <ContextMenuItemAddon>
                <ShareIcon />
              </ContextMenuItemAddon>
              <ContextMenuItemLabel>Share</ContextMenuItemLabel>
              <ContextMenuItemAddon>
                <CaretRightIcon />
              </ContextMenuItemAddon>
            </ContextMenuSubmenuTrigger>
            <ContextMenuContent>
              <ContextMenuItem>
                <ContextMenuItemLabel>Copy link</ContextMenuItemLabel>
              </ContextMenuItem>
              <ContextMenuItem>
                <ContextMenuItemAddon>
                  <DownloadIcon />
                </ContextMenuItemAddon>
                <ContextMenuItemLabel>Download</ContextMenuItemLabel>
              </ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuLinkItem href="#">
                <ContextMenuItemLabel>More options</ContextMenuItemLabel>
              </ContextMenuLinkItem>
            </ContextMenuContent>
          </ContextMenuSubmenu>
        </ContextMenuGroup>

        <ContextMenuSeparator />

        <ContextMenuGroup>
          <ContextMenuGroupLabel>View</ContextMenuGroupLabel>
          <ContextMenuRadioGroup value={view} onValueChange={setView}>
            <ContextMenuRadioItem value="list">
              <ContextMenuItemLabel>List</ContextMenuItemLabel>
            </ContextMenuRadioItem>
            <ContextMenuRadioItem value="grid">
              <ContextMenuItemLabel>Grid</ContextMenuItemLabel>
            </ContextMenuRadioItem>
          </ContextMenuRadioGroup>
        </ContextMenuGroup>

        <ContextMenuSeparator />

        <ContextMenuGroup>
          <ContextMenuGroupLabel>Options</ContextMenuGroupLabel>
          <ContextMenuCheckboxItem checked={showBookmarks} onCheckedChange={setShowBookmarks}>
            <ContextMenuItemLabel>Show bookmarks</ContextMenuItemLabel>
          </ContextMenuCheckboxItem>
          <ContextMenuCheckboxItem checked={showFullUrls} onCheckedChange={setShowFullUrls}>
            <ContextMenuItemLabel>Show full URLs</ContextMenuItemLabel>
          </ContextMenuCheckboxItem>
        </ContextMenuGroup>

        <ContextMenuSeparator />

        <ContextMenuItem>
          <ContextMenuItemAddon>
            <GearIcon />
          </ContextMenuItemAddon>
          <ContextMenuItemLabel>Settings</ContextMenuItemLabel>
          <ContextMenuItemAddon>
            <Kbd>⌘,</Kbd>
          </ContextMenuItemAddon>
        </ContextMenuItem>

        <ContextMenuSeparator />

        <ContextMenuItem variant="destructive">
          <ContextMenuItemAddon>
            <TrashIcon />
          </ContextMenuItemAddon>
          <ContextMenuItemLabel>Delete</ContextMenuItemLabel>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
