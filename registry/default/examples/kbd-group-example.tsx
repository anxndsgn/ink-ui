import { Kbd, KbdGroup } from "registry/default/ui/kbd";

export function KbdGroupExample() {
  return (
    <div className="flex items-center gap-4">
      <KbdGroup>
        <Kbd>⌘</Kbd>
        <span className="text-muted-foreground">+</span>
        <Kbd>K</Kbd>
      </KbdGroup>
      <KbdGroup>
        <Kbd>Ctrl</Kbd>
        <span className="text-muted-foreground">+</span>
        <Kbd>Shift</Kbd>
        <span className="text-muted-foreground">+</span>
        <Kbd>B</Kbd>
      </KbdGroup>
    </div>
  );
}
