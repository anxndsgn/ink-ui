import {
  Autocomplete,
  AutocompleteContent,
  AutocompleteEmpty,
  AutocompleteInput,
  AutocompleteInputGroup,
  AutocompleteItem,
  AutocompleteList,
} from "registry/default/ui/autocomplete";

const fruits = [
  "Apple",
  "Banana",
  "Blueberry",
  "Cherry",
  "Grapes",
  "Mango",
  "Orange",
  "Peach",
  "Pineapple",
  "Strawberry",
];

export function AutocompleteExample() {
  return (
    <div className="w-full max-w-64">
      <Autocomplete items={fruits}>
        <AutocompleteInputGroup>
          <AutocompleteInput placeholder="Search a fruit" />
        </AutocompleteInputGroup>
        <AutocompleteContent>
          <AutocompleteEmpty>No fruits found.</AutocompleteEmpty>
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
