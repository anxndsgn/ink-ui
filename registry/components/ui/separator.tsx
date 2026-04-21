import { Separator as BaseSeparator } from "@base-ui/react/separator";
import { cn } from "@registry/lib/utils";

export function Separator({ className, ...props }: BaseSeparator.Props) {
  return (
    <BaseSeparator
      className={cn(
        "shrink-0 bg-border data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-px data-[orientation=vertical]:not-[[class^='h-']]:not-[[class*='_h-']]:self-stretch",
        className,
      )}
      data-slot="separator"
      {...props}
    />
  );
}
