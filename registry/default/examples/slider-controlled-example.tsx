import { useState } from "react";
import Slider from "registry/default/ui/slider";
export function ControlledSliderExample() {
  const [value, setValue] = useState(40);

  return (
    <div className="flex flex-col gap-4">
      <Slider
        aria-label="Volume"
        value={value}
        onValueChange={(nextValue) => {
          setValue(Array.isArray(nextValue) ? (nextValue[0] ?? 0) : nextValue);
        }}
      />
      <span className="text-sm text-gray-600 dark:text-gray-400">Volume: {value}</span>
    </div>
  );
}
