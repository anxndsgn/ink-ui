import { mergeProps, useRender } from "@base-ui/react";
import { cn } from "@registry/lib/utils";
import { cva } from "class-variance-authority";
import type { VariantProps } from "class-variance-authority";

const tagVariants = cva(
  "font-regular inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-md border px-2 text-xs whitespace-nowrap select-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3",
  {
    defaultVariants: {
      size: "default",
      variant: "default",
    },
    variants: {
      size: {
        default: "h-6",
        sm: "px-1 py-0",
        lg: "px-3 py-1.5",
      },
      variant: {
        default: "border-transparent bg-accent text-accent-foreground [a&]:hover:bg-accent/90",
        outline:
          "border-input bg-muted text-muted-foreground group-data-highlighted:border-primary group-data-highlighted:bg-primary group-data-highlighted:text-primary-foreground",
        secondary: "border-transparent bg-accent/30 text-accent [a&]:hover:bg-accent/40",
      },
    },
  },
);

interface TagProps extends useRender.ComponentProps<"span">, VariantProps<typeof tagVariants> {}

function Tag({ variant, render, className, size, ...props }: TagProps) {
  const tagElement = useRender({
    defaultTagName: "span",
    props: {
      ...mergeProps<"span">(props, {
        className: cn(tagVariants({ className, size, variant })),
      }),
      "data-slot": "tag",
    },
    render,
  });
  return tagElement;
}

export { Tag, tagVariants };
