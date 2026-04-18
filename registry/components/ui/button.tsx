import { Button as BaseButton } from "@base-ui/react/button";
import { cn } from "@registry/lib/utils";
import { SpinnerIcon } from "@phosphor-icons/react";
import { cva } from "class-variance-authority";
import type { VariantProps } from "class-variance-authority";
import { AnimatePresence, motion } from "motion/react";

const buttonVariants = cva(
  "font-regular data-disabled:pointer-not-allowed relative inline-flex shrink-0 items-center justify-center gap-2 overflow-hidden rounded-lg text-sm whitespace-nowrap transition-all outline-none focus-visible:ring-[3px] focus-visible:ring-ring not-data-disabled:active:scale-[0.98] aria-invalid:border-destructive aria-invalid:ring-destructive/20 data-disabled:cursor-not-allowed data-disabled:opacity-50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    defaultVariants: {
      size: "default",
      variant: "default",
    },
    variants: {
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        icon: "size-9",
        "icon-sm": "size-8",
        lg: "h-10 px-6 has-[>svg]:px-4",
        sm: "h-8 gap-1.5 px-3 has-[>svg]:px-2.5",
      },
      variant: {
        default:
          "bg-primary text-primary-foreground not-data-disabled:hover:bg-primary/90 not-data-disabled:active:bg-primary/80 data-popup-open:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground not-data-disabled:hover:bg-destructive/90 focus-visible:ring-destructive/30 data-popup-open:bg-destructive/90",
        ghost:
          "bg-transparent text-foreground not-data-disabled:hover:bg-secondary data-popup-open:bg-secondary",
        outline:
          "border border-input text-foreground not-data-disabled:hover:bg-secondary data-popup-open:bg-secondary",
        revert:
          "bg-muted text-foreground not-data-disabled:hover:bg-muted/80 data-popup-open:bg-muted/80",
        secondary:
          "bg-secondary text-secondary-foreground not-data-disabled:hover:bg-secondary/60 data-popup-open:bg-secondary/60",
      },
    },
  },
);

type ButtonProps = BaseButton.Props &
  VariantProps<typeof buttonVariants> & {
    loading?: boolean;
  };

function Button({ variant, size, className, children, loading, disabled, ...props }: ButtonProps) {
  return (
    <BaseButton
      className={cn(
        buttonVariants({ className, size, variant }),
        loading && "data-disabled:cursor-wait",
      )}
      disabled={loading || disabled}
      data-slot="button"
      focusableWhenDisabled
      {...props}
    >
      <motion.span
        animate={{
          filter: loading ? "blur(4px)" : "blur(0px)",
          opacity: loading ? 0 : 1,
          scale: loading ? 0.8 : 1,
        }}
        className="flex items-center gap-2"
        transition={{ duration: 0.2 }}
        initial={false}
      >
        {children}
      </motion.span>
      <AnimatePresence initial={false}>
        {loading && (
          <motion.span
            animate={{ filter: "blur(0px)", opacity: 1, scale: 1 }}
            className="absolute inset-0 flex items-center justify-center"
            exit={{ filter: "blur(4px)", opacity: 0, scale: 0.8 }}
            initial={{ filter: "blur(4px)", opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            <SpinnerIcon className="size-4 animate-spin" />
          </motion.span>
        )}
      </AnimatePresence>
    </BaseButton>
  );
}
export { Button, buttonVariants };
