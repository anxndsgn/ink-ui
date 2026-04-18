import { AlertDialog as BaseAlertDialog } from "@base-ui/react/alert-dialog";
import { Button } from "./button";
import { cn } from "@registry/lib/utils";

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
      <div className="fixed inset-0 z-50">
        <div className="flex h-dvh flex-col items-center overflow-hidden pt-6 max-sm:before:flex-1 sm:overflow-y-auto sm:p-4 sm:before:basis-[20vh] sm:after:flex-1">
          <BaseAlertDialog.Popup
            className={cn(
              "row-start-2 grid w-full min-w-0 origin-top overflow-hidden bg-dialog bg-clip-padding text-dialog-foreground shadow-xs transition-[scale,opacity,translate] duration-200 ease-out will-change-transform data-ending-style:opacity-0 data-starting-style:opacity-0 max-sm:overflow-y-auto max-sm:border-none max-sm:opacity-[calc(1-min(var(--nested-dialogs),1))] max-sm:data-ending-style:translate-y-4 max-sm:data-starting-style:translate-y-4 sm:max-w-lg sm:-translate-y-[calc(1.25rem*var(--nested-dialogs))] sm:scale-[calc(1-0.1*var(--nested-dialogs))] sm:rounded-3xl sm:data-ending-style:scale-98 sm:data-starting-style:scale-98",
              className,
            )}
            data-slot="alert-dialog-popup"
            {...props}
          />
        </div>
      </div>
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

function AlertDialogClose(props: BaseAlertDialog.Close.Props) {
  return <BaseAlertDialog.Close data-slot="alert-dialog-close" {...props} />;
}

function AlertDialogCloseButton(props: BaseAlertDialog.Close.Props) {
  return (
    <BaseAlertDialog.Close
      data-slot="alert-dialog-close-button"
      render={<Button variant="ghost" />}
      {...props}
    />
  );
}
export {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogClose,
  AlertDialogCloseButton,
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
