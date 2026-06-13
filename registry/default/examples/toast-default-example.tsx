import { Button } from "registry/default/ui/button";
import { toastManager } from "registry/default/ui/toast";
export function ToastExample() {
  return (
    <Button
      variant="outline"
      onClick={() => {
        toastManager.add({
          title: "Changes saved",
          description: "Your profile settings have been updated.",
          type: "success",
        });
      }}
    >
      Show toast
    </Button>
  );
}
