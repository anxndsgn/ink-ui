import { useState } from "react";
import { Checkbox, CheckboxGroup } from "registry/default/ui/checkbox";
export function CheckboxGroupIndeterminateExample() {
  const allValues = ["fuji", "gala", "granny-smith"];
  const [value, setValue] = useState<string[]>([]);

  return (
    <CheckboxGroup value={value} onValueChange={setValue} allValues={allValues}>
      <label className="flex items-center gap-2 text-sm font-medium">
        <Checkbox parent />
        <span className="text-gray-900 dark:text-gray-100">Apples</span>
      </label>
      <div className="flex flex-col gap-2 pl-4">
        <label className="flex items-center gap-2 text-sm">
          <Checkbox value="fuji" />
          <span className="text-gray-900 dark:text-gray-100">Fuji</span>
        </label>
        <label className="flex items-center gap-2 text-sm">
          <Checkbox value="gala" />
          <span className="text-gray-900 dark:text-gray-100">Gala</span>
        </label>
        <label className="flex items-center gap-2 text-sm">
          <Checkbox value="granny-smith" />
          <span className="text-gray-900 dark:text-gray-100">Granny Smith</span>
        </label>
      </div>
    </CheckboxGroup>
  );
}
