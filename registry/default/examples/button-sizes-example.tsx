import { Button } from "registry/default/ui/button";
import { PlusIcon } from "@phosphor-icons/react";
export function ButtonSizesExample() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
      <Button size="icon">
        <PlusIcon />
      </Button>
      <Button size="icon-sm">
        <PlusIcon />
      </Button>
    </div>
  );
}
