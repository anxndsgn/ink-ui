import { Button } from "registry/default/ui/button";
import { PlusIcon } from "@phosphor-icons/react";
export function IconButtonExample() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Button variant="outline" size="icon">
        <PlusIcon />
      </Button>
    </div>
  );
}
