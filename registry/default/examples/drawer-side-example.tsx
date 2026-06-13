import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "registry/default/ui/drawer";
import { Button } from "registry/default/ui/button";
export function DrawerSideExample() {
  return (
    <Drawer position="right">
      <DrawerTrigger render={<Button variant="outline">Open Side Drawer</Button>} />
      <DrawerContent showCloseButton>
        <DrawerHeader>
          <DrawerTitle>Notifications</DrawerTitle>
          <DrawerDescription>You have 3 unread notifications.</DrawerDescription>
        </DrawerHeader>
        <DrawerBody>
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="rounded-lg border border-border p-3 text-sm">
              <p className="font-medium">New activity</p>
              <p className="text-muted-foreground">Someone interacted with your post.</p>
            </div>
          ))}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
