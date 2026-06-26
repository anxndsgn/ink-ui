import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "registry/default/ui/accordion";

export function AccordionDisabledExample() {
  return (
    <Accordion className="w-full max-w-md" defaultValue={["item-1"]}>
      <AccordionItem value="item-1">
        <AccordionTrigger>Available section</AccordionTrigger>
        <AccordionContent>This item can be toggled open and closed as usual.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2" disabled>
        <AccordionTrigger>Disabled section</AccordionTrigger>
        <AccordionContent>
          You should not be able to read this because the item is disabled.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Another available section</AccordionTrigger>
        <AccordionContent>This item is interactive just like the first one.</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
