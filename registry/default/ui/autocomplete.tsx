import { Autocomplete as BaseAutocomplete } from "@base-ui/react";
import { cn } from "@/lib/utils";
import { CaretUpDownIcon, XIcon } from "@phosphor-icons/react";

const Autocomplete = BaseAutocomplete.Root;

function AutocompleteValue({ ...props }: BaseAutocomplete.Value.Props) {
  return <BaseAutocomplete.Value data-slot="autocomplete-value" {...props} />;
}

function AutocompleteInputGroup({ className, ...props }: BaseAutocomplete.InputGroup.Props) {
  return (
    <BaseAutocomplete.InputGroup
      className={cn(
        "flex min-h-9 items-center gap-1 rounded-lg border border-input py-2 pr-2 pl-3 text-sm text-foreground hover:border-accent",
        "has-data-[slot=autocomplete-input-addon]:pl-2",
        "focus-within:border-accent focus-within:ring-[3px] focus-within:ring-ring",
        "bg-gray-950/5 dark:bg-gray-950/30",
        "transition-all duration-150",
        className,
      )}
      data-slot="autocomplete-input-group"
      {...props}
    />
  );
}

function AutocompleteInput({ className, ...props }: BaseAutocomplete.Input.Props) {
  return (
    <BaseAutocomplete.Input
      className={cn("w-full leading-4 outline-none", className)}
      data-slot="autocomplete-input"
      {...props}
    />
  );
}

function AutocompleteInputAddon({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "flex shrink-0 items-center text-muted-foreground select-none [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      data-slot="autocomplete-input-addon"
      {...props}
    />
  );
}

function AutocompleteTrigger({ children, className, ...props }: BaseAutocomplete.Trigger.Props) {
  return (
    <BaseAutocomplete.Trigger
      className={cn(
        "flex shrink-0 cursor-default items-center rounded p-0.5 text-muted-foreground transition-colors hover:text-foreground",
        className,
      )}
      data-slot="autocomplete-trigger"
      {...props}
    >
      {children ?? <CaretUpDownIcon className="size-4" />}
    </BaseAutocomplete.Trigger>
  );
}

function AutocompleteClear({ children, className, ...props }: BaseAutocomplete.Clear.Props) {
  return (
    <BaseAutocomplete.Clear
      className={cn(
        "flex shrink-0 cursor-default items-center rounded p-0.5 text-muted-foreground transition-colors hover:text-foreground data-[empty]:invisible",
        className,
      )}
      data-slot="autocomplete-clear"
      {...props}
    >
      {children ?? <XIcon className="size-4" />}
    </BaseAutocomplete.Clear>
  );
}

function AutocompleteContent({
  className,
  positionerProps,
  children,
  ...props
}: BaseAutocomplete.Popup.Props & {
  positionerProps?: BaseAutocomplete.Positioner.Props;
}) {
  return (
    <BaseAutocomplete.Portal>
      <BaseAutocomplete.Positioner
        className={cn(
          "z-10 min-w-(--anchor-width) outline-none select-none",
          positionerProps?.className,
        )}
        sideOffset={8}
        {...positionerProps}
      >
        <BaseAutocomplete.Popup
          className={cn(
            "group max-h-(--available-height) origin-(--transform-origin) overflow-y-auto rounded-xl bg-popover p-1.5 text-popover-foreground shadow-lg outline outline-border transition-[transform,scale,opacity] data-ending-style:scale-90 data-ending-style:opacity-0 data-starting-style:scale-90 data-starting-style:opacity-0 dark:shadow-none",
            className,
          )}
          data-slot="autocomplete-popup"
          {...props}
        >
          {children}
        </BaseAutocomplete.Popup>
      </BaseAutocomplete.Positioner>
    </BaseAutocomplete.Portal>
  );
}

function AutocompleteList({ className, children, ...props }: BaseAutocomplete.List.Props) {
  return (
    <BaseAutocomplete.List
      className={cn("flex flex-col", className)}
      data-slot="autocomplete-list"
      {...props}
    >
      {children}
    </BaseAutocomplete.List>
  );
}

function AutocompleteItem({ className, children, ...props }: BaseAutocomplete.Item.Props) {
  return (
    <BaseAutocomplete.Item
      className={cn(
        "flex cursor-default items-center gap-2 rounded-lg p-2 text-sm leading-4 outline-none select-none data-disabled:pointer-events-none data-disabled:cursor-not-allowed data-disabled:opacity-50 data-highlighted:bg-primary data-highlighted:text-primary-foreground pointer-coarse:py-2.5 pointer-coarse:text-[0.925rem]",
        className,
      )}
      data-slot="autocomplete-item"
      {...props}
    >
      {children}
    </BaseAutocomplete.Item>
  );
}

function AutocompleteEmpty({ className, children, ...props }: BaseAutocomplete.Empty.Props) {
  return (
    <BaseAutocomplete.Empty
      className={cn("px-2.5 py-2 text-sm text-muted-foreground empty:m-0 empty:p-0", className)}
      data-slot="autocomplete-empty"
      {...props}
    >
      {children}
    </BaseAutocomplete.Empty>
  );
}

function AutocompleteStatus({ className, children, ...props }: BaseAutocomplete.Status.Props) {
  return (
    <BaseAutocomplete.Status
      className={cn("px-2.5 py-2 text-sm text-muted-foreground empty:m-0 empty:p-0", className)}
      data-slot="autocomplete-status"
      {...props}
    >
      {children}
    </BaseAutocomplete.Status>
  );
}

function AutocompleteSeparator(props: BaseAutocomplete.Separator.Props) {
  return (
    <BaseAutocomplete.Separator
      className="-mx-1.5 my-1.5 h-px bg-border"
      data-slot="autocomplete-separator"
      {...props}
    />
  );
}

function AutocompleteGroup({ className, ...props }: BaseAutocomplete.Group.Props) {
  return (
    <BaseAutocomplete.Group
      className={cn("flex flex-col", className)}
      data-slot="autocomplete-group"
      {...props}
    />
  );
}

function AutocompleteGroupLabel({ className, ...props }: BaseAutocomplete.GroupLabel.Props) {
  return (
    <BaseAutocomplete.GroupLabel
      className={cn("px-2 py-1.5 text-xs font-medium text-muted-foreground select-none", className)}
      data-slot="autocomplete-group-label"
      {...props}
    />
  );
}

const AutocompleteCollection = BaseAutocomplete.Collection;
const AutocompleteRow = BaseAutocomplete.Row;

export {
  Autocomplete,
  AutocompleteValue,
  AutocompleteInputGroup,
  AutocompleteInput,
  AutocompleteInputAddon,
  AutocompleteTrigger,
  AutocompleteClear,
  AutocompleteContent,
  AutocompleteList,
  AutocompleteItem,
  AutocompleteEmpty,
  AutocompleteStatus,
  AutocompleteSeparator,
  AutocompleteGroup,
  AutocompleteGroupLabel,
  AutocompleteCollection,
  AutocompleteRow,
};
