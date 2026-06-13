import { Switch } from "registry/default/ui/switch";
export function SwitchDisabledExample() {
  return (
    <div className="flex items-center gap-4">
      <Switch disabled />
      <Switch defaultChecked disabled />
    </div>
  );
}
