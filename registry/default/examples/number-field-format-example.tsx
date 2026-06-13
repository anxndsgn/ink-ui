import {
  NumberField,
  NumberFieldDecrement,
  NumberFieldGroup,
  NumberFieldIncrement,
  NumberFieldInput,
} from "registry/default/ui/number-field";

export function NumberFieldFormatExample() {
  return (
    <div className="flex w-full max-w-56 flex-col gap-4">
      <NumberField defaultValue={19.99} step={0.5} format={{ style: "currency", currency: "USD" }}>
        <NumberFieldGroup>
          <NumberFieldDecrement />
          <NumberFieldInput />
          <NumberFieldIncrement />
        </NumberFieldGroup>
      </NumberField>
      <NumberField defaultValue={0.25} step={0.05} min={0} max={1} format={{ style: "percent" }}>
        <NumberFieldGroup>
          <NumberFieldDecrement />
          <NumberFieldInput />
          <NumberFieldIncrement />
        </NumberFieldGroup>
      </NumberField>
    </div>
  );
}
