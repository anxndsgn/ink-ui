import {
  Autocomplete,
  AutocompleteCollection,
  AutocompleteContent,
  AutocompleteEmpty,
  AutocompleteGroup,
  AutocompleteGroupLabel,
  AutocompleteInput,
  AutocompleteInputGroup,
  AutocompleteItem,
  AutocompleteList,
} from "registry/default/ui/autocomplete";

const frameworks = [
  { value: "Frontend", items: ["React", "Vue", "Svelte", "Solid"] },
  { value: "Backend", items: ["Express", "Fastify", "NestJS", "Hono"] },
  { value: "Meta", items: ["Next.js", "Nuxt", "Astro", "Remix"] },
];

export function AutocompleteWithGroupsExample() {
  return (
    <div className="w-full max-w-64">
      <Autocomplete items={frameworks}>
        <AutocompleteInputGroup>
          <AutocompleteInput placeholder="Search a framework" />
        </AutocompleteInputGroup>
        <AutocompleteContent>
          <AutocompleteEmpty>No frameworks found.</AutocompleteEmpty>
          <AutocompleteList>
            {(group: (typeof frameworks)[number]) => (
              <AutocompleteGroup key={group.value} items={group.items}>
                <AutocompleteGroupLabel>{group.value}</AutocompleteGroupLabel>
                <AutocompleteCollection>
                  {(item: string) => (
                    <AutocompleteItem key={item} value={item}>
                      {item}
                    </AutocompleteItem>
                  )}
                </AutocompleteCollection>
              </AutocompleteGroup>
            )}
          </AutocompleteList>
        </AutocompleteContent>
      </Autocomplete>
    </div>
  );
}
