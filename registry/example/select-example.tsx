import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectSeparator,
} from "@registry/components/ui/select";
import { useState } from "react";

export function SelectExample() {
  const items = [
    { value: "apple", label: "Apple" },
    { value: "banana", label: "Banana" },
    { value: "blueberry", label: "Blueberry" },
    { value: "grapes", label: "Grapes" },
    { value: "pineapple", label: "Pineapple" },
  ];

  return (
    <div className="flex flex-wrap items-center gap-4">
      <Select items={items}>
        <SelectTrigger className="w-44">
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          {items.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export function SelectVariantsExample() {
  const variants = [
    { value: "outline", label: "Outline" },
    { value: "solid", label: "Solid" },
  ];

  const sizes = [
    { value: "sm", label: "Small" },
    { value: "default", label: "Default" },
    { value: "lg", label: "Large" },
  ];

  return (
    <div className="flex flex-wrap items-center gap-4">
      <Select items={variants} defaultValue="outline">
        <SelectTrigger variant="outline" className="w-44">
          <SelectValue placeholder="Variant" />
        </SelectTrigger>
        <SelectContent>
          {variants.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select items={sizes} defaultValue="sm">
        <SelectTrigger variant="outline" size="sm" className="w-44">
          <SelectValue placeholder="Size" />
        </SelectTrigger>
        <SelectContent>
          {sizes.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

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

export function SelectControlledExample() {
  const items = [
    { value: "typescript", label: "TypeScript" },
    { value: "python", label: "Python" },
    { value: "go", label: "Go" },
    { value: "rust", label: "Rust" },
  ];

  const [value, setValue] = useState("");

  return (
    <div className="flex flex-col gap-3">
      <Select items={items} value={value} onValueChange={(v) => setValue(v ?? "")}>
        <SelectTrigger variant="outline" className="w-44">
          <SelectValue placeholder="Pick a language" />
        </SelectTrigger>
        <SelectContent>
          {items.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {value && <p className="text-sm text-gray-500">Selected: {value}</p>}
    </div>
  );
}

export function SelectWithItemsExample() {
  const items = [
    { value: "utc", label: "UTC" },
    { value: "est", label: "Eastern Time" },
    { value: "cst", label: "Central Time" },
    { value: "mst", label: "Mountain Time" },
    { value: "pst", label: "Pacific Time" },
    { value: "jst", label: "Japan Standard Time" },
  ];

  return (
    <div className="flex flex-wrap items-center gap-4">
      <Select items={items} defaultValue="utc">
        <SelectTrigger variant="outline" className="w-56">
          <SelectValue placeholder="Select time zone" />
        </SelectTrigger>
        <SelectContent>
          {items.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
