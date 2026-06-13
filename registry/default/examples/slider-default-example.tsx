import Slider from "registry/default/ui/slider";
export function SliderExample() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Slider aria-label="Volume" defaultValue={40} />
    </div>
  );
}
