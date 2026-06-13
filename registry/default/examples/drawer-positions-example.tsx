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

const positions = ["top", "right", "bottom", "left"] as const;

export function DrawerPositionsExample() {
  return (
    <div className="flex flex-wrap gap-2">
      {positions.map((position) => (
        <Drawer key={position} position={position}>
          <DrawerTrigger render={<Button variant="outline" className="capitalize" />}>
            {position}
          </DrawerTrigger>
          <DrawerContent showBar>
            <DrawerHeader>
              <DrawerTitle className="capitalize">{position} drawer</DrawerTitle>
              <DrawerDescription>This drawer slides in from the {position} edge.</DrawerDescription>
            </DrawerHeader>
            <DrawerBody>
              <p className="text-sm text-muted-foreground">
                The swipe direction adapts automatically to the chosen position.
              </p>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      ))}
    </div>
  );
}
