import { Button } from "registry/default/ui/button";
import { useState } from "react";
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
