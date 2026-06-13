import Slider from "registry/default/ui/slider";
export function RangeSliderExample() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Slider aria-label="Price range" defaultValue={[25, 75]} />
    </div>
  );
}
