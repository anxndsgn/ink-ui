import { createFileRoute } from "@tanstack/react-router";
import { ComponentCanvas } from "../components/home/component-canvas";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ink UI" },
      {
        name: "description",
        content: "Ink UI - a warm component library",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return <ComponentCanvas />;
}
