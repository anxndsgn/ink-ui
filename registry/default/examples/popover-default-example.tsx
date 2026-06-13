import {
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "registry/default/ui/popover";
import { Button } from "registry/default/ui/button";
export function PopoverExample() {
  return (
    <Popover>
      <PopoverTrigger render={<Button variant="outline">Open Popover</Button>} />
      <PopoverContent>
        <PopoverHeader>
          <PopoverTitle>Notifications</PopoverTitle>
        </PopoverHeader>
        <PopoverBody>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            You are all caught up. Good job!
          </p>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
