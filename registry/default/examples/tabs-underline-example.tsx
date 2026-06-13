import { Tabs, TabsList, TabsTab, TabsPanel } from "registry/default/ui/tabs";
const tabContentClassName =
  "w-full rounded-lg bg-gray-100 p-4 text-sm text-gray-600 dark:bg-gray-900 dark:text-gray-400";
export function TabsUnderlineExample() {
  return (
    <div className="flex flex-col items-start justify-center">
      <Tabs defaultValue="overview" className="w-full max-w-72">
        <TabsList variant="underline">
          <TabsTab value="overview">Overview</TabsTab>
          <TabsTab value="analytics">Analytics</TabsTab>
          <TabsTab value="reports">Reports</TabsTab>
        </TabsList>
        <TabsPanel value="overview">
          <p className={tabContentClassName}>View your project overview and key metrics.</p>
        </TabsPanel>
        <TabsPanel value="analytics">
          <p className={tabContentClassName}>Dive into detailed analytics and trends.</p>
        </TabsPanel>
        <TabsPanel value="reports">
          <p className={tabContentClassName}>Generate and download custom reports.</p>
        </TabsPanel>
      </Tabs>
    </div>
  );
}
