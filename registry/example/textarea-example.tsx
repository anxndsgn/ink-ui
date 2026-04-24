import { Textarea } from "@registry/components/ui/textarea";

export function TextareaExample() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Textarea placeholder="Type something..." />
    </div>
  );
}

export function OutlineTextareaExample() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Textarea variant="outline" placeholder="Outline variant..." />
    </div>
  );
}

export function InlineTextareaExample() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Textarea block={false} placeholder="Inline width..." />
    </div>
  );
}
