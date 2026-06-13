import { Checkbox } from "registry/default/ui/checkbox";
export function CheckboxDisabledExample() {
  return (
    <div className="flex items-center gap-4">
      <Checkbox disabled />
      <Checkbox defaultChecked disabled />
    </div>
  );
}
