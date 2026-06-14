import { Kbd } from "registry/default/ui/kbd";

export function KbdExample() {
  return (
    <div className="flex items-center gap-4">
      <Kbd>⌘</Kbd>
      <Kbd>K</Kbd>
      <Kbd>Shift</Kbd>
    </div>
  );
}
