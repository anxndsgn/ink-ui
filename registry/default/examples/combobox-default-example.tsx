import {
  Combobox,
  ComboboxContent,
  ComboboxItem,
  ComboboxList,
  ComboboxTrigger,
  ComboboxValue,
} from "registry/default/ui/combobox";
const fruits = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "blueberry", label: "Blueberry" },
  { value: "grapes", label: "Grapes" },
  { value: "pineapple", label: "Pineapple" },
];
export function ComboboxExample() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Combobox items={fruits}>
        <ComboboxTrigger className="w-56">
          <ComboboxValue placeholder="Select a fruit" />
        </ComboboxTrigger>
        <ComboboxContent>
          <ComboboxList>
            {(item: (typeof fruits)[number]) => (
              <ComboboxItem key={item.value} value={item.value}>
                {item.label}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  );
}
