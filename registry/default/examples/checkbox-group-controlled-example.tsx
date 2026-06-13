import { useState } from "react";
import { Checkbox, CheckboxGroup } from "registry/default/ui/checkbox";
export function CheckboxGroupControlledExample() {
  const [value, setValue] = useState<string[]>(["design"]);

  return (
    <div className="flex flex-col gap-3">
      <CheckboxGroup value={value} onValueChange={setValue}>
        <label className="flex items-center gap-2 text-sm">
          <Checkbox value="design" />
          <span className="text-gray-900 dark:text-gray-100">Design</span>
        </label>
        <label className="flex items-center gap-2 text-sm">
          <Checkbox value="engineering" />
          <span className="text-gray-900 dark:text-gray-100">Engineering</span>
        </label>
        <label className="flex items-center gap-2 text-sm">
          <Checkbox value="marketing" />
          <span className="text-gray-900 dark:text-gray-100">Marketing</span>
        </label>
      </CheckboxGroup>
      <span className="text-sm text-gray-600 dark:text-gray-400">
        Selected: {value.join(", ") || "None"}
      </span>
    </div>
  );
}
