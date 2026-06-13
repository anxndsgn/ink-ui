import {
  Children,
  isValidElement,
  useMemo,
  useState,
  type ReactElement,
  type ReactNode,
} from "react";
import { Tabs, TabsList, TabsPanel, TabsTab } from "registry/default/ui/tabs";
import { ComponentSource } from "./component-source";

type TabValue = "preview" | "source";

export function ComponentTabs({
  children,
  preview,
  source,
  defaultValue = "preview",
}: {
  children?: ReactNode;
  preview?: ReactNode;
  source?: ReactNode | string;
  defaultValue?: TabValue;
}) {
  const slots = useMemo(() => resolveSlots(children, preview, source), [children, preview, source]);
  const [activeTab, setActiveTab] = useState<TabValue>(defaultValue);

  return (
    <Tabs
      className="gap-2"
      value={activeTab}
      onValueChange={(value) => setActiveTab(value as TabValue)}
    >
      <TabsList size="sm" className="w-fit max-w-full self-start" aria-label="Component view">
        <TabsTab value="preview">Preview</TabsTab>
        <TabsTab value="source">Source</TabsTab>
      </TabsList>
      {activeTab === "preview" ? (
        <TabsPanel value="preview" className="block min-h-65">
          {slots.preview}
        </TabsPanel>
      ) : null}
      {activeTab === "source" ? (
        <TabsPanel value="source" className="min-h-65 [&>figure]:border-0">
          {slots.source}
        </TabsPanel>
      ) : null}
    </Tabs>
  );
}

function resolveSlots(children: ReactNode, preview?: ReactNode, source?: ReactNode | string) {
  const childArray = Children.toArray(children);
  const childPreview = childArray.find((child) => hasDisplayName(child, "ComponentPreview"));
  const childSource = childArray.find((child) => hasDisplayName(child, "ComponentSource"));

  return {
    preview: preview ?? childPreview ?? null,
    source:
      typeof source === "string" ? (
        <ComponentSource code={source} />
      ) : (
        (source ?? childSource ?? null)
      ),
  };
}

function hasDisplayName(child: ReactNode, displayName: string): child is ReactElement {
  return (
    isValidElement(child) &&
    typeof child.type !== "string" &&
    "displayName" in child.type &&
    child.type.displayName === displayName
  );
}
