import { useState } from "react";
import {
  NumberField,
  NumberFieldDecrement,
  NumberFieldGroup,
  NumberFieldIncrement,
  NumberFieldInput,
} from "registry/default/ui/number-field";

export function NumberFieldControlledExample() {
  const [value, setValue] = useState<number | null>(50);

  return (
    <div className="flex w-full max-w-48 flex-col gap-3">
      <NumberField value={value} onValueChange={setValue} step={5} min={0} max={100}>
        <NumberFieldGroup>
          <NumberFieldDecrement />
          <NumberFieldInput />
          <NumberFieldIncrement />
        </NumberFieldGroup>
      </NumberField>
      <span className="text-sm text-muted-foreground">
        Value: {value === null ? "empty" : value}
      </span>
    </div>
  );
}
