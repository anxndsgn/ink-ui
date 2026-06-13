import { PaperPlaneTiltIcon } from "@phosphor-icons/react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "registry/default/ui/input-group";
export function InputGroupWithButtonExample() {
  return (
    <div className="flex w-full max-w-sm flex-wrap items-center gap-4">
      <InputGroup>
        <InputGroupInput placeholder="Ask Ink UI..." />
        <InputGroupAddon align="inline-end">
          <InputGroupButton size="icon-xs" aria-label="Send">
            <PaperPlaneTiltIcon />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}
