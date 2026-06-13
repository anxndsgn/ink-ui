import Slider from "registry/default/ui/slider";
export function SteppedSliderExample() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Slider aria-label="Brightness" defaultValue={50} step={10} />
    </div>
  );
}
