import { useState } from "react";
import { Checkbox, CheckboxGroup } from "@registry/components/ui/checkbox";

export function CheckboxExample() {
  return (
    <div className="flex items-center gap-4">
      <Checkbox />
    </div>
  );
}

export function CheckboxCheckedExample() {
  return (
    <div className="flex items-center gap-4">
      <Checkbox defaultChecked />
    </div>
  );
}

export function CheckboxDisabledExample() {
  return (
    <div className="flex items-center gap-4">
      <Checkbox disabled />
      <Checkbox defaultChecked disabled />
    </div>
  );
}

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
