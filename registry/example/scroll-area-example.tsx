import { ScrollArea } from "@registry/components/ui/scroll-area";

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

export function ScrollAreaHorizontalExample() {
  return (
    <div className="flex items-start justify-center">
      <ScrollArea className="w-72 whitespace-nowrap rounded-md bg-muted">
        <div className="flex w-max gap-4 p-4">
          {Array.from({ length: 10 }, (_, i) => (
            <div
              key={i}
              className="flex h-16 w-32 shrink-0 items-center justify-center rounded-md bg-secondary text-sm font-medium"
            >
              Item {i + 1}
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
