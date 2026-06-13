import { ScrollArea } from "registry/default/ui/scroll-area";
export function ScrollAreaHorizontalExample() {
  return (
    <div className="flex items-start justify-center">
      <ScrollArea className="w-72 rounded-md bg-muted whitespace-nowrap">
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
