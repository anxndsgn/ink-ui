import { Tooltip, TooltipContent, TooltipTrigger } from "registry/default/ui/tooltip";
import { Button } from "registry/default/ui/button";
export function TooltipExample() {
  return (
    <Tooltip>
      <TooltipTrigger render={<Button variant="outline">Hover me</Button>} />
      <TooltipContent>
        <p>Add to library</p>
      </TooltipContent>
    </Tooltip>
  );
}
