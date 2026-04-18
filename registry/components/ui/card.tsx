import { mergeProps, useRender } from "@base-ui/react";
import { cn } from "@registry/lib/utils";

function Card({ className, ...props }: useRender.ComponentProps<"div">) {
  const cardElement = useRender({
    defaultTagName: "div",
    props: {
      ...mergeProps<"div">(props, {
        className: cn(
          "relative flex flex-col rounded-3xl border border-transparent bg-card p-1 dark:border-border",
          className,
        ),
      }),
      "data-slot": "card",
    },
  });
  return cardElement;
}

function CardHeader({ className, ...props }: useRender.ComponentProps<"div">) {
  const cardHeaderElement = useRender({
    defaultTagName: "div",
    props: {
      ...mergeProps<"div">(props, {
        className: cn(
          "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 p-5 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
          className,
        ),
      }),
      "data-slot": "card-header",
    },
  });
  return cardHeaderElement;
}

function CardTitle({ className, ...props }: useRender.ComponentProps<"div">) {
  const cardTitleElement = useRender({
    defaultTagName: "div",
    props: {
      ...mergeProps<"div">(props, {
        className: cn("text-lg leading-none font-semibold", className),
      }),
      "data-slot": "card-title",
    },
  });
  return cardTitleElement;
}

function CardDescription({ className, ...props }: useRender.ComponentProps<"div">) {
  const cardDescriptionElement = useRender({
    defaultTagName: "div",
    props: {
      ...mergeProps<"div">(props, {
        className: cn("text-sm text-muted-foreground", className),
      }),
      "data-slot": "card-description",
    },
  });
  return cardDescriptionElement;
}

function CardAction({ className, ...props }: useRender.ComponentProps<"div">) {
  const cardActionElement = useRender({
    defaultTagName: "div",
    props: {
      ...mergeProps<"div">(props, {
        className: cn("col-start-2 row-span-2 row-start-1 self-start justify-self-end", className),
      }),
      "data-slot": "card-action",
    },
  });
  return cardActionElement;
}

function CardPanel({ className, children, ...props }: useRender.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "w-full rounded-[calc(var(--radius-3xl)-var(--spacing))] border border-border bg-popover p-5",
        className,
      )}
      data-slot="card-panel"
      {...props}
    >
      {children}
    </div>
  );
}

function CardFooter({
  className,
  direction = "row",
  ...props
}: useRender.ComponentProps<"div"> & { direction?: "row" | "column" }) {
  const cardFooterElement = useRender({
    defaultTagName: "div",
    props: {
      ...mergeProps<"div">(props, {
        className: cn(
          "flex items-center gap-2 p-5 [.border-t]:pt-5",
          direction === "row" && "flex-row justify-end",
          direction === "column" && "flex-col",
          className,
        ),
      }),
      "data-slot": "card-footer",
    },
  });
  return cardFooterElement;
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardPanel,
  CardPanel as CardContent,
  CardPanel as CardBody,
};
