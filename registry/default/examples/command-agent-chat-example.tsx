import {
  ArrowUpIcon,
  BugIcon,
  ChatCircleIcon,
  CloudIcon,
  FileTextIcon,
  GitBranchIcon,
  LightningIcon,
  PlugsIcon,
  PlusIcon,
  SparkleIcon,
  TargetIcon,
} from "@phosphor-icons/react";
import { useState } from "react";
import {
  Command,
  CommandCollection,
  CommandContent,
  CommandEmpty,
  CommandGroup,
  CommandGroupLabel,
  CommandInput,
  CommandItem,
  CommandItemDescription,
  CommandItemLabel,
  CommandList,
} from "registry/default/ui/command";
import { InputGroup, InputGroupAddon, InputGroupButton } from "registry/default/ui/input-group";

const commandGroups = [
  {
    items: [
      {
        description: "Don't work in a project",
        icon: ChatCircleIcon,
        label: "Chat",
        value: "chat",
      },
      {
        description: "Run this chat in the cloud",
        icon: CloudIcon,
        label: "Cloud",
        value: "cloud",
      },
      {
        description: "Set a goal to keep pursuing",
        icon: TargetIcon,
        label: "Goal",
        value: "goal",
      },
      {
        description: "2x speed, increased usage",
        icon: LightningIcon,
        label: "Fast",
        value: "fast",
      },
    ],
    value: "Session",
  },
  {
    items: [
      {
        description: "Review uncommitted changes or compare against a branch",
        icon: BugIcon,
        label: "Code review",
        value: "review",
      },
      {
        description: "Run this chat in a new worktree",
        icon: GitBranchIcon,
        label: "Worktree",
        value: "worktree",
      },
      { description: "Create an AGENTS.md file", icon: FileTextIcon, label: "Init", value: "init" },
      { description: "Show MCP server status", icon: PlugsIcon, label: "MCP", value: "mcp" },
    ],
    value: "Project",
  },
  {
    items: [
      {
        description: "Review the current diff for bugs",
        icon: SparkleIcon,
        kind: "skill",
        label: "code-review",
        value: "code-review",
      },
      {
        description: "Open a pull request for this branch",
        icon: SparkleIcon,
        kind: "skill",
        label: "create-pr",
        value: "create-pr",
      },
      {
        description: "Simplify the changed code",
        icon: SparkleIcon,
        kind: "skill",
        label: "simplify",
        value: "simplify",
      },
    ],
    value: "Skills",
  },
];

type CommandGroupValue = (typeof commandGroups)[number];
type CommandItemValue = CommandGroupValue["items"][number];

export function AgentChatCommandExample() {
  const [value, setValue] = useState("");
  const [log, setLog] = useState<string[]>([]);

  const submit = () => {
    const text = value.trim();
    if (!text) return;
    setLog((entries) => [...entries, text].slice(-3));
    setValue("");
  };

  return (
    <div className="flex w-full max-w-2xl flex-col gap-3">
      <div className="min-h-18 text-sm text-muted-foreground">
        {log.length === 0
          ? "Type / to open the command list, or click the / button."
          : log.map((entry, index) => <p key={index}>{entry}</p>)}
      </div>
      <Command
        items={commandGroups}
        onSelect={(command: CommandItemValue) => {
          if ("kind" in command && command.kind === "skill") {
            setValue(`/${command.value} `);
            return;
          }
          setLog((entries) => [...entries, `Ran /${command.value}`].slice(-3));
        }}
        onValueChange={setValue}
        value={value}
      >
        <InputGroup className="items-stretch rounded-2xl bg-background">
          <CommandInput
            className="min-h-16 py-4 text-base"
            multiline
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                submit();
              }
            }}
            placeholder="Ask anything. Type / for commands"
          />
          <InputGroupAddon align="block-end" className="justify-between gap-3 pt-3">
            <div className="flex items-center gap-2">
              <InputGroupButton aria-label="Attach file" size="icon-sm" variant="outline">
                <PlusIcon />
              </InputGroupButton>
            </div>
            <InputGroupButton
              aria-label="Submit message"
              onClick={submit}
              size="icon-sm"
              variant="default"
            >
              <ArrowUpIcon />
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
        <CommandContent>
          <CommandEmpty>No commands found.</CommandEmpty>
          <CommandList>
            {(group: CommandGroupValue) => (
              <CommandGroup items={group.items} key={group.value}>
                <CommandGroupLabel>{group.value}</CommandGroupLabel>
                <CommandCollection>
                  {(command: CommandItemValue) => (
                    <CommandItem key={command.value} value={command}>
                      <command.icon />
                      <CommandItemLabel>{command.label}</CommandItemLabel>
                      <CommandItemDescription>{command.description}</CommandItemDescription>
                    </CommandItem>
                  )}
                </CommandCollection>
              </CommandGroup>
            )}
          </CommandList>
        </CommandContent>
      </Command>
    </div>
  );
}
