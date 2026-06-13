import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "registry/default/ui/select";
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
