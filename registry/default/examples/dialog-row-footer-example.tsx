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
export function DialogRowFooterExample() {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline">Row Footer</Button>} />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Save Changes</DialogTitle>
          <DialogDescription>Your changes will be saved to the cloud.</DialogDescription>
        </DialogHeader>
        <DialogBody>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Review your changes before confirming.
          </p>
        </DialogBody>
        <DialogFooter direction="row">
          <DialogClose render={<Button variant="secondary">Cancel</Button>} />
          <Button>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
