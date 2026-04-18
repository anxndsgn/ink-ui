import { useState } from "react";
import { RadioGroup, Radio, RadioGroupItem } from "@registry/components/ui/radio";

export function RadioExample() {
  return (
    <RadioGroup defaultValue="system">
      <label className="flex items-center gap-2 text-sm">
        <Radio value="system" />
        System
      </label>
      <label className="flex items-center gap-2 text-sm">
        <Radio value="light" />
        Light
      </label>
      <label className="flex items-center gap-2 text-sm">
        <Radio value="dark" />
        Dark
      </label>
    </RadioGroup>
  );
}

export function RadioDisabledExample() {
  return (
    <RadioGroup defaultValue="system">
      <label className="flex items-center gap-2 text-sm">
        <Radio value="system" />
        System
      </label>
      <label className="flex items-center gap-2 text-sm">
        <Radio value="light" disabled />
        Light
      </label>
      <label className="flex items-center gap-2 text-sm">
        <Radio value="dark" />
        Dark
      </label>
    </RadioGroup>
  );
}

export function RadioControlledExample() {
  const [value, setValue] = useState("system");

  return (
    <div className="flex flex-col gap-4">
      <RadioGroup value={value} onValueChange={setValue}>
        <label className="flex items-center gap-2 text-sm">
          <Radio value="system" />
          System
        </label>
        <label className="flex items-center gap-2 text-sm">
          <Radio value="light" />
          Light
        </label>
        <label className="flex items-center gap-2 text-sm">
          <Radio value="dark" />
          Dark
        </label>
      </RadioGroup>
      <span className="text-sm text-gray-600 dark:text-gray-400">Selected: {value}</span>
    </div>
  );
}

export function RadioGroupItemExample() {
  return (
    <RadioGroup defaultValue="default">
      <label className="flex items-center gap-2 text-sm">
        <RadioGroupItem value="default" />
        Default
      </label>
      <label className="flex items-center gap-2 text-sm">
        <RadioGroupItem value="compact" />
        Compact
      </label>
    </RadioGroup>
  );
}
