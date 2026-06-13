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
import { Switch } from "registry/default/ui/switch";

export function DialogNestedExample() {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline">View Notifications</Button>} />
      <DialogContent className="data-nested-dialog-open:scale-[calc(1-0.05*var(--nested-dialogs))] data-nested-dialog-open:opacity-85">
        <DialogHeader>
          <DialogTitle>Notifications</DialogTitle>
          <DialogDescription>You are all caught up. Good job!</DialogDescription>
        </DialogHeader>
        <DialogBody>
          <p className="text-sm text-muted-foreground">
            Open the nested dialog to customize how future notifications are delivered.
          </p>
        </DialogBody>
        <DialogFooter direction="row">
          <Dialog>
            <DialogTrigger render={<Button variant="outline">Customize</Button>} />
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Customize notifications</DialogTitle>
                <DialogDescription>Review your notification settings here.</DialogDescription>
              </DialogHeader>
              <DialogBody className="flex flex-row items-center gap-2">
                <Switch />
                <p className="text-sm text-muted-foreground">Email summaries are enabled.</p>
              </DialogBody>
              <DialogFooter direction="row">
                <DialogClose render={<Button variant="secondary">Close</Button>} />
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <DialogClose render={<Button>Done</Button>} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
