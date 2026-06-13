import {
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "registry/default/ui/popover";
import { Button } from "registry/default/ui/button";
export function PopoverWithPositionerPropsExample() {
  return (
    <Popover>
      <PopoverTrigger render={<Button variant="outline">Top Aligned</Button>} />
      <PopoverContent positionerProps={{ side: "top", align: "start" }}>
        <PopoverHeader>
          <PopoverTitle>Positioned Popover</PopoverTitle>
        </PopoverHeader>
        <PopoverBody>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            This popover is positioned above the trigger with start alignment.
          </p>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
