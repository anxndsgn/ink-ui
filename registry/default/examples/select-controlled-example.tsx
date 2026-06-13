import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "registry/default/ui/select";
import { useState } from "react";
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
