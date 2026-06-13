import { Button } from "registry/default/ui/button";
import { ButtonGroup } from "registry/default/ui/button-group";
import { CaretLeftIcon, CaretRightIcon, PlusIcon } from "@phosphor-icons/react";
export function ButtonGroupNestedExample() {
  return (
    <ButtonGroup>
      <ButtonGroup>
        <Button variant="outline" size="icon">
          <CaretLeftIcon />
        </Button>
        <Button variant="outline" size="icon">
          <CaretRightIcon />
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        <Button variant="outline">
          <PlusIcon />
          New
        </Button>
      </ButtonGroup>
    </ButtonGroup>
  );
}
