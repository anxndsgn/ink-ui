import {
  Combobox,
  ComboboxContent,
  ComboboxItem,
  ComboboxList,
  ComboboxInput,
} from "registry/default/ui/combobox";
import { useState } from "react";
const fruits = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "blueberry", label: "Blueberry" },
  { value: "grapes", label: "Grapes" },
  { value: "pineapple", label: "Pineapple" },
];
export function ComboboxControlledExample() {
  const [value, setValue] = useState<(typeof fruits)[number] | null>(null);

  return (
    <div className="flex flex-col gap-3">
      <Combobox items={fruits} value={value} onValueChange={(v) => setValue(v)}>
        <ComboboxInput placeholder="Select a fruit" className="w-full" />
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
      {value && <p className="text-sm text-gray-500">Selected: {value.label}</p>}
    </div>
  );
}
