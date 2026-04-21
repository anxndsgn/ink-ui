import { Separator } from "@registry/components/ui/separator";

export function SeparatorExample() {
  return (
    <div className="w-full max-w-xs space-y-4">
      <div className="space-y-1">
        <p className="text-sm font-medium">Project Settings</p>
        <p className="text-sm text-muted-foreground">Manage your project preferences.</p>
      </div>
      <Separator />
      <div className="flex h-5 items-center gap-4 text-sm">
        <span>Profile</span>
        <Separator orientation="vertical" />
        <span>Settings</span>
        <Separator orientation="vertical" />
        <span>Help</span>
      </div>
    </div>
  );
}
