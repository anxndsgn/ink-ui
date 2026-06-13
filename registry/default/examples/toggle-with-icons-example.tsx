import { Toggle } from "registry/default/ui/toggle";
import { TextBIcon, TextItalicIcon, TextStrikethroughIcon } from "@phosphor-icons/react";
export function ToggleWithIconsExample() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Toggle size="sm" aria-label="Toggle bold">
        <TextBIcon />
      </Toggle>
      <Toggle size="sm" aria-label="Toggle italic">
        <TextItalicIcon />
      </Toggle>
      <Toggle size="sm" aria-label="Toggle strikethrough">
        <TextStrikethroughIcon />
      </Toggle>
    </div>
  );
}
