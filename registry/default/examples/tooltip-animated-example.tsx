import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
  TooltipViewport,
  createTooltipHandle,
} from "registry/default/ui/tooltip";
import { Button } from "registry/default/ui/button";
import {
  PencilSimpleIcon,
  TrashIcon,
  CopyIcon,
  DownloadSimpleIcon,
  ShareNetworkIcon,
} from "@phosphor-icons/react";
export function TooltipAnimatedExample() {
  const tooltipHandle = createTooltipHandle<string>();

  return (
    <TooltipProvider>
      <div className="flex items-center gap-2">
        <TooltipTrigger
          handle={tooltipHandle}
          payload="Edit this item"
          render={
            <Button size="icon" variant="ghost">
              <PencilSimpleIcon />
            </Button>
          }
        />
        <TooltipTrigger
          handle={tooltipHandle}
          payload="Duplicate"
          render={
            <Button size="icon" variant="ghost">
              <CopyIcon />
            </Button>
          }
        />
        <TooltipTrigger
          handle={tooltipHandle}
          payload="Download"
          render={
            <Button size="icon" variant="ghost">
              <DownloadSimpleIcon />
            </Button>
          }
        />
        <TooltipTrigger
          handle={tooltipHandle}
          payload="Share"
          render={
            <Button size="icon" variant="ghost">
              <ShareNetworkIcon />
            </Button>
          }
        />
        <TooltipTrigger
          handle={tooltipHandle}
          payload="Delete"
          render={
            <Button size="icon" variant="ghost">
              <TrashIcon />
            </Button>
          }
        />
      </div>
      <Tooltip handle={tooltipHandle}>
        {({ payload }) => (
          <TooltipContent>
            {typeof payload === "string" && (
              <TooltipViewport>
                <span>{payload}</span>
              </TooltipViewport>
            )}
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
}
