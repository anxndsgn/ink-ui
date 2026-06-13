import {
  Popover,
  PopoverBody,
  PopoverClose,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "registry/default/ui/popover";
import { Button } from "registry/default/ui/button";
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
