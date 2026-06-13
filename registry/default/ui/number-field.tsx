import { NumberField as BaseNumberField } from "@base-ui/react";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import type { VariantProps } from "class-variance-authority";
import { MinusIcon, PlusIcon } from "@phosphor-icons/react";

const NumberField = BaseNumberField.Root;

const numberFieldGroupVariants = cva(
  "flex w-full min-w-0 items-center overflow-visible rounded-lg bg-gray-950/5 text-foreground data-disabled:cursor-not-allowed data-disabled:opacity-50 dark:bg-gray-950/30",
  {
    defaultVariants: {
      size: "default",
    },
    variants: {
      size: {
        sm: "h-8 text-sm",
        default: "h-9 text-sm",
        lg: "h-10 text-base",
      },
    },
  },
);

function NumberFieldGroup({
  className,
  size,
  ...props
}: BaseNumberField.Group.Props & VariantProps<typeof numberFieldGroupVariants>) {
  return (
    <BaseNumberField.Group
      className={cn(numberFieldGroupVariants({ size }), className)}
      data-slot="number-field-group"
      {...props}
    />
  );
}

function NumberFieldInput({ className, ...props }: BaseNumberField.Input.Props) {
  return (
    <BaseNumberField.Input
      className={cn(
        "z-10 h-full min-w-0 flex-1 border border-input bg-transparent px-3 text-center tabular-nums transition-all duration-150 outline-none placeholder:text-muted-foreground not-data-disabled:hover:border-accent focus-visible:border-accent focus-visible:ring-[3px] focus-visible:ring-ring disabled:cursor-not-allowed",
        className,
      )}
      data-slot="number-field-input"
      {...props}
    />
  );
}

const numberFieldStepperClassName =
  "flex h-full shrink-0 bg-background cursor-default items-center justify-center self-stretch px-2.5 text-muted-foreground not-data-disabled:hover:bg-background-hover not-data-disabled:hover:text-foreground data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:size-4 border border-input";

function NumberFieldDecrement({ children, className, ...props }: BaseNumberField.Decrement.Props) {
  return (
    <BaseNumberField.Decrement
      className={cn(
        numberFieldStepperClassName,
        "rounded-l-lg rounded-r-none border-r-0",
        className,
      )}
      data-slot="number-field-decrement"
      aria-label="Decrease"
      {...props}
    >
      {children ?? <MinusIcon />}
    </BaseNumberField.Decrement>
  );
}

function NumberFieldIncrement({ children, className, ...props }: BaseNumberField.Increment.Props) {
  return (
    <BaseNumberField.Increment
      className={cn(
        numberFieldStepperClassName,
        "rounded-l-none rounded-r-lg border-l-0",
        className,
      )}
      data-slot="number-field-increment"
      aria-label="Increase"
      {...props}
    >
      {children ?? <PlusIcon />}
    </BaseNumberField.Increment>
  );
}

function NumberFieldScrubArea({ className, ...props }: BaseNumberField.ScrubArea.Props) {
  return (
    <BaseNumberField.ScrubArea
      className={cn("cursor-ew-resize select-none", className)}
      data-slot="number-field-scrub-area"
      {...props}
    />
  );
}

function NumberFieldScrubAreaCursor({
  className,
  ...props
}: BaseNumberField.ScrubAreaCursor.Props) {
  return (
    <BaseNumberField.ScrubAreaCursor
      className={cn("drop-shadow-sm", className)}
      data-slot="number-field-scrub-area-cursor"
      {...props}
    />
  );
}

export {
  NumberField,
  NumberFieldGroup,
  NumberFieldInput,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldScrubArea,
  NumberFieldScrubAreaCursor,
};
