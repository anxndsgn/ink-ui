import { Button } from "registry/default/ui/button";
export function RevertButtonExample() {
  return (
    <div className="flex h-32 w-full flex-wrap items-center justify-center gap-4 rounded bg-gray-950 p-4 dark:bg-gray-50">
      <Button variant="revert">Revert</Button>
    </div>
  );
}
