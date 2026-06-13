import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "registry/default/ui/dialog";
import { Button } from "registry/default/ui/button";
export function DialogNoCloseButtonExample() {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline">No Close Button</Button>} />
      <DialogContent>
        <DialogHeader closeButton={false}>
          <DialogTitle>Notice</DialogTitle>
          <DialogDescription>
            This dialog has no close button in the header. Use the action below to dismiss it.
          </DialogDescription>
        </DialogHeader>
        <DialogBody>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            You must explicitly choose an action to close this dialog.
          </p>
        </DialogBody>
        <DialogFooter>
          <DialogClose render={<Button>Got it</Button>} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
