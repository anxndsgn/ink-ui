import {
  Card,
  CardBody,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "registry/default/ui/card";
import { Button } from "registry/default/ui/button";
export function CardColumnFooterExample() {
  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>Subscribe</CardTitle>
        <CardDescription>Get the latest updates delivered to your inbox.</CardDescription>
      </CardHeader>
      <CardBody>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Join our newsletter for weekly insights and product updates.
        </p>
      </CardBody>
      <CardFooter direction="column">
        <Button className="w-full">Subscribe Now</Button>
        <Button variant="secondary" className="w-full">
          Learn More
        </Button>
      </CardFooter>
    </Card>
  );
}
