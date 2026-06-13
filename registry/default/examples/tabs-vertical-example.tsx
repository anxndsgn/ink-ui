import { Tabs, TabsList, TabsTab, TabsPanel } from "registry/default/ui/tabs";
const tabContentClassName =
  "w-full rounded-lg bg-gray-100 p-4 text-sm text-gray-600 dark:bg-gray-900 dark:text-gray-400";
export function TabsVerticalExample() {
  return (
    <div className="flex flex-col items-start justify-center">
      <Tabs defaultValue="general" orientation="vertical" className="w-full max-w-72">
        <TabsList>
          <TabsTab value="general">General</TabsTab>
          <TabsTab value="display">Display</TabsTab>
          <TabsTab value="advanced">Advanced</TabsTab>
        </TabsList>
        <TabsPanel value="general">
          <p className={tabContentClassName}>General settings for your application.</p>
        </TabsPanel>
        <TabsPanel value="display">
          <p className={tabContentClassName}>Customize display and appearance options.</p>
        </TabsPanel>
        <TabsPanel value="advanced">
          <p className={tabContentClassName}>Advanced configuration and experimental features.</p>
        </TabsPanel>
      </Tabs>
    </div>
  );
}
