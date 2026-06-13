import { Button } from "registry/default/ui/button";
import { toastManager } from "registry/default/ui/toast";
export function ToastVariantsExample() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button
        variant="outline"
        onClick={() => {
          toastManager.add({
            title: "Update available",
            description: "Version 1.3.0 is ready to install.",
            type: "info",
            actionProps: {
              children: "Review",
              onClick: () => {
                toastManager.add({
                  title: "Release notes opened",
                  description: "You can review the changelog before upgrading.",
                  type: "success",
                });
              },
            },
          });
        }}
      >
        Info
      </Button>
      <Button
        variant="outline"
        onClick={() => {
          toastManager.add({
            title: "Deployment failed",
            description: "Reconnect your repository and try again.",
            type: "error",
            actionProps: {
              children: "Retry",
              onClick: () => {
                toastManager.add({
                  title: "Retry started",
                  description: "We’re attempting the deployment again.",
                  type: "loading",
                });
              },
            },
          });
        }}
      >
        Error
      </Button>
      <Button
        variant="outline"
        onClick={() => {
          toastManager.add({
            title: "Finishing sync",
            description: "This toast stays visible until you dismiss it.",
            timeout: 0,
            type: "warning",
          });
        }}
      >
        Persistent
      </Button>
    </div>
  );
}
