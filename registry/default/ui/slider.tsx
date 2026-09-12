import { cn } from "@/lib/utils";
import { Slider as BaseSlider } from "@base-ui/react";
import React from "react";

export default function Slider({
  className,
  value,
  defaultValue,
  min,
  max,
  ...props
}: BaseSlider.Root.Props) {
  const _values = React.useMemo(
    () =>
      Array.isArray(value)
        ? value
        : typeof value === "number"
          ? [value]
          : Array.isArray(defaultValue)
            ? defaultValue
            : typeof defaultValue === "number"
              ? [defaultValue]
              : [min ?? 0],
    [value, defaultValue, min],
  );

  return (
    <BaseSlider.Root
      data-slot="slider"
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      {...props}
    >
      <BaseSlider.Control
        className={cn("flex w-32 touch-none items-center select-none", className)}
        data-slot="slider-control"
      >
        <BaseSlider.Track
          className={cn(
            "h-1 w-full rounded-full bg-muted inset-ring inset-ring-border select-none",
          )}
          data-slot="slider-track"
        >
          <BaseSlider.Indicator
            className={cn("rounded-full bg-accent select-none data-disabled:opacity-50")}
            data-slot="slider-indicator"
          />
          {Array.from({ length: _values.length }).map((_, index) => (
            <BaseSlider.Thumb
              key={index}
              className="h-4 w-5 rounded-full bg-white shadow-xs ring ring-border transition-[transform,scale,opacity] select-none before:hidden data-disabled:cursor-not-allowed data-disabled:bg-muted focus-within:data-dragging:scale-120 focus-within:data-dragging:opacity-80 focus-within:data-dragging:backdrop-blur-md"
              data-slot="slider-thumb"
              index={index}
            />
          ))}
        </BaseSlider.Track>
      </BaseSlider.Control>
    </BaseSlider.Root>
  );
}
