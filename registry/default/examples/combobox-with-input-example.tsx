import {
  Combobox,
  ComboboxContent,
  ComboboxItem,
  ComboboxList,
  ComboboxInput,
  ComboboxEmpty,
} from "registry/default/ui/combobox";
const fruits = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "blueberry", label: "Blueberry" },
  { value: "grapes", label: "Grapes" },
  { value: "pineapple", label: "Pineapple" },
];
export function ComboboxWithInputExample() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Combobox items={fruits}>
        <ComboboxInput placeholder="Select fruits" className="w-56" />
        <ComboboxContent>
          <ComboboxList>
            {(item: (typeof fruits)[number]) => (
              <ComboboxItem key={item.value} value={item}>
                {item.label}
              </ComboboxItem>
            )}
          </ComboboxList>
          <ComboboxEmpty>No results found</ComboboxEmpty>
        </ComboboxContent>
      </Combobox>
    </div>
  );
}
