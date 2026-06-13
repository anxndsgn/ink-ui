import { MagnifyingGlassIcon } from "@phosphor-icons/react";
import { InputGroup, InputGroupAddon, InputGroupInput } from "registry/default/ui/input-group";
export function InputGroupExample() {
  return (
    <div className="flex w-full max-w-sm flex-wrap items-center gap-4">
      <InputGroup>
        <InputGroupInput placeholder="Search components..." />
        <InputGroupAddon>
          <MagnifyingGlassIcon />
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}
