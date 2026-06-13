import { AlertDialog as BaseAlertDialog } from "@base-ui/react/alert-dialog";
import { cn } from "@/lib/utils";

const createAlertDialogHandle = BaseAlertDialog.createHandle;

function AlertDialog(props: BaseAlertDialog.Root.Props) {
  return <BaseAlertDialog.Root data-slot="alert-dialog" {...props} />;
}

function AlertDialogTrigger(props: BaseAlertDialog.Trigger.Props) {
  return <BaseAlertDialog.Trigger data-slot="alert-dialog-trigger" {...props} />;
}

function AlertDialogPortal(props: BaseAlertDialog.Portal.Props) {
  return <BaseAlertDialog.Portal {...props} />;
}

function AlertDialogBackdrop({ className, ...props }: BaseAlertDialog.Backdrop.Props) {
  return (
    <BaseAlertDialog.Backdrop
      className={cn(
        "fixed inset-0 z-50 bg-black/30 backdrop-blur-sm transition-all duration-200 ease-out data-ending-style:opacity-0 data-starting-style:opacity-0",
        className,
      )}
      data-slot="alert-dialog-backdrop"
      {...props}
    />
  );
}

function AlertDialogPopup({ className, ...props }: BaseAlertDialog.Popup.Props) {
  return (
    <AlertDialogPortal>
      <AlertDialogBackdrop />

      <BaseAlertDialog.Popup
        className={cn(
          "fixed top-1/2 left-1/2 z-50 flex w-96 max-w-[calc(100vw-3rem)] -translate-x-1/2 -translate-y-[calc(50%+2rem*var(--nested-dialogs))] flex-col overflow-hidden rounded-3xl bg-dialog text-dialog-foreground shadow-xs ring ring-border",
          "transition-all duration-200 ease-[cubic-bezier(.22,1,.36,1)] will-change-transform",
          "scale-[calc(1-0.1*var(--nested-dialogs))] opacity-[calc(1-min(var(--nested-dialogs),1))]",
          "data-starting-style:translate-y-[calc(-50%+1.5rem)] data-starting-style:scale-90 data-starting-style:opacity-0",
          "data-ending-style:translate-y-[calc(-50%+1.5rem)] data-ending-style:scale-90 data-ending-style:opacity-0",
          className,
        )}
        data-slot="alert-dialog-popup"
        {...props}
      />
    </AlertDialogPortal>
  );
}

function AlertDialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("flex flex-col gap-2 p-6 text-center sm:text-left", className)}
      data-slot="alert-dialog-header"
      {...props}
    />
  );
}

function AlertDialogFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex flex-col-reverse gap-2 border-t border-border bg-muted p-6 sm:flex-row sm:justify-end",
        className,
      )}
      data-slot="alert-dialog-footer"
      {...props}
    />
  );
}

function AlertDialogTitle({ className, ...props }: BaseAlertDialog.Title.Props) {
  return (
    <BaseAlertDialog.Title
      className={cn("text-lg font-semibold", className)}
      data-slot="alert-dialog-title"
      {...props}
    />
  );
}

function AlertDialogDescription({ className, ...props }: BaseAlertDialog.Description.Props) {
  return (
    <BaseAlertDialog.Description
      className={cn("p-6 pt-0 text-muted-foreground", className)}
      data-slot="alert-dialog-description"
      {...props}
    />
  );
}

function AlertDialogClose({ className, ...props }: BaseAlertDialog.Close.Props) {
  return (
    <BaseAlertDialog.Close
      data-slot="alert-dialog-close"
      className={cn("in-data-nested-dialog-open:hidden", className)}
      {...props}
    />
  );
}

export {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogClose,
  AlertDialogPopup as AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogBackdrop as AlertDialogOverlay,
  AlertDialogPopup,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger,
  createAlertDialogHandle,
};
