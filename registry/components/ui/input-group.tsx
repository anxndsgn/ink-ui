import { Button } from "@registry/components/ui/button";
import { Input } from "@registry/components/ui/input";
import { Textarea } from "@registry/components/ui/textarea";
import { cn } from "@registry/lib/utils";
import { cva } from "class-variance-authority";
import type { ComponentProps } from "react";
import type { VariantProps } from "class-variance-authority";

function InputGroup({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "group/input-group relative flex min-h-9 w-full min-w-0 items-center rounded-lg border border-input bg-gray-950/5 text-foreground transition-all duration-150 outline-none dark:bg-gray-950/30",
        "has-[>textarea]:h-auto",
        "has-[>[data-align=inline-start]]:*:data-[slot=input-group-control]:pl-2",
        "has-[>[data-align=inline-end]]:*:data-[slot=input-group-control]:pr-2",
        "has-[>[data-align=block-start]]:h-auto has-[>[data-align=block-start]]:flex-col has-[>[data-align=block-start]]:*:data-[slot=input-group-control]:pb-3",
        "has-[>[data-align=block-end]]:h-auto has-[>[data-align=block-end]]:flex-col has-[>[data-align=block-end]]:*:data-[slot=input-group-control]:pt-3",
        "has-[[data-slot=input-group-control]:focus-visible]:border-accent has-[[data-slot=input-group-control]:focus-visible]:ring-[3px] has-[[data-slot=input-group-control]:focus-visible]:ring-ring",
        "has-[[data-slot=input-group-control][aria-invalid=true]]:border-destructive has-[[data-slot=input-group-control][aria-invalid=true]]:ring-destructive/20 dark:has-[[data-slot=input-group-control][aria-invalid=true]]:ring-destructive/40",
        "has-[[data-slot=input-group-control]:disabled]:cursor-not-allowed has-[[data-slot=input-group-control]:disabled]:opacity-50",
        className,
      )}
      data-slot="input-group"
      role="group"
      {...props}
    />
  );
}

const inputGroupAddonVariants = cva(
  "flex h-auto cursor-text items-center justify-center gap-2 py-1.5 text-sm text-muted-foreground select-none group-has-[[data-slot=input-group-control]:disabled]/input-group:pointer-events-none [&>svg]:pointer-events-none [&>svg:not([class*='size-'])]:size-4",
  {
    defaultVariants: {
      align: "inline-start",
    },
    variants: {
      align: {
        "block-end": "order-last w-full justify-start px-3 pb-3 [.border-t]:pt-3",
        "block-start": "order-first w-full justify-start px-3 pt-3 [.border-b]:pb-3",
        "inline-end": "order-last pr-3 has-[>button]:mr-[-0.35rem]",
        "inline-start": "order-first pl-3 has-[>button]:ml-[-0.35rem]",
      },
    },
  },
);

function InputGroupAddon({
  align = "inline-start",
  className,
  onMouseDown,
  ...props
}: ComponentProps<"div"> & VariantProps<typeof inputGroupAddonVariants>) {
  return (
    <div
      className={cn(inputGroupAddonVariants({ align }), className)}
      data-align={align}
      data-slot="input-group-addon"
      onMouseDown={(event) => {
        onMouseDown?.(event);

        const target = event.target;

        if (!(target instanceof HTMLElement) || !event.currentTarget.contains(target)) {
          return;
        }

        if (event.defaultPrevented || target.closest("button")) {
          return;
        }

        event.preventDefault();
        event.currentTarget.parentElement
          ?.querySelector<HTMLElement>("[data-slot='input-group-control']")
          ?.focus();
      }}
      role="group"
      {...props}
    />
  );
}

const inputGroupButtonVariants = cva("h-7 gap-1.5 rounded-lg px-2 text-sm shadow-none", {
  defaultVariants: {
    size: "xs",
  },
  variants: {
    size: {
      "icon-sm": "size-8 p-0 has-[>svg]:p-0",
      "icon-xs": "size-7 p-0 has-[>svg]:p-0",
      sm: "h-8 px-2.5 has-[>svg]:px-2.5",
      xs: "h-7 px-2 has-[>svg]:px-2",
    },
  },
});

function InputGroupButton({
  className,
  size = "xs",
  type = "button",
  variant = "ghost",
  ...props
}: Omit<ComponentProps<typeof Button>, "size"> & VariantProps<typeof inputGroupButtonVariants>) {
  return (
    <Button
      className={cn(inputGroupButtonVariants({ size }), className)}
      data-size={size}
      size={size === "sm" || size === "icon-sm" ? "sm" : "icon-sm"}
      type={type}
      variant={variant}
      {...props}
    />
  );
}

function InputGroupText({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "flex items-center gap-2 text-sm text-muted-foreground [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      data-slot="input-group-text"
      {...props}
    />
  );
}

type InputGroupInputProps = Omit<ComponentProps<typeof Input>, "block" | "variant">;

function InputGroupInput({ className, ...props }: InputGroupInputProps) {
  return (
    <Input
      block
      className={cn(
        "min-h-9 min-w-0 flex-1 rounded-none border-0 bg-transparent px-3.5 outline-none focus-visible:border-transparent focus-visible:ring-0 dark:bg-transparent",
        className,
      )}
      data-slot="input-group-control"
      {...props}
    />
  );
}

function InputGroupTextarea({ className, ...props }: ComponentProps<typeof Textarea>) {
  return (
    <Textarea
      className={cn(
        "min-h-24 min-w-0 flex-1 rounded-none border-0 bg-transparent py-3 outline-none focus-visible:border-transparent focus-visible:ring-0 dark:bg-transparent",
        className,
      )}
      data-slot="input-group-control"
      {...props}
    />
  );
}

export {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupInput,
  InputGroupTextarea,
};
