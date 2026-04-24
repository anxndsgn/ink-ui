import { cn } from "@registry/lib/utils";
import { cva } from "class-variance-authority";
import type { VariantProps } from "class-variance-authority";

const textareaVariants = cva(
  "resize-none rounded-lg border border-transparent px-3.5 py-2.5 text-base text-foreground transition-all duration-150 not-disabled:hover:border-accent focus-visible:border-accent focus-visible:ring-[3px] focus-visible:ring-ring focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
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

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>, VariantProps<typeof textareaVariants> {
  block?: boolean;
}

export function Textarea({ variant, className, block = true, ...props }: TextareaProps) {
  return (
    <textarea
      className={cn(textareaVariants({ className, variant }), block ? "w-full" : "max-w-60")}
      {...props}
    />
  );
}
