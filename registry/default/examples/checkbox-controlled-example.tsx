import { useState } from "react";
import { Checkbox } from "registry/default/ui/checkbox";
export function CheckboxControlledExample() {
  const [checked, setChecked] = useState(false);

  return (
    <div className="flex items-center gap-4">
      <Checkbox checked={checked} onCheckedChange={setChecked} />
      <span className="text-sm text-gray-600 dark:text-gray-400">
        {checked ? "Checked" : "Unchecked"}
      </span>
    </div>
  );
}
