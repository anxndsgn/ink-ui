import { ArrowsClockwiseIcon, GitBranchIcon, TerminalIcon, TrashIcon } from "@phosphor-icons/react";
import {
  Command,
  CommandContent,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandItemLabel,
  CommandList,
  CommandShortcut,
  CommandTrigger,
} from "registry/default/ui/command";
import { InputGroup, InputGroupAddon, InputGroupButton } from "registry/default/ui/input-group";
import { Kbd } from "registry/default/ui/kbd";

const commands = [
  { icon: GitBranchIcon, label: "Branch", shortcut: "B", value: "branch" },
  { icon: TerminalIcon, label: "Terminal", shortcut: "T", value: "terminal" },
  { icon: ArrowsClockwiseIcon, label: "Resume", shortcut: "R", value: "resume" },
  { icon: TrashIcon, label: "Clear", shortcut: "C", value: "clear" },
];

type CommandItemValue = (typeof commands)[number];

export function CommandWithTriggerExample() {
  return (
    <div className="w-full max-w-md">
      <Command items={commands}>
        <InputGroup>
          <CommandInput placeholder="Type / or press the button" />
          <InputGroupAddon align="inline-end">
            <CommandTrigger
              aria-label="Open commands"
              render={<InputGroupButton size="icon-xs" variant="ghost" />}
            >
              <span className="text-sm font-medium">/</span>
            </CommandTrigger>
          </InputGroupAddon>
        </InputGroup>
        <CommandContent>
          <CommandEmpty>No commands found.</CommandEmpty>
          <CommandList>
            {(command: CommandItemValue) => (
              <CommandItem key={command.value} value={command}>
                <command.icon />
                <CommandItemLabel>{command.label}</CommandItemLabel>
                <CommandShortcut>
                  <Kbd>⌘</Kbd>
                  <Kbd>{command.shortcut}</Kbd>
                </CommandShortcut>
              </CommandItem>
            )}
          </CommandList>
        </CommandContent>
      </Command>
    </div>
  );
}
