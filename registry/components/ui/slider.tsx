import { cn } from "@registry/lib/utils";
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
      thumbAlignment="edge"
      {...props}
    >
      <BaseSlider.Control
        className={cn("flex w-32 touch-none items-center select-none", className)}
        data-slot="slider-control"
      >
        <BaseSlider.Track
          className={cn("h-1 w-full rounded-full bg-muted inset-ring inset-ring-input select-none")}
          data-slot="slider-track"
        >
          <BaseSlider.Indicator
            className={cn(
              "bg-accent select-none data-disabled:opacity-50",
              _values.length === 1 ? "rounded-l-full" : "",
            )}
            data-slot="slider-indicator"
          />
          {Array.from({ length: _values.length }).map((_, index) => (
            <BaseSlider.Thumb
              key={index}
              className={(state) =>
                cn(
                  "size-4 rounded-full bg-white shadow-xs ring ring-input transition-transform select-none before:hidden data-disabled:cursor-not-allowed data-disabled:bg-muted",
                  state.dragging && state.activeThumbIndex === index && "scale-110",
                )
              }
              data-slot="slider-thumb"
              index={index}
            />
          ))}
        </BaseSlider.Track>
      </BaseSlider.Control>
    </BaseSlider.Root>
  );
}
