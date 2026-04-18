import { useState } from "react";
import { Button } from "@registry/components/ui/button";
import {
  Menu,
  MenuTrigger,
  MenuContent,
  MenuItem,
  MenuSeparator,
  MenuItemLeadingIcon,
  MenuItemLabel,
} from "@registry/components/ui/menu";
import {
  CopySimpleIcon,
  LinkSimpleIcon,
  FileMdIcon,
  CaretDownIcon,
  CheckIcon,
} from "@phosphor-icons/react";
import { OpenAiLogoIcon } from "@phosphor-icons/react";
import { ClaudeIcon } from "./icons/claude-icon";
import { cn } from "@registry/lib/utils";

interface CopyPageButtonProps {
  align?: "start" | "center" | "end";
}

export function CopyPageButton({ align = "end" }: CopyPageButtonProps) {
  const [copied, setCopied] = useState(false);

  const getMarkdownUrl = () => {
    const url = new URL(window.location.href);

    // /components/badge/ -> /components/badge.md
    // /changelog/2/ -> /changelog.md (paginated pages share one .md)
    let path = url.pathname.replace(/\/+$/, "");
    path = path.replace(/^\/changelog\/.*/, "/changelog");

    return `${url.origin}${path}.md`;
  };

  const onCopySuccess = () => {
    setCopied(true);

    setTimeout(() => setCopied(false), 2000); // 2 seconds
  };

  const handleCopyMarkdown = async () => {
    onCopySuccess();

    try {
      const markdownUrl = getMarkdownUrl();
      const response = await fetch(markdownUrl);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const markdown = await response.text();

      await navigator.clipboard.writeText(markdown);
    } catch (error) {
      console.error("Failed to copy page as Markdown:", error);
    }
  };

  const handleCopyPageLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
    } catch (error) {
      console.error("Failed to copy page link:", error);
    }
  };

  const handleViewMarkdown = () => window.open(getMarkdownUrl(), "_blank");

  const getAIPromptUrl = (baseUrl: string) => {
    const markdownUrl = getMarkdownUrl();
    const prompt = encodeURIComponent(
      `Read through this ink ui documentation: ${markdownUrl}. I'll need your help to understand it, so be prepared to explain concepts, share examples, and assist with debugging.`,
    );
    return `${baseUrl}?q=${prompt}`;
  };

  const handleOpenInClaude = () => window.open(getAIPromptUrl("https://claude.ai/new"), "_blank");

  const handleOpenInChatGPT = () => window.open(getAIPromptUrl("https://chatgpt.com"), "_blank");

  const ButtonIcon = copied ? CheckIcon : CopySimpleIcon;

  const dropdownItems = (
    <>
      <MenuItem onClick={handleCopyPageLink}>
        <MenuItemLeadingIcon render={<LinkSimpleIcon />} />
        <MenuItemLabel>Copy page link</MenuItemLabel>
      </MenuItem>
      <MenuItem onClick={handleViewMarkdown}>
        <MenuItemLeadingIcon render={<FileMdIcon />} />
        <MenuItemLabel>View Page as Markdown</MenuItemLabel>
      </MenuItem>
      <MenuSeparator />
      <MenuItem onClick={handleOpenInClaude}>
        <MenuItemLeadingIcon render={<ClaudeIcon />} />
        <MenuItemLabel>Open in Claude</MenuItemLabel>
      </MenuItem>
      <MenuItem onClick={handleOpenInChatGPT}>
        <MenuItemLeadingIcon render={<OpenAiLogoIcon />} />
        <MenuItemLabel>Open in ChatGPT</MenuItemLabel>
      </MenuItem>
    </>
  );

  return (
    <div className="flex items-center" data-copy-ignore>
      <Button
        className="gap-1.5 rounded-r-none border-r-0"
        onClick={handleCopyMarkdown}
        size="sm"
        variant="secondary"
      >
        <ButtonIcon size={16} />
        <span>Copy page</span>
      </Button>
      <Menu>
        <MenuTrigger
          render={
            <Button
              variant="secondary"
              size="icon-sm"
              aria-label="Copy page options"
              className={cn("rounded-l-none")}
            >
              <CaretDownIcon size={12} />
            </Button>
          }
        />
        <MenuContent positionerProps={{ align }}>{dropdownItems}</MenuContent>
      </Menu>
    </div>
  );
}
