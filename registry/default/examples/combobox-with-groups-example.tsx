import {
  Combobox,
  ComboboxContent,
  ComboboxItem,
  ComboboxList,
  ComboboxTrigger,
  ComboboxValue,
  ComboboxGroup,
  ComboboxGroupLabel,
} from "registry/default/ui/combobox";
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
