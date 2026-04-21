import {
  Combobox,
  ComboboxContent,
  ComboboxItem,
  ComboboxList,
  ComboboxInput,
  ComboboxEmpty,
  ComboboxTrigger,
  ComboboxValue,
  ComboboxChip,
  ComboboxGroup,
  ComboboxGroupLabel,
} from "@registry/components/ui/combobox";
import { useState } from "react";

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

export function ComboboxWithGroupsExample() {
  const frontend = [
    { value: "react", label: "React" },
    { value: "vue", label: "Vue" },
    { value: "svelte", label: "Svelte" },
  ];

  const backend = [
    { value: "next", label: "Next.js" },
    { value: "nuxt", label: "Nuxt" },
    { value: "astro", label: "Astro" },
  ];

  const allItems = [
    { group: "Frontend", items: frontend },
    { group: "Backend", items: backend },
  ];

  return (
    <div className="flex flex-wrap items-center gap-4">
      <Combobox items={allItems}>
        <ComboboxTrigger className="w-56">
          <ComboboxValue placeholder="Select a framework" />
        </ComboboxTrigger>
        <ComboboxContent>
          <ComboboxList>
            {(group: (typeof allItems)[number]) => (
              <ComboboxGroup key={group.group}>
                <ComboboxGroupLabel>{group.group}</ComboboxGroupLabel>
                {group.items.map((item) => (
                  <ComboboxItem key={item.value} value={item.value}>
                    {item.label}
                  </ComboboxItem>
                ))}
              </ComboboxGroup>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  );
}

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
