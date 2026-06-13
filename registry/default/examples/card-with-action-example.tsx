import {
  Card,
  CardAction,
  CardBody,
  CardDescription,
  CardHeader,
  CardTitle,
} from "registry/default/ui/card";
import { Button } from "registry/default/ui/button";
export function CardWithActionExample() {
  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>Manage your notification preferences.</CardDescription>
        <CardAction>
          <Button variant="ghost" size="sm">
            Mark all read
          </Button>
        </CardAction>
      </CardHeader>
      <CardBody>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          You have 3 unread notifications. Review them to stay up to date.
        </p>
      </CardBody>
    </Card>
  );
}
