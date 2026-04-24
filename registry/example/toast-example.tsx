import { Toast } from "@base-ui/react/toast";
import { useState } from "react";
import { Button } from "@registry/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@registry/components/ui/select";
import { ToastProvider, toastManager, type ToastPosition } from "@registry/components/ui/toast";

const positionedToastManager = Toast.createToastManager();

function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

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

const POSITIONS: ToastPosition[] = [
  "top-left",
  "top-center",
  "top-right",
  "bottom-left",
  "bottom-center",
  "bottom-right",
];

const POSITION_ITEMS = POSITIONS.map((value) => ({
  value,
  label: value.replace("-", " "),
}));

export function ToastPositionExample() {
  const [position, setPosition] = useState<ToastPosition>("bottom-right");

  return (
    <ToastProvider position={position} toastManager={positionedToastManager}>
      <div className="flex flex-col items-start gap-3">
        <Select
          items={POSITION_ITEMS}
          value={position}
          onValueChange={(value) => {
            if (value) {
              setPosition(value as ToastPosition);
            }
          }}
        >
          <SelectTrigger variant="outline" className="w-44">
            <SelectValue placeholder="Select a position" />
          </SelectTrigger>
          <SelectContent>
            {POSITION_ITEMS.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          variant="outline"
          onClick={() => {
            positionedToastManager.add({
              title: "Position updated",
              description: `This toast is rendered at ${position}.`,
              type: "info",
            });
          }}
        >
          Show positioned toast
        </Button>
      </div>
    </ToastProvider>
  );
}
