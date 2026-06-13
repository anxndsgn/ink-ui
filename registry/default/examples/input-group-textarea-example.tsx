import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "registry/default/ui/input-group";
export function InputGroupTextareaExample() {
  return (
    <div className="flex w-full max-w-sm flex-wrap items-center gap-4">
      <InputGroup>
        <InputGroupTextarea placeholder="Write a short message..." />
        <InputGroupAddon align="block-end">
          <InputGroupText>Press Cmd + Enter to send</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}
