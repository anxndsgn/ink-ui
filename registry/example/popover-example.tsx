import {
  Popover,
  PopoverBody,
  PopoverClose,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@registry/components/ui/popover";
import { Button } from "@registry/components/ui/button";

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

export function PopoverNoCloseButtonExample() {
  return (
    <Popover>
      <PopoverTrigger render={<Button variant="outline">No Close Button</Button>} />
      <PopoverContent>
        <PopoverHeader closeButton={false}>
          <PopoverTitle>Notice</PopoverTitle>
        </PopoverHeader>
        <PopoverBody>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            This popover has no default close button in the header.
          </p>
          <PopoverClose render={<Button size="sm">Dismiss</Button>} />
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}

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
