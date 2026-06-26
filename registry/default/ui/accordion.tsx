import { Accordion as BaseAccordion } from "@base-ui/react/accordion";
import { cn } from "@/lib/utils";
import { CaretDownIcon } from "@phosphor-icons/react/dist/ssr";

function Accordion({ className, ...props }: BaseAccordion.Root.Props) {
  return (
    <BaseAccordion.Root
      data-slot="accordion"
      className={cn("rounded-2xl bg-muted", className)}
      {...props}
    />
  );
}

function AccordionItem({ className, ...props }: BaseAccordion.Item.Props) {
  return (
    <BaseAccordion.Item
      className={cn("border-b border-border last:border-b-0", className)}
      data-slot="accordion-item"
      {...props}
    />
  );
}

function AccordionTrigger({ className, children, ...props }: BaseAccordion.Trigger.Props) {
  return (
    <BaseAccordion.Header className="flex" data-slot="accordion-header">
      <BaseAccordion.Trigger
        className={cn(
          "group flex flex-1 items-center justify-between gap-4 px-4 pt-4 pb-4 text-left text-sm font-medium text-foreground transition-[color,padding-bottom] duration-200 ease-out outline-none hover:text-foreground/80 focus-visible:ring-2 focus-visible:ring-ring data-disabled:pointer-events-none data-disabled:opacity-50 data-panel-open:pb-2",
          className,
        )}
        data-slot="accordion-trigger"
        {...props}
      >
        {children}
        <CaretDownIcon
          aria-hidden
          className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-data-panel-open:rotate-180"
        />
      </BaseAccordion.Trigger>
    </BaseAccordion.Header>
  );
}

function AccordionContent({ className, children, ...props }: BaseAccordion.Panel.Props) {
  return (
    <BaseAccordion.Panel
      className="h-(--accordion-panel-height) overflow-hidden text-sm text-muted-foreground transition-[height] duration-200 ease-out data-ending-style:h-0 data-starting-style:h-0"
      data-slot="accordion-content"
      {...props}
    >
      <div className={cn("px-4 pb-4", className)}>{children}</div>
    </BaseAccordion.Panel>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
