import { useEffect, useMemo, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent, ReactNode } from "react";
import {
  ArrowClockwiseIcon,
  ArrowRightIcon,
  BellIcon,
  DotsThreeOutlineIcon,
  WarningOctagonIcon,
} from "@phosphor-icons/react";
import {
  AlertDialog,
  AlertDialogClose,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@registry/components/ui/alert-dialog";
import { Button, buttonVariants } from "@registry/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@registry/components/ui/card";
import { Checkbox } from "@registry/components/ui/checkbox";
import {
  Combobox,
  ComboboxContent,
  ComboboxItem,
  ComboboxList,
  ComboboxInput,
  ComboboxEmpty,
} from "@registry/components/ui/combobox";
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@registry/components/ui/dialog";
import { Input } from "@registry/components/ui/input";
import {
  Menu,
  MenuContent,
  MenuItem,
  MenuItemLabel,
  MenuSeparator,
  MenuTrigger,
} from "@registry/components/ui/menu";
import {
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@registry/components/ui/popover";
import { Radio, RadioGroup } from "@registry/components/ui/radio";
import { ScrollArea } from "@registry/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@registry/components/ui/select";
import Slider from "@registry/components/ui/slider";
import { Switch } from "@registry/components/ui/switch";
import { Tabs, TabsList, TabsPanel, TabsTab } from "@registry/components/ui/tabs";
import { Tag } from "@registry/components/ui/tag";
import { Tooltip, TooltipContent, TooltipTrigger } from "@registry/components/ui/tooltip";
import { cn } from "@registry/lib/utils";

const TILE_WIDTH = 300;
const TILE_HEIGHT = 190;
const CELL_WIDTH = 316;
const CELL_HEIGHT = 208;
const COLUMNS = 6;
const ROWS = 4;
const CYCLE_WIDTH = CELL_WIDTH * COLUMNS;
const CYCLE_HEIGHT = CELL_HEIGHT * ROWS;
const REPEAT_STEPS = [-1, 0, 1];

type ComponentPreview = {
  label: string;
  renderPreview: () => ReactNode;
};

type BaseCanvasItem =
  | {
      component: ComponentPreview;
      id: string;
      type: "component";
      x: number;
      y: number;
    }
  | {
      type: "title";
      x: number;
      y: number;
    };

type RepeatedCanvasItem =
  | (BaseCanvasItem & {
      key: string;
      primary?: boolean;
    })
  | {
      key: string;
      primary: boolean;
      type: "title";
      x: number;
      y: number;
    };

const selectItems = [
  { value: "astro", label: "Astro" },
  { value: "react", label: "React" },
  { value: "base-ui", label: "Base UI" },
];

const componentPreviews: ComponentPreview[] = [
  {
    label: "Alert Dialog",
    renderPreview: () => (
      <AlertDialog>
        <AlertDialogTrigger
          render={
            <Button size="sm" variant="outline">
              <WarningOctagonIcon />
              Confirm
            </Button>
          }
        />
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Continue?</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogDescription>
            Review this action before applying the change.
          </AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogClose render={<Button variant="secondary">Cancel</Button>} />
            <AlertDialogClose render={<Button>Continue</Button>} />
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    ),
  },
  {
    label: "Button",
    renderPreview: () => <Button>Button</Button>,
  },
  {
    label: "Card",
    renderPreview: () => (
      <Card className="w-52">
        <CardHeader>
          <CardTitle>Card title</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">This is the content of the card.</p>
        </CardContent>
      </Card>
    ),
  },
  {
    label: "Checkbox",
    renderPreview: () => (
      <div className="grid gap-2 text-sm">
        <div className="flex items-center gap-2">
          <Checkbox defaultChecked />
          <span>Active</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Checkbox />
          <span>Optional</span>
        </div>
      </div>
    ),
  },
  {
    label: "Combobox",
    renderPreview: () => {
      const items = [
        { value: "astro", label: "Astro" },
        { value: "react", label: "React" },
        { value: "base-ui", label: "Base UI" },
      ];
      return (
        <Combobox items={items}>
          <ComboboxInput className="w-44" placeholder="Pick one" />
          <ComboboxContent>
            <ComboboxList>
              {(item: (typeof items)[number]) => (
                <ComboboxItem key={item.value} value={item}>
                  {item.label}
                </ComboboxItem>
              )}
            </ComboboxList>
            <ComboboxEmpty>No results</ComboboxEmpty>
          </ComboboxContent>
        </Combobox>
      );
    },
  },
  {
    label: "Dialog",
    renderPreview: () => (
      <Dialog>
        <DialogTrigger render={<Button variant="outline">Open dialog</Button>} />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Project settings</DialogTitle>
            <DialogDescription>Adjust this component preview.</DialogDescription>
          </DialogHeader>
          <DialogBody>
            <p className="text-sm text-muted-foreground">
              This dialog is opened from the draggable homepage grid.
            </p>
          </DialogBody>
          <DialogFooter direction="row">
            <DialogClose render={<Button variant="secondary">Cancel</Button>} />
            <DialogClose render={<Button>Done</Button>} />
          </DialogFooter>
        </DialogContent>
      </Dialog>
    ),
  },
  {
    label: "Input",
    renderPreview: () => <Input className="w-44" placeholder="Type something" />,
  },
  {
    label: "Menu",
    renderPreview: () => (
      <Menu>
        <MenuTrigger
          render={
            <Button size="sm" variant="outline">
              Actions
              <DotsThreeOutlineIcon />
            </Button>
          }
        />
        <MenuContent>
          <MenuItem>
            <MenuItemLabel>Profile</MenuItemLabel>
          </MenuItem>
          <MenuItem>
            <MenuItemLabel>Settings</MenuItemLabel>
          </MenuItem>
          <MenuSeparator />
          <MenuItem>
            <MenuItemLabel>Sign out</MenuItemLabel>
          </MenuItem>
        </MenuContent>
      </Menu>
    ),
  },
  {
    label: "Menu Content",
    renderPreview: () => (
      <div className="grid min-w-44 rounded-xl bg-popover p-1.5 text-sm text-popover-foreground shadow-xs outline outline-border">
        <button
          className="rounded-lg px-3 py-2 text-left outline-none hover:bg-primary hover:text-primary-foreground focus-visible:bg-primary focus-visible:text-primary-foreground"
          type="button"
        >
          Profile
        </button>
        <button
          className="rounded-lg px-3 py-2 text-left outline-none hover:bg-primary hover:text-primary-foreground focus-visible:bg-primary focus-visible:text-primary-foreground"
          type="button"
        >
          Settings
        </button>
        <div className="mx-2 my-1.5 h-px bg-border" />
        <button
          className="rounded-lg px-3 py-2 text-left text-destructive outline-none hover:bg-destructive hover:text-destructive-foreground focus-visible:bg-destructive focus-visible:text-destructive-foreground"
          type="button"
        >
          Sign out
        </button>
      </div>
    ),
  },
  {
    label: "Popover",
    renderPreview: () => (
      <Popover>
        <PopoverTrigger
          render={
            <Button size="sm" variant="secondary">
              <BellIcon />
              Notify
            </Button>
          }
        />
        <PopoverContent>
          <PopoverHeader>
            <PopoverTitle>Notification</PopoverTitle>
          </PopoverHeader>
          <PopoverBody>
            <p className="text-sm text-muted-foreground">
              Component previews can open from the canvas.
            </p>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    ),
  },
  {
    label: "Radio",
    renderPreview: () => (
      <RadioGroup className="gap-2" defaultValue="one">
        <div className="flex items-center gap-2 text-sm">
          <Radio value="one" />
          <span>One</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Radio value="two" />
          <span>Two</span>
        </div>
      </RadioGroup>
    ),
  },
  {
    label: "Scroll Area",
    renderPreview: () => (
      <ScrollArea className="h-20 w-44 rounded-md border border-border bg-background">
        <div className="space-y-2 p-3 text-xs text-muted-foreground">
          <p>Components</p>
          <p>Tokens</p>
          <p>Patterns</p>
          <p>Examples</p>
        </div>
      </ScrollArea>
    ),
  },
  {
    label: "Select",
    renderPreview: () => (
      <Select defaultValue="astro" items={selectItems}>
        <SelectTrigger className="w-44" size="sm">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {selectItems.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    ),
  },
  {
    label: "Slider",
    renderPreview: () => <Slider aria-label="Progress" defaultValue={64} />,
  },
  {
    label: "Switch",
    renderPreview: () => <Switch defaultChecked />,
  },
  {
    label: "Tabs",
    renderPreview: () => (
      <Tabs className="h-20 w-44" defaultValue="docs">
        <TabsList size="sm" variant="underline">
          <TabsTab value="docs">Docs</TabsTab>
          <TabsTab value="code">Code</TabsTab>
        </TabsList>
        <TabsPanel value="docs">
          <div className="mt-2 h-8 rounded-md bg-muted" />
        </TabsPanel>
        <TabsPanel value="code">
          <div className="mt-2 h-8 rounded-md bg-muted" />
        </TabsPanel>
      </Tabs>
    ),
  },
  {
    label: "Tag",
    renderPreview: () => (
      <div className="flex flex-wrap justify-center gap-2">
        <Tag>Default</Tag>
        <Tag variant="secondary">New</Tag>
        <Tag variant="outline">Beta</Tag>
      </div>
    ),
  },
  {
    label: "Tooltip",
    renderPreview: () => (
      <Tooltip>
        <TooltipTrigger render={<Button size="sm" variant="outline">Hover</Button>} />
        <TooltipContent>
          <p className="text-sm">A helpful tip</p>
        </TooltipContent>
      </Tooltip>
    ),
  },
];

const titleArea = {
  column: -1,
  columnSpan: 2,
  row: -1,
  rowSpan: 2,
};

const gridColumns = Array.from({ length: COLUMNS }, (_, index) => index - COLUMNS / 2);
const gridRows = Array.from({ length: ROWS }, (_, index) => index - ROWS / 2);
const visibleGridCells = gridRows.flatMap((row) =>
  gridColumns
    .filter((column) => !isInsideTitleArea(column, row))
    .map((column) => ({ column, row })),
);

function isInsideTitleArea(column: number, row: number) {
  return (
    column >= titleArea.column &&
    column < titleArea.column + titleArea.columnSpan &&
    row >= titleArea.row &&
    row < titleArea.row + titleArea.rowSpan
  );
}

function getGridItemCenter(column: number, row: number, columnSpan = 1, rowSpan = 1) {
  return {
    x: (column + columnSpan / 2) * CELL_WIDTH,
    y: (row + rowSpan / 2) * CELL_HEIGHT,
  };
}

const baseItems: BaseCanvasItem[] = [
  ...visibleGridCells.map(({ column, row }, index): BaseCanvasItem => {
    const component = componentPreviews[index % componentPreviews.length];
    const { x, y } = getGridItemCenter(column, row);

    return {
      component,
      id: `${column}:${row}`,
      type: "component",
      x,
      y,
    };
  }),
  {
    type: "title",
    ...getGridItemCenter(titleArea.column, titleArea.row, titleArea.columnSpan, titleArea.rowSpan),
  },
];

function wrapOffset(value: number, size: number) {
  return ((((value + size / 2) % size) + size) % size) - size / 2;
}

function isInteractiveTarget(target: EventTarget | null) {
  if (!(target instanceof Element)) return false;

  return Boolean(
    target.closest(
      [
        "a",
        "button",
        "input",
        "select",
        "textarea",
        "[role='button']",
        "[role='checkbox']",
        "[role='combobox']",
        "[role='menuitem']",
        "[role='radio']",
        "[role='slider']",
        "[role='switch']",
        "[role='tab']",
        "[data-slot='slider-control']",
      ].join(","),
    ),
  );
}

function ComponentCard({ component, x, y }: { component: ComponentPreview; x: number; y: number }) {
  return (
    <article
      aria-label={`${component.label} preview`}
      className="absolute top-1/2 left-1/2 flex items-center justify-center overflow-hidden rounded-2xl bg-muted/40 p-4"
      style={{
        height: TILE_HEIGHT,
        transform: `translate3d(${x - TILE_WIDTH / 2}px, ${y - TILE_HEIGHT / 2}px, 0)`,
        width: TILE_WIDTH,
      }}
    >
      <div className="scale-95">{component.renderPreview()}</div>
    </article>
  );
}

function TitleCard({ primary, x, y }: { primary: boolean; x: number; y: number }) {
  return (
    <article
      className="pointer-events-none absolute top-1/2 left-1/2 flex flex-col items-center justify-center gap-5 text-center"
      style={{
        height: CELL_HEIGHT * 2,
        transform: `translate3d(calc(-50% + ${x}px), calc(-50% + ${y}px), 0)`,
        width: `min(${CELL_WIDTH * 2}px, calc(100vw - 2rem))`,
      }}
    >
      <div className="grid gap-4">
        {primary ? (
          <h1 className="text-3xl leading-none font-semibold text-balance sm:text-4xl md:text-5xl">
            A component library that feels warm
          </h1>
        ) : (
          <p className="text-3xl leading-none font-semibold text-balance sm:text-4xl md:text-5xl">
            A component library that feels warm
          </p>
        )}
        <p className="mx-auto max-w-lg text-base leading-7 text-muted-foreground">
          Ink UI is a React component library focused on delivering a warm and delightful experience
          instead of cold efficiency.
        </p>
      </div>
      <a
        className={cn(buttonVariants({ size: "lg" }), "pointer-events-auto shadow-xs")}
        href="/introduction"
        onPointerDown={(event) => event.stopPropagation()}
      >
        Docs
        <ArrowRightIcon />
      </a>
    </article>
  );
}

export function ComponentCanvas() {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef<{
    originX: number;
    originY: number;
    pointerId: number;
    startX: number;
    startY: number;
  } | null>(null);

  const repeatedItems = useMemo(
    () =>
      REPEAT_STEPS.flatMap((repeatY) =>
        REPEAT_STEPS.flatMap((repeatX) =>
          baseItems.map((item): RepeatedCanvasItem => {
            const x = item.x + repeatX * CYCLE_WIDTH;
            const y = item.y + repeatY * CYCLE_HEIGHT;

            if (item.type === "title") {
              return {
                key: `title-${repeatX}-${repeatY}`,
                primary: repeatX === 0 && repeatY === 0,
                type: "title",
                x,
                y,
              };
            }

            return {
              component: item.component,
              id: item.id,
              key: `${item.id}-${repeatX}-${repeatY}`,
              type: "component",
              x,
              y,
            };
          }),
        ),
      ),
    [],
  );

  const wrappedOffset = {
    x: wrapOffset(offset.x, CYCLE_WIDTH),
    y: wrapOffset(offset.y, CYCLE_HEIGHT),
  };
  const hasMoved = Math.abs(offset.x) > 1 || Math.abs(offset.y) > 1;

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    if (isInteractiveTarget(event.target)) return;

    if (dragRef.current) {
      dragRef.current = null;
      setIsDragging(false);
    }

    try {
      event.currentTarget.setPointerCapture(event.pointerId);
    } catch {
      // Ignore errors from setPointerCapture.
    }

    dragRef.current = {
      originX: offset.x,
      originY: offset.y,
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
    };
    setIsDragging(true);
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;

    event.preventDefault();
    setOffset({
      x: drag.originX + event.clientX - drag.startX,
      y: drag.originY + event.clientY - drag.startY,
    });
  };

  const stopDragging = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;

    try {
      event.currentTarget.releasePointerCapture(event.pointerId);
    } catch {
      // Ignore errors from releasePointerCapture.
    }

    dragRef.current = null;
    setIsDragging(false);
  };

  const handlePointerLeave = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse") return;
    stopDragging(event);
  };

  const handleLostPointerCapture = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;

    dragRef.current = null;
    setIsDragging(false);
  };

  useEffect(() => {
    const handleWindowPointerUp = (event: globalThis.PointerEvent) => {
      const drag = dragRef.current;
      if (!drag || drag.pointerId !== event.pointerId) return;
      dragRef.current = null;
      setIsDragging(false);
    };

    window.addEventListener("pointerup", handleWindowPointerUp, true);
    window.addEventListener("pointercancel", handleWindowPointerUp, true);
    return () => {
      window.removeEventListener("pointerup", handleWindowPointerUp, true);
      window.removeEventListener("pointercancel", handleWindowPointerUp, true);
    };
  }, []);

  return (
    <main className="relative min-h-dvh overflow-hidden bg-background text-foreground">
      <div
        aria-label="Component canvas"
        className={cn(
          "absolute inset-0 z-0 touch-none overflow-hidden select-none",
          isDragging ? "cursor-grabbing" : "cursor-grab",
        )}
        onLostPointerCapture={handleLostPointerCapture}
        onPointerCancel={stopDragging}
        onPointerDown={handlePointerDown}
        onPointerLeave={handlePointerLeave}
        onPointerMove={handlePointerMove}
        onPointerUp={stopDragging}
      >
        {repeatedItems.map((item) =>
          item.type === "title" ? (
            <TitleCard
              key={item.key}
              primary={Boolean(item.primary)}
              x={item.x + wrappedOffset.x}
              y={item.y + wrappedOffset.y}
            />
          ) : (
            <ComponentCard
              component={item.component}
              key={item.key}
              x={item.x + wrappedOffset.x}
              y={item.y + wrappedOffset.y}
            />
          ),
        )}
      </div>

      {hasMoved && (
        <div className="fixed right-4 bottom-4 z-30">
          <Button
            aria-label="Reset component canvas"
            onClick={() => setOffset({ x: 0, y: 0 })}
            size="sm"
          >
            <ArrowClockwiseIcon />
            Reset
          </Button>
        </div>
      )}
    </main>
  );
}
