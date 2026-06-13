import {
  NumberField,
  NumberFieldDecrement,
  NumberFieldGroup,
  NumberFieldIncrement,
  NumberFieldInput,
} from "registry/default/ui/number-field";

export function NumberFieldExample() {
  return (
    <div className="w-full max-w-48">
      <NumberField defaultValue={1} min={0} max={10}>
        <NumberFieldGroup>
          <NumberFieldDecrement />
          <NumberFieldInput />
          <NumberFieldIncrement />
        </NumberFieldGroup>
      </NumberField>
    </div>
  );
}
