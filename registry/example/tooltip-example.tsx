import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
  TooltipViewport,
  createTooltipHandle,
} from "@registry/components/ui/tooltip";
import { Button } from "@registry/components/ui/button";
import {
  PencilSimpleIcon,
  TrashIcon,
  CopyIcon,
  DownloadSimpleIcon,
  ShareNetworkIcon,
} from "@phosphor-icons/react";

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
