import { Input } from "registry/default/ui/input";
export function InlineInputExample() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Input block={false} placeholder="Inline width..." />
    </div>
  );
}
