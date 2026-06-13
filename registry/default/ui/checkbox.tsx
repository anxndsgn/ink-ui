import { Checkbox as BaseCheckbox } from "@base-ui/react/checkbox";
import { CheckboxGroup as BaseCheckboxGroup } from "@base-ui/react/checkbox-group";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";

function CheckboxGroup({ className, ...props }: BaseCheckboxGroup.Props) {
  return (
    <BaseCheckboxGroup
      className={cn("flex flex-col gap-2", className)}
      data-slot="checkbox-group"
      {...props}
    />
  );
}

function Checkbox({ className, ...props }: BaseCheckbox.Root.Props) {
  return (
    <BaseCheckbox.Root
      className={cn(
        "data-disabled:pointer-not-allowed relative inline-flex size-4.5 shrink-0 items-center justify-center rounded-sm border border-input bg-muted ring-ring outline-none before:pointer-events-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-offset-background aria-invalid:border-destructive/36 focus-visible:aria-invalid:border-destructive/64 focus-visible:aria-invalid:ring-destructive/48 data-disabled:opacity-50 sm:size-4 dark:not-data-checked:bg-gray-950/32 dark:aria-invalid:ring-destructive/24",
        "data-checked:bg-accent data-indeterminate:bg-accent",
        className,
      )}
      data-slot="checkbox"
      {...props}
    >
      <BaseCheckbox.Indicator
        className="absolute inset-0 flex items-center justify-center rounded-sm"
        data-slot="checkbox-indicator"
        keepMounted
        render={(props, state) => (
          <span {...props}>
            <AnimatePresence initial={false}>
              {(state.checked || state.indeterminate) && (
                <motion.span
                  animate={{ filter: "blur(0px)", opacity: 1, scale: 1 }}
                  className="absolute inset-0 flex items-center justify-center text-accent-foreground"
                  exit={{ filter: "blur(2px)", opacity: 0, scale: 0.8 }}
                  initial={{ filter: "blur(2px)", opacity: 0, scale: 0.8 }}
                  key={state.indeterminate ? "indeterminate" : "checked"}
                  transition={{ duration: 0.2, ease: [0.86, 0, 0.07, 1] }}
                >
                  {state.indeterminate ? <IndeterminateIcon /> : <CheckmarkIcon />}
                </motion.span>
              )}
            </AnimatePresence>
          </span>
        )}
      />
    </BaseCheckbox.Root>
  );
}

function CheckmarkIcon() {
  return (
    <motion.svg aria-hidden="true" className="size-3.5 sm:size-3" fill="none" viewBox="0 0 14 14">
      <motion.path
        animate={{ pathLength: 1 }}
        d="M3 7.25L5.75 10L11 4"
        initial={{ pathLength: 0 }}
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        transition={{ duration: 0.2, ease: [0.86, 0, 0.07, 1] }}
      />
    </motion.svg>
  );
}

function IndeterminateIcon() {
  return (
    <motion.svg aria-hidden="true" className="size-3.5 sm:size-3" fill="none" viewBox="0 0 14 14">
      <motion.path
        animate={{ pathLength: 1 }}
        d="M3.5 7H10.5"
        initial={{ pathLength: 0 }}
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.5"
        transition={{ duration: 0.2, ease: [0.86, 0, 0.07, 1] }}
      />
    </motion.svg>
  );
}

export { CheckboxGroup, Checkbox };
