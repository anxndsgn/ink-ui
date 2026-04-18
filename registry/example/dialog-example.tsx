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
} from "@registry/components/ui/dialog";
import { Button } from "@registry/components/ui/button";

export function DialogExample() {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline">Open Dialog</Button>} />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Action</DialogTitle>
          <DialogDescription>
            Are you sure you want to proceed? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogBody>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Additional context or details about the action can go here.
          </p>
        </DialogBody>
        <DialogFooter>
          <DialogClose render={<Button variant="secondary">Cancel</Button>} />
          <Button>Continue</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

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
