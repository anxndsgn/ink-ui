import { useState, useCallback } from "react";
import { Button } from "@registry/components/ui/button";
import { CopySimpleIcon, CheckIcon, CaretDownIcon, CaretUpIcon } from "@phosphor-icons/react";

interface CodeBlockToolbarProps {
  code: string;
  collapsible: boolean;
  initialCollapsed?: boolean;
}

export function CodeBlockToolbar({
  code,
  collapsible,
  initialCollapsed = false,
}: CodeBlockToolbarProps) {
  const [copied, setCopied] = useState(false);
  const [collapsed, setCollapsed] = useState(initialCollapsed);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code:", err);
    }
  }, [code]);

  const handleCollapse = useCallback(() => {
    setCollapsed((prev) => {
      const next = !prev;
      const block = document.activeElement?.closest(".code-block");
      if (!block) return prev;

      const content = block.querySelector(".code-block-content") as HTMLElement | null;
      const fade = block.querySelector(".code-block-fade") as HTMLElement | null;

      if (content) {
        content.dataset.collapsed = String(next);
      }
      if (fade) {
        fade.dataset.visible = String(next);
      }

      return next;
    });
  }, []);

  return (
    <div className="flex gap-1">
      <Button
        aria-label={copied ? "Copied" : "Copy code"}
        onClick={handleCopy}
        className="bg-muted not-data-disabled:hover:bg-muted/80"
        size="icon-sm"
        variant="secondary"
      >
        {copied ? <CheckIcon size={14} /> : <CopySimpleIcon size={14} />}
      </Button>
      {collapsible && (
        <Button
          aria-label={collapsed ? "Expand code" : "Collapse code"}
          onClick={handleCollapse}
          className="bg-muted not-data-disabled:hover:bg-muted/80"
          size="icon-sm"
          variant="secondary"
        >
          {collapsed ? <CaretDownIcon size={14} /> : <CaretUpIcon size={14} />}
        </Button>
      )}
    </div>
  );
}
