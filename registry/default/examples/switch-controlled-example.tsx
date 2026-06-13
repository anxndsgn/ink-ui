import { useState } from "react";
import { Switch } from "registry/default/ui/switch";
export function SwitchControlledExample() {
  const [checked, setChecked] = useState(false);

  return (
    <div className="flex items-center gap-4">
      <Switch checked={checked} onCheckedChange={setChecked} />
      <span className="text-sm text-gray-600 dark:text-gray-400">{checked ? "On" : "Off"}</span>
    </div>
  );
}
