import { Checkbox as BaseCheckbox } from "@base-ui/react/checkbox";
import { CheckboxGroup as BaseCheckboxGroup } from "@base-ui/react/checkbox-group";
import { cn } from "@registry/lib/utils";
import { CheckIcon, MinusIcon } from "@phosphor-icons/react/dist/ssr";

function CheckboxGroup({ className, ...props }: BaseCheckboxGroup.Props) {
  return (
    <BaseCheckboxGroup
      className={cn("flex flex-col gap-2", className)}
      data-slot="checkbox-group"
      {...props}
    />
  );
}

function Checkbox({ className, ...props }: BaseCheckbox.Root.Props) {
  return (
    <BaseCheckbox.Root
      className={cn(
        "data-disabled:pointer-not-allowed relative inline-flex size-4.5 shrink-0 items-center justify-center rounded-sm border border-input bg-muted ring-ring outline-none not-dark:bg-clip-padding before:pointer-events-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-offset-background aria-invalid:border-destructive/36 focus-visible:aria-invalid:border-destructive/64 focus-visible:aria-invalid:ring-destructive/48 data-disabled:opacity-50 sm:size-4 dark:not-data-checked:bg-gray-950/32 dark:aria-invalid:ring-destructive/24",
        className,
      )}
      data-slot="checkbox"
      {...props}
    >
      <BaseCheckbox.Indicator
        className="absolute -inset-px flex items-center justify-center rounded-sm border border-black/10 text-accent-foreground data-checked:bg-accent data-indeterminate:bg-accent data-unchecked:hidden"
        data-slot="checkbox-indicator"
        render={(props, state) => (
          <span {...props}>
            {state.indeterminate ? (
              <MinusIcon className="size-3.5 sm:size-3" />
            ) : (
              <CheckIcon className="size-3.5 sm:size-3" />
            )}
          </span>
        )}
      />
    </BaseCheckbox.Root>
  );
}

export { CheckboxGroup, Checkbox };
