import { Button } from "registry/default/ui/button";
import { ButtonGroup } from "registry/default/ui/button-group";
export function ButtonGroupOrientationExample() {
  return (
    <ButtonGroup orientation="vertical">
      <Button variant="outline">Top</Button>
      <Button variant="outline">Middle</Button>
      <Button variant="outline">Bottom</Button>
    </ButtonGroup>
  );
}
