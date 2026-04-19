import { Button } from "@registry/components/ui/button";
import { useState } from "react";
import { PlusIcon } from "@phosphor-icons/react";

export function ButtonExample() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Button>Button</Button>
    </div>
  );
}

export function SecondaryButtonExample() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Button variant="secondary">Secondary</Button>
    </div>
  );
}

export function OutlineButtonExample() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Button variant="outline">Outline</Button>
    </div>
  );
}

export function GhostButtonExample() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Button variant="ghost">Ghost</Button>
    </div>
  );
}

export function DestructiveButtonExample() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Button variant="destructive">Destructive</Button>
    </div>
  );
}

export function LoadingButtonExample() {
  const [loading, setLoading] = useState(false);

  return (
    <Button
      loading={loading}
      onClick={() => {
        setLoading(true);
        setTimeout(() => setLoading(false), 1000);
      }}
    >
      Click me
    </Button>
  );
}

export function RevertButtonExample() {
  return (
    <div className="flex flex-wrap items-center gap-4 bg-gray-950 dark:bg-gray-50 p-4 rounded w-full h-32 justify-center">
      <Button variant="revert">Revert</Button>
    </div>
  );
}

export function IconButtonExample() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Button variant="outline" size="icon">
        <PlusIcon />
      </Button>
    </div>
  );
}

export function ButtonSizesExample() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
      <Button size="icon">
        <PlusIcon />
      </Button>
      <Button size="icon-sm">
        <PlusIcon />
      </Button>
    </div>
  );
}
