import { RadioGroup, RadioGroupItem } from "registry/default/ui/radio";
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
