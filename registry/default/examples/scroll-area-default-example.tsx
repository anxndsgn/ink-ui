import { ScrollArea } from "registry/default/ui/scroll-area";
const longContent = Array.from({ length: 20 }, (_, i) => (
  <p key={i} className="text-sm text-muted-foreground">
    Line {i + 1}: The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor
    jugs.
  </p>
));
export function ScrollAreaExample() {
  return (
    <div className="flex items-start justify-center">
      <ScrollArea className="h-48 w-72 rounded-md bg-muted">
        <div className="flex flex-col gap-3 p-4">{longContent}</div>
      </ScrollArea>
    </div>
  );
}
