import { mergeProps, useRender } from "@base-ui/react";
import { Dialog as BaseDialog } from "@base-ui/react/dialog";
import { cn } from "@registry/lib/utils";
import { XIcon } from "@phosphor-icons/react";

import { Button } from "./button";

const Dialog = (props: BaseDialog.Root.Props) => <BaseDialog.Root data-slot="dialog" {...props} />;
const DialogPortal = (props: BaseDialog.Portal.Props) => (
  <BaseDialog.Portal data-slot="dialog-portal" {...props} />
);
const DialogClose = (props: BaseDialog.Close.Props) => (
  <BaseDialog.Close data-slot="dialog-close" {...props} />
);

function DialogTrigger(props: BaseDialog.Trigger.Props) {
  return <BaseDialog.Trigger data-slot="dialog-trigger" {...props} />;
}

const createDialogHandle = BaseDialog.createHandle;

function DialogBackdrop({ className, ...props }: BaseDialog.Backdrop.Props) {
  return (
    <BaseDialog.Backdrop
      className={cn(
        "fixed inset-0 bg-black/30 backdrop-blur-md transition-all duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0",
        className,
      )}
      data-slot="dialog-backdrop"
      {...props}
    />
  );
}

function DialogTitle(props: BaseDialog.Title.Props) {
  return <BaseDialog.Title className="text-lg font-bold" data-slot="dialog-title" {...props} />;
}

function DialogDescription({ className, ...props }: BaseDialog.Description.Props) {
  return (
    <BaseDialog.Description
      className={cn("text-sm text-muted-foreground", className)}
      data-slot="dialog-description"
      {...props}
    />
  );
}

function DialogContent({
  className,
  children,
  dialogPortalProps,
  dialogBackdropProps,
  ...props
}: BaseDialog.Popup.Props & {
  dialogPortalProps?: BaseDialog.Portal.Props;
  dialogBackdropProps?: BaseDialog.Backdrop.Props;
}) {
  return (
    <BaseDialog.Portal {...dialogPortalProps}>
      <DialogBackdrop {...dialogBackdropProps} />
      <BaseDialog.Popup
        className={cn(
          "fixed top-1/2 left-1/2 -mt-8 flex w-96 max-w-[calc(100vw-3rem)] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-3xl bg-dialog text-dialog-foreground shadow-xs transition-all duration-150 data-ending-style:scale-90 data-ending-style:opacity-0 data-starting-style:scale-90 data-starting-style:opacity-0",
          className,
        )}
        data-slot="dialog-popup"
        {...props}
      >
        {children}
      </BaseDialog.Popup>
    </BaseDialog.Portal>
  );
}

function DialogHeader({
  className,
  children,
  closeButton = true,
}: {
  className?: string;
  closeButton?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <div className={cn("relative flex flex-col p-6", className)} data-slot="dialog-header">
      {closeButton && (
        <DialogClose
          className="absolute top-4 right-4"
          render={<Button className="size-5" size="icon" variant="secondary" />}
        >
          <XIcon className="size-3" />
        </DialogClose>
      )}

      {children}
    </div>
  );
}

function DialogBody({ className, ...props }: useRender.ComponentProps<"div">) {
  const dialogBodyElement = useRender({
    defaultTagName: "div",
    props: {
      ...mergeProps<"div">(props, {
        className: cn("flex flex-col gap-3 px-6 pb-6", className),
      }),
      "data-slot": "dialog-body",
    },
  });
  return dialogBodyElement;
}

function DialogFooter({
  children,
  direction = "column",
  className,
}: {
  children: React.ReactNode;
  direction?: "row" | "column";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex gap-2 border-t border-border bg-muted p-6",
        direction === "row" && "flex-row justify-end",
        direction === "column" && "flex-col",
        className,
      )}
      data-slot="dialog-footer"
    >
      {children}
    </div>
  );
}

export {
  Dialog,
  DialogBackdrop,
  DialogTrigger,
  DialogPortal,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogBody,
  DialogHeader,
  createDialogHandle,
};
