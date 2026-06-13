import {
  Drawer,
  DrawerBody,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "registry/default/ui/drawer";
import { Button } from "registry/default/ui/button";
export function DrawerExample() {
  return (
    <Drawer>
      <DrawerTrigger render={<Button variant="outline">Open Drawer</Button>} />
      <DrawerContent showBar>
        <DrawerHeader>
          <DrawerTitle>Edit profile</DrawerTitle>
          <DrawerDescription>
            Make changes to your profile here. Swipe down or tap outside to dismiss.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerBody>
          <p className="text-sm text-muted-foreground">
            Drawers slide in from the edge of the screen and support swipe-to-dismiss gestures.
          </p>
        </DrawerBody>
        <DrawerFooter direction="row">
          <DrawerClose render={<Button variant="secondary">Cancel</Button>} />
          <DrawerClose render={<Button>Save changes</Button>} />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
