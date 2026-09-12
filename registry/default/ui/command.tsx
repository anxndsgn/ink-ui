import * as React from "react";
import { Autocomplete as BaseAutocomplete } from "@base-ui/react/autocomplete";
import { cn } from "@/lib/utils";
import { InputGroupInput, InputGroupTextarea } from "./input-group";
import { ScrollArea } from "./scroll-area";

interface CommandTriggerMatch {
  query: string;
  start: number;
  end: number;
}

type CommandTriggerMatcher = (value: string, caret: number) => CommandTriggerMatch | null;

interface CreateCommandTriggerOptions {
  position?: "start" | "anywhere";
}

const DEFAULT_COMMAND_TRIGGERS: readonly string[] = ["/", "、"];

function isGroupedItems(
  items: readonly unknown[],
): items is readonly { items: readonly unknown[] }[] {
  const first = items[0];
  return (
    typeof first === "object" && first !== null && "items" in first && Array.isArray(first.items)
  );
}

function createCommandTrigger(
  trigger: string | readonly string[],
  { position = "start" }: CreateCommandTriggerOptions = {},
): CommandTriggerMatcher {
  const triggers = typeof trigger === "string" ? [trigger] : trigger;

  return (value, caret) => {
    if (position === "start") {
      const prefix = triggers.find((candidate) => value.startsWith(candidate));
      if (prefix === undefined) return null;
      const query = value.slice(prefix.length);
      if (/\s/.test(query)) return null;
      return { end: value.length, query, start: 0 };
    }

    const before = value.slice(0, caret);
    let start = -1;
    let matched = "";
    for (const candidate of triggers) {
      const index = before.lastIndexOf(candidate);
      if (index > start) {
        start = index;
        matched = candidate;
      }
    }
    if (start === -1) return null;
    if (start > 0 && !/\s/.test(before[start - 1] ?? "")) return null;
    const query = before.slice(start + matched.length);
    if (/\s/.test(query)) return null;
    return { end: caret, query, start };
  };
}

interface CommandContextValue {
  open: boolean;
  query: string;
  inputRef: React.RefObject<HTMLInputElement | null>;
  highlightedRef: React.RefObject<unknown>;
  getAnchor: () => Element | null;
  stageSelection: (itemValue: unknown) => void;
}

const CommandContext = React.createContext<CommandContextValue | null>(null);

function useCommandContext() {
  const context = React.useContext(CommandContext);
  if (!context) {
    throw new Error("Command components must be used within <Command>.");
  }
  return context;
}

function useCommand() {
  const { open, query } = useCommandContext();
  return { open, query: open ? query : "" };
}

type CommandChangeEventDetails = BaseAutocomplete.Root.ChangeEventDetails;

interface CommandSelectDetails {
  match: CommandTriggerMatch | null;
  query: string;
  value: string;
}

type CommandFilter<ItemValue> = (
  itemValue: ItemValue,
  query: string,
  itemToStringValue?: (itemValue: ItemValue) => string,
) => boolean;

interface CommandProps<ItemValue> extends Omit<
  BaseAutocomplete.Root.Props<ItemValue>,
  | "mode"
  | "inline"
  | "open"
  | "defaultOpen"
  | "openOnInputClick"
  | "filter"
  | "value"
  | "defaultValue"
  | "onValueChange"
  | "filteredItems"
  | "limit"
> {
  trigger?: string | readonly string[] | CommandTriggerMatcher;
  filter?: CommandFilter<ItemValue>;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string, eventDetails: CommandChangeEventDetails) => void;
  onSelect?: (itemValue: ItemValue, details: CommandSelectDetails) => void;
}

function Command<Items extends readonly { items: readonly any[] }[]>(
  props: Omit<CommandProps<Items[number]["items"][number]>, "items"> & { items: Items },
): React.JSX.Element;
function Command<ItemValue>(
  props: Omit<CommandProps<ItemValue>, "items"> & { items?: readonly ItemValue[] | undefined },
): React.JSX.Element;
function Command({
  trigger = DEFAULT_COMMAND_TRIGGERS,
  filter,
  value: valueProp,
  defaultValue,
  onValueChange,
  onOpenChange,
  onSelect,
  onItemHighlighted,
  autoHighlight = "always",
  keepHighlight = true,
  itemToStringValue,
  ...props
}: CommandProps<any>) {
  const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue ?? "");
  const isControlled = valueProp !== undefined;
  const value = isControlled ? valueProp : uncontrolledValue;

  const [open, setOpen] = React.useState(false);
  const [match, setMatch] = React.useState<CommandTriggerMatch | null>(null);

  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const highlightedRef = React.useRef<unknown>(undefined);
  const pendingSelectionRef = React.useRef<{ itemValue: unknown } | null>(null);

  const triggers =
    typeof trigger === "function" ? null : typeof trigger === "string" ? [trigger] : trigger;
  const matcher = React.useMemo(
    () => (typeof trigger === "function" ? trigger : createCommandTrigger(trigger)),
    [trigger],
  );
  const collator = BaseAutocomplete.useFilter({ locale: props.locale });
  const query = match?.query ?? "";

  const filteredItems = React.useMemo(() => {
    const { items } = props;
    if (!items || query === "") return items;
    const matches = (itemValue: unknown) =>
      (filter ?? collator.contains)(itemValue, query, itemToStringValue);
    return isGroupedItems(items)
      ? items
          .map((group) => ({ ...group, items: group.items.filter(matches) }))
          .filter((group) => group.items.length > 0)
      : items.filter(matches);
  }, [props.items, filter, collator, query, itemToStringValue]);

  const commitValue = (next: string, eventDetails: CommandChangeEventDetails) => {
    if (!isControlled) setUncontrolledValue(next);
    onValueChange?.(next, eventDetails);
  };

  const commitOpen = (next: boolean, eventDetails: CommandChangeEventDetails) => {
    if (next === open) return;
    setOpen(next);
    onOpenChange?.(next, eventDetails);
  };

  const getCaret = (fallback: string) => inputRef.current?.selectionStart ?? fallback.length;

  const completeSelection = (eventDetails: CommandChangeEventDetails) => {
    const pending = pendingSelectionRef.current;
    if (!pending) return;
    pendingSelectionRef.current = null;

    const nextValue = match ? value.slice(0, match.start) + value.slice(match.end) : value;
    commitValue(nextValue, eventDetails);
    commitOpen(false, eventDetails);
    onSelect?.(pending.itemValue, { match, query: match?.query ?? "", value: nextValue });
  };

  const handleValueChange = (next: string, eventDetails: CommandChangeEventDetails) => {
    const { reason } = eventDetails;
    if (reason === "item-press") {
      completeSelection(eventDetails);
      return;
    }

    commitValue(next, eventDetails);

    const nextMatch = matcher(next, getCaret(next));
    if (nextMatch) {
      setMatch(nextMatch);
      commitOpen(true, eventDetails);
    } else {
      commitOpen(false, eventDetails);
    }
  };

  const handleOpenChange = (next: boolean, eventDetails: CommandChangeEventDetails) => {
    const { reason } = eventDetails;
    if (!next) {
      commitOpen(false, eventDetails);
      return;
    }

    if (reason === "input-change" || reason === "input-press") return;

    const insert = triggers?.[0];
    if (insert && value === "") {
      commitValue(insert, eventDetails);
      setMatch({ end: insert.length, query: "", start: 0 });
    } else {
      setMatch(matcher(value, getCaret(value)));
    }
    commitOpen(true, eventDetails);
  };

  const contextValue = React.useMemo<CommandContextValue>(
    () => ({
      getAnchor: () =>
        inputRef.current?.closest("[data-slot=input-group]") ?? inputRef.current ?? null,
      highlightedRef,
      inputRef,
      open,
      query,
      stageSelection: (itemValue) => {
        pendingSelectionRef.current = { itemValue };
      },
    }),
    [open, query],
  );

  return (
    <CommandContext.Provider value={contextValue}>
      <BaseAutocomplete.Root
        {...props}
        autoHighlight={autoHighlight}
        filteredItems={filteredItems}
        itemToStringValue={itemToStringValue}
        keepHighlight={keepHighlight}
        mode="list"
        onItemHighlighted={(highlightedValue, eventDetails) => {
          highlightedRef.current = highlightedValue;
          onItemHighlighted?.(highlightedValue, eventDetails);
        }}
        onOpenChange={handleOpenChange}
        onValueChange={handleValueChange}
        open={open}
        openOnInputClick={false}
        value={value}
      />
    </CommandContext.Provider>
  );
}

const PASSTHROUGH_KEYS_WHEN_CLOSED = new Set(["ArrowUp", "ArrowDown", "Home", "End", "Escape"]);

interface CommandInputProps extends BaseAutocomplete.Input.Props {
  multiline?: boolean;
}

function CommandInput({ multiline = false, onKeyDown, ref, render, ...props }: CommandInputProps) {
  const { open, highlightedRef, inputRef } = useCommandContext();

  return (
    <BaseAutocomplete.Input
      ref={(element: HTMLInputElement | null) => {
        inputRef.current = element;
        if (typeof ref === "function") return ref(element);
        if (ref) ref.current = element;
      }}
      onKeyDown={(event) => {
        if (!open) {
          if (PASSTHROUGH_KEYS_WHEN_CLOSED.has(event.key)) event.preventBaseUIHandler();
          onKeyDown?.(event);
          return;
        }

        if (event.key === "Home" || event.key === "End") event.preventBaseUIHandler();

        const isSelecting =
          event.key === "Enter" &&
          highlightedRef.current !== undefined &&
          !event.shiftKey &&
          !event.metaKey &&
          !event.ctrlKey &&
          !event.altKey;
        if (!isSelecting) onKeyDown?.(event);
      }}
      render={render ?? (multiline ? <InputGroupTextarea /> : <InputGroupInput />)}
      {...props}
    />
  );
}

function CommandTrigger({ className, ...props }: BaseAutocomplete.Trigger.Props) {
  return (
    <BaseAutocomplete.Trigger
      className={cn("rounded-sm", className)}
      data-slot="command-trigger"
      {...props}
    />
  );
}

function CommandContent({
  className,
  positionerProps,
  children,
  ...props
}: BaseAutocomplete.Popup.Props & {
  positionerProps?: BaseAutocomplete.Positioner.Props;
}) {
  const { getAnchor } = useCommandContext();

  return (
    <BaseAutocomplete.Portal>
      <BaseAutocomplete.Positioner
        align="start"
        anchor={getAnchor}
        side="top"
        sideOffset={8}
        {...positionerProps}
        className={cn(
          "z-50 w-(--anchor-width) outline-none select-none",
          positionerProps?.className,
        )}
      >
        <BaseAutocomplete.Popup
          className={cn(
            "group flex max-h-[min(var(--available-height),20rem)] origin-bottom flex-col overflow-hidden rounded-xl bg-popover text-popover-foreground shadow-lg outline outline-border transition-[transform,scale,opacity] data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0 data-[side=bottom]:origin-top dark:shadow-none",
            className,
          )}
          data-slot="command-popup"
          {...props}
        >
          <ScrollArea
            className="flex min-h-0 flex-1 flex-col"
            viewportProps={{ className: "min-h-0 flex-1 p-1.5" }}
            scrollBarProps={{ className: "my-2" }}
          >
            {children}
          </ScrollArea>
        </BaseAutocomplete.Popup>
      </BaseAutocomplete.Positioner>
    </BaseAutocomplete.Portal>
  );
}

function CommandList({ className, children, ...props }: BaseAutocomplete.List.Props) {
  return (
    <BaseAutocomplete.List
      className={cn("flex flex-col", className)}
      data-slot="command-list"
      {...props}
    >
      {children}
    </BaseAutocomplete.List>
  );
}

function CommandItem({ className, children, onClick, ...props }: BaseAutocomplete.Item.Props) {
  const { stageSelection } = useCommandContext();

  return (
    <BaseAutocomplete.Item
      className={cn(
        "group flex cursor-default items-center gap-2 rounded-lg p-2 text-sm leading-4 outline-none select-none data-disabled:pointer-events-none data-disabled:cursor-not-allowed data-disabled:opacity-50 data-highlighted:bg-primary data-highlighted:text-primary-foreground pointer-coarse:py-2.5 pointer-coarse:text-[0.925rem]",
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground data-highlighted:[&_svg:not([class*='text-'])]:text-primary-foreground",
        className,
      )}
      data-slot="command-item"
      onClick={(event) => {
        onClick?.(event);
        stageSelection(props.value);
      }}
      {...props}
    >
      {children}
    </BaseAutocomplete.Item>
  );
}

function CommandItemLabel({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      className={cn("truncate font-medium", className)}
      data-slot="command-item-label"
      {...props}
    />
  );
}

function CommandItemDescription({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "truncate text-muted-foreground group-data-highlighted:text-primary-foreground/70",
        className,
      )}
      data-slot="command-item-description"
      {...props}
    />
  );
}

function CommandShortcut({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "ml-auto flex shrink-0 items-center gap-1 text-xs text-muted-foreground group-data-highlighted:text-primary-foreground/70",
        className,
      )}
      data-slot="command-shortcut"
      {...props}
    />
  );
}

function CommandEmpty({ className, children, ...props }: BaseAutocomplete.Empty.Props) {
  return (
    <BaseAutocomplete.Empty
      className={cn("px-2.5 py-2 text-sm text-muted-foreground empty:m-0 empty:p-0", className)}
      data-slot="command-empty"
      {...props}
    >
      {children}
    </BaseAutocomplete.Empty>
  );
}

function CommandStatus({ className, children, ...props }: BaseAutocomplete.Status.Props) {
  return (
    <BaseAutocomplete.Status
      className={cn("px-2.5 py-2 text-sm text-muted-foreground empty:m-0 empty:p-0", className)}
      data-slot="command-status"
      {...props}
    >
      {children}
    </BaseAutocomplete.Status>
  );
}

function CommandSeparator({ className, ...props }: BaseAutocomplete.Separator.Props) {
  return (
    <BaseAutocomplete.Separator
      className={cn("-mx-1.5 my-1.5 h-px bg-border", className)}
      data-slot="command-separator"
      {...props}
    />
  );
}

function CommandGroup({ className, ...props }: BaseAutocomplete.Group.Props) {
  return (
    <BaseAutocomplete.Group
      className={cn("flex flex-col", className)}
      data-slot="command-group"
      {...props}
    />
  );
}

function CommandGroupLabel({ className, ...props }: BaseAutocomplete.GroupLabel.Props) {
  return (
    <BaseAutocomplete.GroupLabel
      className={cn("px-2 py-1.5 text-xs font-medium text-muted-foreground select-none", className)}
      data-slot="command-group-label"
      {...props}
    />
  );
}

const CommandCollection = BaseAutocomplete.Collection;
const CommandRow = BaseAutocomplete.Row;

export {
  Command,
  CommandInput,
  CommandTrigger,
  CommandContent,
  CommandList,
  CommandItem,
  CommandItemLabel,
  CommandItemDescription,
  CommandShortcut,
  CommandEmpty,
  CommandStatus,
  CommandSeparator,
  CommandGroup,
  CommandGroupLabel,
  CommandCollection,
  CommandRow,
  createCommandTrigger,
  useCommand,
};
export type {
  CommandProps,
  CommandInputProps,
  CommandFilter,
  CommandSelectDetails,
  CommandTriggerMatch,
  CommandTriggerMatcher,
  CreateCommandTriggerOptions,
};
