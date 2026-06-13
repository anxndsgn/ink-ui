import {
  Card,
  CardBody,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "registry/default/ui/card";
import { Button } from "registry/default/ui/button";
export function CardExample() {
  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>Project Update</CardTitle>
        <CardDescription>Deploy your new project in one click.</CardDescription>
      </CardHeader>
      <CardBody>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Your project is ready for deployment. Review the settings and click deploy to go live.
        </p>
      </CardBody>
      <CardFooter>
        <Button variant="secondary">Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter>
    </Card>
  );
}
