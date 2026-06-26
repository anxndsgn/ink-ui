import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "registry/default/ui/accordion";

export function AccordionMultipleExample() {
  return (
    <Accordion className="w-full max-w-md" multiple defaultValue={["item-1", "item-2"]}>
      <AccordionItem value="item-1">
        <AccordionTrigger>Shipping</AccordionTrigger>
        <AccordionContent>
          Orders are processed within 1–2 business days and shipped worldwide.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Returns</AccordionTrigger>
        <AccordionContent>
          Items can be returned within 30 days of delivery for a full refund.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Warranty</AccordionTrigger>
        <AccordionContent>
          Every product is covered by a one-year limited warranty against defects.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
