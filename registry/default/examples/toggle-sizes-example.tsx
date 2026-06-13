import { Toggle } from "registry/default/ui/toggle";
export function ToggleSizesExample() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Toggle size="sm">Small</Toggle>
      <Toggle size="default">Default</Toggle>
      <Toggle size="lg">Large</Toggle>
    </div>
  );
}
