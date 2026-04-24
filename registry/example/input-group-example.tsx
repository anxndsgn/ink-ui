import {
  ArrowUpIcon,
  GearSixIcon,
  HandPalmIcon,
  LightbulbIcon,
  MagnifyingGlassIcon,
  MicrophoneIcon,
  PaperPlaneTiltIcon,
  PlusIcon,
} from "@phosphor-icons/react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@registry/components/ui/input-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@registry/components/ui/select";
import { Toggle } from "@registry/components/ui/toggle";

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

export function InputGroupWithTextExample() {
  return (
    <div className="flex w-full max-w-sm flex-wrap items-center gap-4">
      <InputGroup>
        <InputGroupAddon>
          <InputGroupText>https://</InputGroupText>
        </InputGroupAddon>
        <InputGroupInput placeholder="ink-ui" />
        <InputGroupAddon align="inline-end">
          <InputGroupText>.com</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}

export function InputGroupTextareaExample() {
  return (
    <div className="flex w-full max-w-sm flex-wrap items-center gap-4">
      <InputGroup>
        <InputGroupTextarea placeholder="Write a short message..." />
        <InputGroupAddon align="block-end">
          <InputGroupText>Press Cmd + Enter to send</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}

export function AgentChatInputGroupExample() {
  const permissionItems = [
    { value: "default", label: "Default permissions" },
    { value: "read-only", label: "Read only" },
    { value: "full-access", label: "Full access" },
  ];
  const modelItems = [
    { value: "medium", label: "5.5 Medium" },
    { value: "fast", label: "5.5 Fast" },
    { value: "deep", label: "5.5 Deep" },
  ];

  return (
    <div className="flex w-full max-w-2xl flex-wrap items-center gap-4">
      <InputGroup className="min-h-36 items-stretch rounded-2xl bg-background">
        <InputGroupTextarea
          className="min-h-20 py-4 text-base"
          placeholder="Ask Ink UI anything. @ to mention files or plugins"
        />
        <InputGroupAddon align="block-end" className="flex-wrap justify-between gap-3 pt-3">
          <div className="flex flex-wrap items-center gap-2">
            <InputGroupButton size="icon-sm" variant="outline" aria-label="Attach file">
              <PlusIcon />
            </InputGroupButton>
            <Select items={permissionItems} defaultValue="default">
              <SelectTrigger size="sm" variant="ghost" className="justify-start">
                <HandPalmIcon />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {permissionItems.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Toggle aria-label="Toggle thinking" defaultPressed>
              <LightbulbIcon />
            </Toggle>
            <InputGroupButton size="icon-sm" variant="ghost" aria-label="Open settings">
              <GearSixIcon />
            </InputGroupButton>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Select items={modelItems} defaultValue="medium">
              <SelectTrigger size="sm" variant="ghost" className="justify-between">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {modelItems.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <InputGroupButton size="icon-sm" variant="ghost" aria-label="Use voice input">
              <MicrophoneIcon />
            </InputGroupButton>
            <InputGroupButton size="icon-sm" aria-label="Submit message" variant="default">
              <ArrowUpIcon />
            </InputGroupButton>
          </div>
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}
