import {
  NumberField,
  NumberFieldDecrement,
  NumberFieldGroup,
  NumberFieldIncrement,
  NumberFieldInput,
} from "registry/default/ui/number-field";

export function NumberFieldSizesExample() {
  return (
    <div className="flex w-full max-w-48 flex-col gap-4">
      {(["sm", "default", "lg"] as const).map((size) => (
        <NumberField key={size} defaultValue={5}>
          <NumberFieldGroup size={size}>
            <NumberFieldDecrement />
            <NumberFieldInput />
            <NumberFieldIncrement />
          </NumberFieldGroup>
        </NumberField>
      ))}
    </div>
  );
}
