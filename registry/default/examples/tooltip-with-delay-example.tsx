import { Tooltip, TooltipContent, TooltipTrigger } from "registry/default/ui/tooltip";
import { Button } from "registry/default/ui/button";
export function TooltipWithDelayExample() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Tooltip>
        <TooltipTrigger delay={0} render={<Button variant="outline">Instant</Button>} />
        <TooltipContent>
          <p>Appears immediately</p>
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger delay={500} render={<Button variant="outline">Delayed</Button>} />
        <TooltipContent>
          <p>Appears after 500ms</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
