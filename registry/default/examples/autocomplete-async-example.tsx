import * as React from "react";
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
  AutocompleteStatus,
} from "registry/default/ui/autocomplete";
import { MagnifyingGlassIcon } from "@phosphor-icons/react";

const allUsers = [
  "Ada Lovelace",
  "Alan Turing",
  "Grace Hopper",
  "Katherine Johnson",
  "Linus Torvalds",
  "Margaret Hamilton",
  "Tim Berners-Lee",
];

export function AutocompleteAsyncExample() {
  const [value, setValue] = React.useState("");
  const [items, setItems] = React.useState<string[]>([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (!value) {
      setItems([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    const timeout = setTimeout(() => {
      setItems(allUsers.filter((u) => u.toLowerCase().includes(value.toLowerCase())));
      setLoading(false);
    }, 500);
    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <div className="w-full max-w-64">
      <Autocomplete items={items} value={value} onValueChange={setValue} mode="none">
        <AutocompleteInputGroup>
          <AutocompleteInputAddon>
            <MagnifyingGlassIcon />
          </AutocompleteInputAddon>
          <AutocompleteInput placeholder="Search people" />
          <AutocompleteClear />
        </AutocompleteInputGroup>
        <AutocompleteContent>
          <AutocompleteStatus>{loading ? "Loading…" : null}</AutocompleteStatus>
          {!loading && value ? <AutocompleteEmpty>No people found.</AutocompleteEmpty> : null}
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
