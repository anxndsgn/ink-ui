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
  createCommandTrigger,
} from "registry/default/ui/command";
import { Avatar, AvatarFallback } from "registry/default/ui/avatar";
import { InputGroup } from "registry/default/ui/input-group";

const people = [
  { handle: "alice", name: "Alice Chen", role: "Design" },
  { handle: "bob", name: "Bob Park", role: "Engineering" },
  { handle: "carol", name: "Carol Diaz", role: "Product" },
  { handle: "dave", name: "Dave Kim", role: "Engineering" },
];

type Person = (typeof people)[number];

const mentionTrigger = createCommandTrigger("@", { position: "anywhere" });

export function CommandMentionExample() {
  const [value, setValue] = useState("");

  return (
    <div className="w-full max-w-md">
      <Command
        items={people}
        itemToStringValue={(person: Person) => `${person.name} ${person.handle}`}
        onSelect={(person: Person, { match, value: next }) => {
          const at = match?.start ?? next.length;
          setValue(`${next.slice(0, at)}@${person.handle} ${next.slice(at)}`);
        }}
        onValueChange={setValue}
        trigger={mentionTrigger}
        value={value}
      >
        <InputGroup>
          <CommandInput placeholder="Type @ to mention someone" />
        </InputGroup>
        <CommandContent>
          <CommandEmpty>No people found.</CommandEmpty>
          <CommandList>
            {(person: Person) => (
              <CommandItem key={person.handle} value={person}>
                <Avatar size="sm">
                  <AvatarFallback>{person.name[0]}</AvatarFallback>
                </Avatar>
                <CommandItemLabel>{person.name}</CommandItemLabel>
                <CommandItemDescription>@{person.handle}</CommandItemDescription>
              </CommandItem>
            )}
          </CommandList>
        </CommandContent>
      </Command>
    </div>
  );
}
