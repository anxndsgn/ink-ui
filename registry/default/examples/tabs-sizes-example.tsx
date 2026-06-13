import { Tabs, TabsList, TabsTab, TabsPanel } from "registry/default/ui/tabs";
const tabContentClassName =
  "w-full rounded-lg bg-gray-100 p-4 text-sm text-gray-600 dark:bg-gray-900 dark:text-gray-400";
export function TabsSizesExample() {
  return (
    <div className="flex flex-col items-start gap-6">
      <Tabs defaultValue="sm" className="w-full max-w-72">
        <TabsList size="sm">
          <TabsTab value="sm">Small</TabsTab>
          <TabsTab value="sm2">Tab 2</TabsTab>
        </TabsList>
        <TabsPanel value="sm">
          <p className={tabContentClassName}>Small size tabs.</p>
        </TabsPanel>
        <TabsPanel value="sm2">
          <p className={tabContentClassName}>Another small tab.</p>
        </TabsPanel>
      </Tabs>

      <Tabs defaultValue="default" className="w-full max-w-72">
        <TabsList size="default">
          <TabsTab value="default">Default</TabsTab>
          <TabsTab value="default2">Tab 2</TabsTab>
        </TabsList>
        <TabsPanel value="default">
          <p className={tabContentClassName}>Default size tabs.</p>
        </TabsPanel>
        <TabsPanel value="default2">
          <p className={tabContentClassName}>Another default tab.</p>
        </TabsPanel>
      </Tabs>

      <Tabs defaultValue="lg" className="w-full max-w-72">
        <TabsList size="lg">
          <TabsTab value="lg">Large</TabsTab>
          <TabsTab value="lg2">Tab 2</TabsTab>
        </TabsList>
        <TabsPanel value="lg">
          <p className={tabContentClassName}>Large size tabs.</p>
        </TabsPanel>
        <TabsPanel value="lg2">
          <p className={tabContentClassName}>Another large tab.</p>
        </TabsPanel>
      </Tabs>
    </div>
  );
}
