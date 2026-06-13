import {
  Autocomplete,
  AutocompleteContent,
  AutocompleteEmpty,
  AutocompleteInput,
  AutocompleteInputGroup,
  AutocompleteItem,
  AutocompleteList,
} from "registry/default/ui/autocomplete";

const cities = ["Amsterdam", "Berlin", "London", "Madrid", "Paris", "Rome", "Vienna"];

export function AutocompleteSizesExample() {
  return (
    <div className="flex w-full max-w-64 flex-col gap-4">
      {(["sm", "default", "lg"] as const).map((size) => (
        <Autocomplete key={size} items={cities}>
          <AutocompleteInputGroup size={size}>
            <AutocompleteInput placeholder={`Search (${size})`} />
          </AutocompleteInputGroup>
          <AutocompleteContent>
            <AutocompleteEmpty>No cities found.</AutocompleteEmpty>
            <AutocompleteList>
              {(item: string) => (
                <AutocompleteItem key={item} value={item}>
                  {item}
                </AutocompleteItem>
              )}
            </AutocompleteList>
          </AutocompleteContent>
        </Autocomplete>
      ))}
    </div>
  );
}
