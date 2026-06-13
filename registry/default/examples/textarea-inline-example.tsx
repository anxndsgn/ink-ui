import { Textarea } from "registry/default/ui/textarea";
export function InlineTextareaExample() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Textarea block={false} placeholder="Inline width..." />
    </div>
  );
}
