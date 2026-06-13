import { Tabs, TabsList, TabsTab, TabsPanel } from "registry/default/ui/tabs";
const tabContentClassName =
  "w-full rounded-lg bg-gray-100 p-4 text-sm text-gray-600 dark:bg-gray-900 dark:text-gray-400";
export function TabsExample() {
  return (
    <div className="flex flex-col items-start justify-center">
      <Tabs defaultValue="account" className="w-full max-w-72">
        <TabsList>
          <TabsTab value="account">Account</TabsTab>
          <TabsTab value="password">Password</TabsTab>
          <TabsTab value="settings">Settings</TabsTab>
        </TabsList>
        <TabsPanel value="account">
          <p className={tabContentClassName}>Manage your account settings.</p>
        </TabsPanel>
        <TabsPanel value="password">
          <p className={tabContentClassName}>Change your password.</p>
        </TabsPanel>
        <TabsPanel value="settings">
          <p className={tabContentClassName}>Configure application settings.</p>
        </TabsPanel>
      </Tabs>
    </div>
  );
}
