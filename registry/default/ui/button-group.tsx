import { mergeProps, useRender } from "@base-ui/react";
import { Separator } from "./separator";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import type { ComponentProps } from "react";
import type { VariantProps } from "class-variance-authority";

const buttonGroupVariants = cva(
  "flex w-fit items-stretch has-[>[data-slot=button-group]]:gap-2 [&>*]:focus-visible:relative [&>*]:focus-visible:z-10 [&>[data-slot=select-trigger]:not([class*='w-'])]:w-fit [&>input]:flex-1 [&>input]:not-disabled:hover:relative [&>input]:not-disabled:hover:z-10",
  {
    defaultVariants: {
      orientation: "horizontal",
    },
    variants: {
      orientation: {
        horizontal:
          "[&>*:has(+input)]:border-r-0 [&>*:not(:first-child)]:rounded-l-none [&>*:not(:first-child)]:border-l-0 [&>*:not(:last-child)]:rounded-r-none",
        vertical:
          "flex-col [&>*:has(+input)]:border-b-0 [&>*:not(:first-child)]:rounded-t-none [&>*:not(:first-child)]:border-t-0 [&>*:not(:last-child)]:rounded-b-none",
      },
    },
  },
);

function ButtonGroup({
  className,
  orientation = "horizontal",
  ...props
}: ComponentProps<"div"> & VariantProps<typeof buttonGroupVariants>) {
  return (
    <div
      className={cn(buttonGroupVariants({ orientation }), className)}
      data-orientation={orientation}
      data-slot="button-group"
      role="group"
      {...props}
    />
  );
}

function ButtonGroupText({ className, render, ...props }: useRender.ComponentProps<"div">) {
  return useRender({
    defaultTagName: "div",
    props: {
      ...mergeProps<"div">(props, {
        className: cn(
          "flex items-center gap-2 rounded-lg border border-border bg-muted px-4 text-sm font-medium text-foreground [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
          className,
        ),
      }),
      "data-slot": "button-group-text",
    },
    render,
  });
}

function ButtonGroupSeparator({
  className,
  orientation = "vertical",
  ...props
}: ComponentProps<typeof Separator>) {
  return (
    <Separator
      className={cn(
        "relative m-0! self-stretch bg-primary/80 data-[orientation=vertical]:h-auto",
        className,
      )}
      data-slot="button-group-separator"
      orientation={orientation}
      {...props}
    />
  );
}

export { ButtonGroup, ButtonGroupSeparator, ButtonGroupText, buttonGroupVariants };
