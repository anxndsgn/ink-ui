import {
  Autocomplete,
  AutocompleteClear,
  AutocompleteContent,
  AutocompleteEmpty,
  AutocompleteInput,
  AutocompleteInputAddon,
  AutocompleteInputGroup,
  AutocompleteItem,
  AutocompleteList,
  AutocompleteTrigger,
} from "registry/default/ui/autocomplete";
import { MagnifyingGlassIcon } from "@phosphor-icons/react";

const languages = [
  "TypeScript",
  "JavaScript",
  "Python",
  "Rust",
  "Go",
  "Ruby",
  "Swift",
  "Kotlin",
  "Elixir",
];

export function AutocompleteWithClearExample() {
  return (
    <div className="w-full max-w-64">
      <Autocomplete items={languages}>
        <AutocompleteInputGroup>
          <AutocompleteInputAddon>
            <MagnifyingGlassIcon />
          </AutocompleteInputAddon>
          <AutocompleteInput placeholder="Search a language" />
          <AutocompleteClear />
          <AutocompleteTrigger />
        </AutocompleteInputGroup>
        <AutocompleteContent>
          <AutocompleteEmpty>No languages found.</AutocompleteEmpty>
          <AutocompleteList>
            {(item: string) => (
              <AutocompleteItem key={item} value={item}>
                {item}
              </AutocompleteItem>
            )}
          </AutocompleteList>
        </AutocompleteContent>
      </Autocomplete>
    </div>
  );
}
