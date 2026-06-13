import { Toast } from "@base-ui/react/toast";
import { useState } from "react";
import { Button } from "registry/default/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "registry/default/ui/select";
import { ToastProvider, type ToastPosition } from "registry/default/ui/toast";
const positionedToastManager = Toast.createToastManager();
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
