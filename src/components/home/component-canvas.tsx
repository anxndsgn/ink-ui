import { useEffect, useMemo, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent, ReactNode } from "react";
import {
  ArrowClockwiseIcon,
  ArrowRightIcon,
  BellIcon,
  DotsThreeOutlineIcon,
  MagnifyingGlassIcon,
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
import { InputGroup, InputGroupAddon, InputGroupInput } from "@registry/components/ui/input-group";
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
const SHOW_INERTIA_PANEL = import.meta.env.DEV;
const DEFAULT_INERTIA_SETTINGS = {
  decay: 5.4,
  ease: 4.2,
  maxVelocity: 1.2,
  minVelocity: 0.055,
  sampleWindow: 70,
};

type ComponentPreview = {
  label: string;
  renderPreview: () => ReactNode;
};

type DragSample = {
  time: number;
  x: number;
  y: number;
};

type InertiaSettings = typeof DEFAULT_INERTIA_SETTINGS;

type Point = {
  x: number;
  y: number;
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
    label: "Input Group",
    renderPreview: () => (
      <InputGroup className="w-48">
        <InputGroupInput placeholder="Search" />
        <InputGroupAddon align="inline-end">
          <MagnifyingGlassIcon />
        </InputGroupAddon>
      </InputGroup>
    ),
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
        <TooltipTrigger
          render={
            <Button size="sm" variant="outline">
              Hover
            </Button>
          }
        />
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

function getReleaseVelocity(samples: DragSample[]) {
  const firstSample = samples[0];
  const lastSample = samples.at(-1);
  if (!firstSample || !lastSample || firstSample === lastSample) return { x: 0, y: 0 };

  const elapsed = Math.max(lastSample.time - firstSample.time, 16);
  return {
    x: (lastSample.x - firstSample.x) / elapsed,
    y: (lastSample.y - firstSample.y) / elapsed,
  };
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function easeOut(value: number, power: number) {
  return 1 - Math.pow(1 - value, power);
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
        contain: "layout paint style",
        containIntrinsicSize: `${TILE_WIDTH}px ${TILE_HEIGHT}px`,
        contentVisibility: "auto",
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
        contain: "layout paint style",
        containIntrinsicSize: `${CELL_WIDTH * 2}px ${CELL_HEIGHT * 2}px`,
        contentVisibility: "auto",
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

function InertiaControl({
  label,
  max,
  min,
  onChange,
  step,
  value,
}: {
  label: string;
  max: number;
  min: number;
  onChange: (value: number) => void;
  step: number;
  value: number;
}) {
  const formattedValue = Number.isInteger(step) ? String(value) : value.toFixed(3);

  return (
    <div className="grid gap-1.5 text-xs font-medium text-muted-foreground">
      <span className="flex items-center justify-between gap-3">
        <span>{label}</span>
        <input
          aria-label={`${label} value`}
          className="h-7 w-16 rounded-md border border-border bg-background px-2 text-right font-mono text-[11px] text-foreground"
          max={max}
          min={min}
          onChange={(event) => onChange(Number(event.currentTarget.value))}
          step={step}
          type="number"
          value={formattedValue}
        />
      </span>
      <Slider
        aria-label={label}
        className="w-full"
        max={max}
        min={min}
        onValueChange={(values) => onChange(Array.isArray(values) ? values[0] : values)}
        step={step}
        value={value}
      />
    </div>
  );
}

export function ComponentCanvas() {
  const [hasMoved, setHasMoved] = useState(false);
  const [inertiaSettings, setInertiaSettings] = useState(DEFAULT_INERTIA_SETTINGS);
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef<{
    originX: number;
    originY: number;
    pointerId: number;
    samples: DragSample[];
    startX: number;
    startY: number;
  } | null>(null);
  const frameRef = useRef<number | null>(null);
  const hasMovedRef = useRef(false);
  const inertiaRef = useRef<{
    duration: number;
    ease: number;
    frame: number | null;
    startOffset: Point;
    startTime: number;
    targetOffset: Point;
  } | null>(null);
  const inertiaSettingsRef = useRef(inertiaSettings);
  const layerRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef({ x: 0, y: 0 });

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

  const renderedItems = useMemo(
    () =>
      repeatedItems.map((item) =>
        item.type === "title" ? (
          <TitleCard key={item.key} primary={Boolean(item.primary)} x={item.x} y={item.y} />
        ) : (
          <ComponentCard component={item.component} key={item.key} x={item.x} y={item.y} />
        ),
      ),
    [repeatedItems],
  );

  const updateLayerTransform = (nextOffset: { x: number; y: number }) => {
    offsetRef.current = nextOffset;

    if (frameRef.current !== null) return;

    frameRef.current = window.requestAnimationFrame(() => {
      frameRef.current = null;

      const wrappedOffset = {
        x: wrapOffset(offsetRef.current.x, CYCLE_WIDTH),
        y: wrapOffset(offsetRef.current.y, CYCLE_HEIGHT),
      };

      if (layerRef.current) {
        layerRef.current.style.transform = `translate3d(${wrappedOffset.x}px, ${wrappedOffset.y}px, 0)`;
      }
    });
  };

  const updateHasMoved = (nextOffset: { x: number; y: number }) => {
    const nextHasMoved = Math.abs(nextOffset.x) > 1 || Math.abs(nextOffset.y) > 1;
    if (nextHasMoved === hasMovedRef.current) return;

    hasMovedRef.current = nextHasMoved;
    setHasMoved(nextHasMoved);
  };

  const updateInertiaSetting = (key: keyof InertiaSettings, value: number) => {
    setInertiaSettings((currentSettings) => {
      const nextSettings = {
        ...currentSettings,
        [key]: value,
      };
      inertiaSettingsRef.current = nextSettings;
      return nextSettings;
    });
  };

  const resetInertiaSettings = () => {
    inertiaSettingsRef.current = DEFAULT_INERTIA_SETTINGS;
    setInertiaSettings(DEFAULT_INERTIA_SETTINGS);
  };

  const cancelInertia = () => {
    const inertia = inertiaRef.current;
    if (inertia && inertia.frame !== null) window.cancelAnimationFrame(inertia.frame);
    inertiaRef.current = null;
  };

  const pushDragSample = (drag: NonNullable<typeof dragRef.current>, sample: DragSample) => {
    const sampleWindow = inertiaSettingsRef.current.sampleWindow;
    drag.samples.push(sample);
    while (drag.samples.length > 2 && sample.time - drag.samples[0].time > sampleWindow) {
      drag.samples.shift();
    }
  };

  const startInertia = (velocityX: number, velocityY: number) => {
    const settings = inertiaSettingsRef.current;
    const speed = Math.hypot(velocityX, velocityY);
    if (speed < settings.minVelocity) return;

    const velocityScale = Math.min(1, settings.maxVelocity / speed);
    const cappedVelocity = {
      x: velocityX * velocityScale,
      y: velocityY * velocityScale,
    };
    const cappedSpeed = speed * velocityScale;
    const duration = clamp(
      (Math.log(cappedSpeed / settings.minVelocity) / settings.decay) * 1000,
      180,
      1400,
    );
    const distanceScale =
      ((1 - Math.exp(-settings.decay * (duration / 1000))) * 1000) / settings.decay;
    const startOffset = offsetRef.current;
    inertiaRef.current = {
      duration,
      ease: settings.ease,
      frame: null,
      startOffset,
      startTime: performance.now(),
      targetOffset: {
        x: startOffset.x + cappedVelocity.x * distanceScale,
        y: startOffset.y + cappedVelocity.y * distanceScale,
      },
    };

    const animate = (time: number) => {
      const inertia = inertiaRef.current;
      if (!inertia) return;

      inertia.frame = null;
      const progress = clamp((time - inertia.startTime) / inertia.duration, 0, 1);
      const easedProgress = easeOut(progress, inertia.ease);

      const nextOffset = {
        x: inertia.startOffset.x + (inertia.targetOffset.x - inertia.startOffset.x) * easedProgress,
        y: inertia.startOffset.y + (inertia.targetOffset.y - inertia.startOffset.y) * easedProgress,
      };
      updateLayerTransform(nextOffset);
      updateHasMoved(nextOffset);

      if (progress >= 1) {
        inertiaRef.current = null;
        return;
      }

      inertia.frame = window.requestAnimationFrame(animate);
    };

    inertiaRef.current.frame = window.requestAnimationFrame(animate);
  };

  const finishDragging = (
    pointerId: number,
    shouldStartInertia: boolean,
    releaseSample?: DragSample,
  ) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== pointerId) return false;

    if (releaseSample) pushDragSample(drag, releaseSample);
    const releaseVelocity = getReleaseVelocity(drag.samples);
    dragRef.current = null;
    setIsDragging(false);

    if (shouldStartInertia) {
      startInertia(releaseVelocity.x, releaseVelocity.y);
    }

    return true;
  };

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    if (isInteractiveTarget(event.target)) return;

    cancelInertia();

    if (dragRef.current) {
      dragRef.current = null;
      setIsDragging(false);
    }

    try {
      event.currentTarget.setPointerCapture(event.pointerId);
    } catch {
      // Ignore errors from setPointerCapture.
    }

    const startTime = event.timeStamp || performance.now();
    dragRef.current = {
      originX: offsetRef.current.x,
      originY: offsetRef.current.y,
      pointerId: event.pointerId,
      samples: [{ time: startTime, x: event.clientX, y: event.clientY }],
      startX: event.clientX,
      startY: event.clientY,
    };
    setIsDragging(true);
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;

    event.preventDefault();
    const nextOffset = {
      x: drag.originX + event.clientX - drag.startX,
      y: drag.originY + event.clientY - drag.startY,
    };

    updateLayerTransform(nextOffset);
    updateHasMoved(nextOffset);

    const now = event.timeStamp || performance.now();
    pushDragSample(drag, { time: now, x: event.clientX, y: event.clientY });
  };

  const stopDragging = (
    event: ReactPointerEvent<HTMLDivElement>,
    shouldStartInertia = event.type === "pointerup",
  ) => {
    if (!dragRef.current || dragRef.current.pointerId !== event.pointerId) return;

    try {
      event.currentTarget.releasePointerCapture(event.pointerId);
    } catch {
      // Ignore errors from releasePointerCapture.
    }

    finishDragging(event.pointerId, shouldStartInertia, {
      time: event.timeStamp || performance.now(),
      x: event.clientX,
      y: event.clientY,
    });
  };

  const handlePointerLeave = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse") return;
    stopDragging(event);
  };

  const handleLostPointerCapture = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;

    finishDragging(event.pointerId, false);
  };

  useEffect(() => {
    const handleWindowPointerUp = (event: globalThis.PointerEvent) => {
      const drag = dragRef.current;
      if (!drag || drag.pointerId !== event.pointerId) return;
      finishDragging(event.pointerId, event.type === "pointerup", {
        time: event.timeStamp || performance.now(),
        x: event.clientX,
        y: event.clientY,
      });
    };

    window.addEventListener("pointerup", handleWindowPointerUp, true);
    window.addEventListener("pointercancel", handleWindowPointerUp, true);
    return () => {
      if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current);
      cancelInertia();
      window.removeEventListener("pointerup", handleWindowPointerUp, true);
      window.removeEventListener("pointercancel", handleWindowPointerUp, true);
    };
  }, []);

  const resetCanvas = () => {
    cancelInertia();
    const nextOffset = { x: 0, y: 0 };
    updateLayerTransform(nextOffset);
    updateHasMoved(nextOffset);
  };

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
        <div
          className="absolute inset-0 will-change-transform"
          ref={layerRef}
          style={{ transform: "translate3d(0, 0, 0)" }}
        >
          {renderedItems}
        </div>
      </div>

      {hasMoved && (
        <div className="fixed right-4 bottom-4 z-30">
          <Button aria-label="Reset component canvas" onClick={resetCanvas} size="sm">
            <ArrowClockwiseIcon />
            Reset
          </Button>
        </div>
      )}

      {SHOW_INERTIA_PANEL && (
        <section
          aria-label="Inertia tuning panel"
          className="fixed bottom-4 left-4 z-30 grid w-[min(calc(100vw-2rem),22rem)] gap-3 rounded-lg border border-border bg-background/95 p-3 text-foreground shadow-sm backdrop-blur"
        >
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-sm font-semibold">Inertia tuning</h2>
            <Button onClick={resetInertiaSettings} size="sm" variant="secondary">
              Defaults
            </Button>
          </div>
          <div className="grid gap-3">
            <InertiaControl
              label="Sample window"
              max={220}
              min={40}
              onChange={(value) => updateInertiaSetting("sampleWindow", value)}
              step={5}
              value={inertiaSettings.sampleWindow}
            />
            <InertiaControl
              label="Max velocity"
              max={2.4}
              min={0.2}
              onChange={(value) => updateInertiaSetting("maxVelocity", value)}
              step={0.025}
              value={inertiaSettings.maxVelocity}
            />
            <InertiaControl
              label="Min velocity"
              max={0.18}
              min={0.005}
              onChange={(value) => updateInertiaSetting("minVelocity", value)}
              step={0.005}
              value={inertiaSettings.minVelocity}
            />
            <InertiaControl
              label="Decay"
              max={12}
              min={1.5}
              onChange={(value) => updateInertiaSetting("decay", value)}
              step={0.1}
              value={inertiaSettings.decay}
            />
            <InertiaControl
              label="Ease"
              max={6}
              min={1}
              onChange={(value) => updateInertiaSetting("ease", value)}
              step={0.1}
              value={inertiaSettings.ease}
            />
          </div>
        </section>
      )}
    </main>
  );
}
