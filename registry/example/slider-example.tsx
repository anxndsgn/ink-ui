import { useState } from "react";
import Slider from "@registry/components/ui/slider";

export function SliderExample() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Slider aria-label="Volume" defaultValue={40} />
    </div>
  );
}

export function RangeSliderExample() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Slider aria-label="Price range" defaultValue={[25, 75]} />
    </div>
  );
}

export function SteppedSliderExample() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Slider aria-label="Brightness" defaultValue={50} step={10} />
    </div>
  );
}

export function DisabledSliderExample() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Slider aria-label="Disabled volume" defaultValue={40} disabled />
    </div>
  );
}

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
