import { Checkbox, CheckboxGroup } from "registry/default/ui/checkbox";
export function CheckboxGroupExample() {
  return (
    <CheckboxGroup defaultValue={["design"]}>
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
  );
}
