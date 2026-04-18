import { Input } from "@registry/components/ui/input";

export function InputExample() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Input placeholder="Type something..." />
    </div>
  );
}

export function OutlineInputExample() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Input variant="outline" placeholder="Outline variant..." />
    </div>
  );
}

export function InlineInputExample() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Input block={false} placeholder="Inline width..." />
    </div>
  );
}
