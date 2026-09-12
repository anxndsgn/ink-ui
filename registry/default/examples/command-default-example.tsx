import {
  BugIcon,
  ChatCircleIcon,
  CloudIcon,
  FileTextIcon,
  LightningIcon,
  PlugsIcon,
} from "@phosphor-icons/react";
import { useState } from "react";
import {
  Command,
  CommandContent,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandItemDescription,
  CommandItemLabel,
  CommandList,
} from "registry/default/ui/command";
import { InputGroup } from "registry/default/ui/input-group";

const commands = [
  { description: "Don't work in a project", icon: ChatCircleIcon, label: "Chat", value: "chat" },
  { description: "Run this chat in the cloud", icon: CloudIcon, label: "Cloud", value: "cloud" },
  {
    description: "Review uncommitted changes",
    icon: BugIcon,
    label: "Code review",
    value: "review",
  },
  { description: "2x speed, increased usage", icon: LightningIcon, label: "Fast", value: "fast" },
  { description: "Create an AGENTS.md file", icon: FileTextIcon, label: "Init", value: "init" },
  { description: "Show MCP server status", icon: PlugsIcon, label: "MCP", value: "mcp" },
];

type CommandItemValue = (typeof commands)[number];

export function CommandExample() {
  const [selected, setSelected] = useState<CommandItemValue | null>(null);

  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <Command items={commands} onSelect={setSelected}>
        <InputGroup>
          <CommandInput placeholder="Type / for commands" />
        </InputGroup>
        <CommandContent>
          <CommandEmpty>No commands found.</CommandEmpty>
          <CommandList>
            {(command: CommandItemValue) => (
              <CommandItem key={command.value} value={command}>
                <command.icon />
                <CommandItemLabel>{command.label}</CommandItemLabel>
                <CommandItemDescription>{command.description}</CommandItemDescription>
              </CommandItem>
            )}
          </CommandList>
        </CommandContent>
      </Command>
      <p className="text-sm text-muted-foreground">
        {selected ? `Selected: /${selected.value}` : "Nothing selected yet."}
      </p>
    </div>
  );
}
