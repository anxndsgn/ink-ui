import {
  Combobox,
  ComboboxContent,
  ComboboxItem,
  ComboboxList,
  ComboboxInput,
  ComboboxValue,
  ComboboxChip,
} from "registry/default/ui/combobox";
import { useState } from "react";
const fruits = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "blueberry", label: "Blueberry" },
  { value: "grapes", label: "Grapes" },
  { value: "pineapple", label: "Pineapple" },
];
export function ComboboxMultiSelectExample() {
  const [value, setValue] = useState<(typeof fruits)[number][]>([]);

  return (
    <div className="flex flex-col gap-3">
      <Combobox items={fruits} value={value} onValueChange={(v) => setValue(v ?? [])} multiple>
        <ComboboxInput
          className="w-56"
          placeholder={value.length > 0 ? "" : "Select fruits"}
          showRemove={false}
        >
          <ComboboxValue>
            {(selectedValue: (typeof fruits)[number][]) =>
              selectedValue.map((item) => (
                <ComboboxChip key={item.value}>{item.label}</ComboboxChip>
              ))
            }
          </ComboboxValue>
        </ComboboxInput>
        <ComboboxContent>
          <ComboboxList>
            {(item: (typeof fruits)[number]) => (
              <ComboboxItem key={item.value} value={item}>
                {item.label}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  );
}
