import {
  NumberField,
  NumberFieldDecrement,
  NumberFieldGroup,
  NumberFieldIncrement,
  NumberFieldInput,
  NumberFieldScrubArea,
  NumberFieldScrubAreaCursor,
} from "registry/default/ui/number-field";

export function NumberFieldScrubExample() {
  return (
    <div className="w-full max-w-48">
      <NumberField defaultValue={100} id="scrub-amount">
        <NumberFieldScrubArea>
          <label
            htmlFor="scrub-amount"
            className="cursor-ew-resize text-sm font-medium text-foreground select-none"
          >
            Amount
          </label>
          <NumberFieldScrubAreaCursor />
        </NumberFieldScrubArea>
        <NumberFieldGroup className="mt-1.5">
          <NumberFieldDecrement />
          <NumberFieldInput />
          <NumberFieldIncrement />
        </NumberFieldGroup>
      </NumberField>
    </div>
  );
}
