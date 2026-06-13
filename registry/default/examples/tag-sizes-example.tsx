import { Tag } from "registry/default/ui/tag";
export function TagSizesExample() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Tag size="sm">Small</Tag>
      <Tag size="default">Default</Tag>
      <Tag size="lg">Large</Tag>
    </div>
  );
}
