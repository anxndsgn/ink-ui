import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "registry/default/ui/select";
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
