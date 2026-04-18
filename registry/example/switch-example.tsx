import { useState } from "react";
import { Switch } from "@registry/components/ui/switch";

export function SwitchExample() {
  return (
    <div className="flex items-center gap-4">
      <Switch />
    </div>
  );
}

export function SwitchCheckedExample() {
  return (
    <div className="flex items-center gap-4">
      <Switch defaultChecked />
    </div>
  );
}

export function SwitchDisabledExample() {
  return (
    <div className="flex items-center gap-4">
      <Switch disabled />
      <Switch defaultChecked disabled />
    </div>
  );
}

export function SwitchControlledExample() {
  const [checked, setChecked] = useState(false);

  return (
    <div className="flex items-center gap-4">
      <Switch checked={checked} onCheckedChange={setChecked} />
      <span className="text-sm text-gray-600 dark:text-gray-400">{checked ? "On" : "Off"}</span>
    </div>
  );
}
