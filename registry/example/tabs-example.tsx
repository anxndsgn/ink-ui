import { Tabs, TabsList, TabsTab, TabsPanel } from "@registry/components/ui/tabs";

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
