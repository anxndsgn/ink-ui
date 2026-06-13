import Slider from "registry/default/ui/slider";
export function DisabledSliderExample() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Slider aria-label="Disabled volume" defaultValue={40} disabled />
    </div>
  );
}
