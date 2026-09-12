import { Input as BaseInput } from "@base-ui/react/input";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import type { VariantProps } from "class-variance-authority";

const inputVariants = cva(
  "min-h-9 rounded-lg border-0 pl-3 text-base text-foreground inset-ring-1 inset-ring-border transition-all duration-150 not-disabled:hover:inset-ring-accent focus-visible:ring-[3px] focus-visible:ring-ring focus-visible:inset-ring-accent focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
  {
    defaultVariants: {
      variant: "default",
    },
    variants: {
      variant: {
        default: "bg-field",
        outline: "",
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
