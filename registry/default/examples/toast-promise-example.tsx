import { Button } from "registry/default/ui/button";
import { toastManager } from "registry/default/ui/toast";
function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
export function ToastPromiseExample() {
  return (
    <Button
      variant="outline"
      onClick={() => {
        void toastManager.promise(sleep(1500), {
          loading: {
            title: "Uploading asset",
            description: "Please wait while we process your file.",
            type: "loading",
          },
          success: {
            title: "Upload complete",
            description: "The asset is ready to use in your library.",
            type: "success",
          },
          error: {
            title: "Upload failed",
            description: "Try again after checking your network connection.",
            type: "error",
          },
        });
      }}
    >
      Run async toast
    </Button>
  );
}
