import { Tooltip, TooltipContent, TooltipTrigger } from "registry/default/ui/tooltip";
import { Button } from "registry/default/ui/button";
export function TooltipPositionedExample() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Tooltip>
        <TooltipTrigger render={<Button variant="outline">Top</Button>} />
        <TooltipContent positionerProps={{ side: "top" }}>
          <p>Tooltip on top</p>
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger render={<Button variant="outline">Bottom</Button>} />
        <TooltipContent positionerProps={{ side: "bottom" }}>
          <p>Tooltip on bottom</p>
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger render={<Button variant="outline">Left</Button>} />
        <TooltipContent positionerProps={{ side: "left" }}>
          <p>Tooltip on left</p>
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger render={<Button variant="outline">Right</Button>} />
        <TooltipContent positionerProps={{ side: "right" }}>
          <p>Tooltip on right</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
