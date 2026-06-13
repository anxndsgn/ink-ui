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
export function DrawerInsetExample() {
  return (
    <Drawer>
      <DrawerTrigger render={<Button variant="outline">Open Inset Drawer</Button>} />
      <DrawerContent variant="inset" showBar className="w-96">
        <DrawerHeader>
          <DrawerTitle>Confirm subscription</DrawerTitle>
          <DrawerDescription>
            The inset variant floats the drawer away from the screen edges.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerBody>
          <p className="text-sm text-muted-foreground">
            You will be charged $9 per month. Cancel anytime from your account settings.
          </p>
        </DrawerBody>
        <DrawerFooter direction="row">
          <DrawerClose render={<Button variant="secondary">Cancel</Button>} />
          <DrawerClose render={<Button>Subscribe</Button>} />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
