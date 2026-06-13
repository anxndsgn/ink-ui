import { RadioGroup, Radio } from "registry/default/ui/radio";
export function RadioExample() {
  return (
    <RadioGroup defaultValue="system">
      <label className="flex items-center gap-2 text-sm">
        <Radio value="system" />
        System
      </label>
      <label className="flex items-center gap-2 text-sm">
        <Radio value="light" />
        Light
      </label>
      <label className="flex items-center gap-2 text-sm">
        <Radio value="dark" />
        Dark
      </label>
    </RadioGroup>
  );
}
