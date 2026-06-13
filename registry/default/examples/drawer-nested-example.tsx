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
export function DrawerNestedExample() {
  return (
    <Drawer>
      <DrawerTrigger render={<Button variant="outline">Open Drawer</Button>} />
      <DrawerContent showBar>
        <DrawerHeader>
          <DrawerTitle>Account</DrawerTitle>
          <DrawerDescription>Manage your account settings.</DrawerDescription>
        </DrawerHeader>
        <DrawerBody>
          <p className="text-sm text-muted-foreground">
            Drawers can be nested. Opening one from inside another pushes the parent back.
          </p>
        </DrawerBody>
        <DrawerFooter direction="row">
          <DrawerClose render={<Button variant="secondary">Close</Button>} />
          <Drawer>
            <DrawerTrigger render={<Button>Delete account</Button>} />
            <DrawerContent showBar>
              <DrawerHeader>
                <DrawerTitle>Are you sure?</DrawerTitle>
                <DrawerDescription>
                  This action cannot be undone. Your account will be permanently removed.
                </DrawerDescription>
              </DrawerHeader>
              <DrawerFooter direction="row">
                <DrawerClose render={<Button variant="secondary">Cancel</Button>} />
                <DrawerClose render={<Button>Delete</Button>} />
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
