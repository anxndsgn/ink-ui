import { Button } from "registry/default/ui/button";
import { ButtonGroup, ButtonGroupSeparator } from "registry/default/ui/button-group";
export function ButtonGroupSeparatorExample() {
  return (
    <ButtonGroup>
      <Button>Copy</Button>
      <ButtonGroupSeparator />
      <Button>Paste</Button>
    </ButtonGroup>
  );
}
