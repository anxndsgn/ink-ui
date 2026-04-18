import { Input as BaseInput } from "@base-ui/react/input";
import { cn } from "@registry/lib/utils";
import { cva } from "class-variance-authority";
import type { VariantProps } from "class-variance-authority";

const inputVariants = cva(
  "min-h-9 rounded-lg border border-transparent pl-3.5 text-base text-foreground transition-all duration-150 not-disabled:hover:border-accent focus-visible:border-accent focus-visible:ring-[3px] focus-visible:ring-ring focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
  {
    defaultVariants: {
      variant: "default",
    },
    variants: {
      variant: {
        default: "border-input bg-gray-950/5 dark:bg-gray-950/30",
        outline: "border-input",
      },
    },
  },
);

export function Input({
  variant,
  className,
  block = true,
  ...props
}: BaseInput.Props &
  VariantProps<typeof inputVariants> & {
    block?: boolean;
  }) {
  return (
    <BaseInput
      className={cn(inputVariants({ className, variant }), block ? "w-full" : "max-w-60")}
      data-slot="input"
      {...props}
    />
  );
}
