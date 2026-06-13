import { Button } from "registry/default/ui/button";
import { ButtonGroup, ButtonGroupText } from "registry/default/ui/button-group";
import { Input } from "registry/default/ui/input";
export function ButtonGroupTextExample() {
  return (
    <ButtonGroup>
      <ButtonGroupText>https://</ButtonGroupText>
      <Input placeholder="ink-ui.com" />
      <Button variant="outline">Go</Button>
    </ButtonGroup>
  );
}
