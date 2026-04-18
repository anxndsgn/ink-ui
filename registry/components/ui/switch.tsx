import { Switch as BaseSwitch } from "@base-ui/react/switch";
import { cn } from "@registry/lib/utils";

function Switch({ className, ...props }: BaseSwitch.Root.Props) {
  return (
    <BaseSwitch.Root
      className={cn(
        "group/switch inline-flex h-4.5 w-7.5 shrink-0 items-center rounded-full p-px transition-all outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-checked:bg-accent data-unchecked:bg-muted",
        className,
      )}
      data-slot="switch"
      {...props}
    >
      <BaseSwitch.Thumb
        className={cn(
          "pointer-events-none block size-4 rounded-full bg-white shadow-sm transition-[translate,width] group-active/switch:w-4.5 data-checked:translate-x-3 data-checked:group-active/switch:translate-x-2.5 data-unchecked:translate-x-0",
        )}
        data-slot="switch-thumb"
      />
    </BaseSwitch.Root>
  );
}

export { Switch };
