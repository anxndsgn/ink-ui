import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectSeparator,
} from "registry/default/ui/select";
export function SelectWithGroupsExample() {
  const items = [
    { value: "react", label: "React" },
    { value: "vue", label: "Vue" },
    { value: "svelte", label: "Svelte" },
    { value: "next", label: "Next.js" },
    { value: "nuxt", label: "Nuxt" },
    { value: "astro", label: "Astro" },
  ];

  return (
    <div className="flex flex-wrap items-center gap-4">
      <Select items={items} defaultValue="react">
        <SelectTrigger variant="outline" className="w-56">
          <SelectValue placeholder="Select a framework" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="react">React</SelectItem>
          <SelectItem value="vue">Vue</SelectItem>
          <SelectItem value="svelte">Svelte</SelectItem>
          <SelectSeparator />
          <SelectItem value="next">Next.js</SelectItem>
          <SelectItem value="nuxt">Nuxt</SelectItem>
          <SelectItem value="astro">Astro</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
