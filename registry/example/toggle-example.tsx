import { Toggle } from "@registry/components/ui/toggle";
import { TextBIcon, TextItalicIcon, TextStrikethroughIcon } from "@phosphor-icons/react";

export function ToggleExample() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Toggle>Toggle</Toggle>
    </div>
  );
}

export function ToggleSizesExample() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Toggle size="sm">Small</Toggle>
      <Toggle size="default">Default</Toggle>
      <Toggle size="lg">Large</Toggle>
    </div>
  );
}

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
