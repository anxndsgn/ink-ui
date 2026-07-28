import { Avatar as BaseAvatar } from "@base-ui/react/avatar";
import { cn } from "@/lib/utils";

function Avatar({
  className,
  size = "default",
  ...props
}: BaseAvatar.Root.Props & {
  size?: "sm" | "default" | "lg";
}) {
  return (
    <BaseAvatar.Root
      className={cn(
        "group/avatar relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full align-middle select-none",
        "size-8 data-[size=lg]:size-10 data-[size=sm]:size-6",
        className,
      )}
      data-size={size}
      data-slot="avatar"
      {...props}
    />
  );
}

function AvatarImage({ className, ...props }: BaseAvatar.Image.Props) {
  return (
    <BaseAvatar.Image
      className={cn("aspect-square size-full object-cover", className)}
      data-slot="avatar-image"
      {...props}
    />
  );
}

function AvatarFallback({ className, ...props }: BaseAvatar.Fallback.Props) {
  return (
    <BaseAvatar.Fallback
      className={cn(
        "flex size-full items-center justify-center rounded-full bg-muted text-sm font-medium text-muted-foreground",
        "group-data-[size=lg]/avatar:text-base group-data-[size=sm]/avatar:text-xs",
        className,
      )}
      data-slot="avatar-fallback"
      {...props}
    />
  );
}

export { Avatar, AvatarImage, AvatarFallback };
