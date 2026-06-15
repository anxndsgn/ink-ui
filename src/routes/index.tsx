import { createFileRoute } from "@tanstack/react-router";
import { ComponentCanvas } from "../components/home/component-canvas";
import { SITE_NAME, buildSeoMeta, ogImageUrl } from "../lib/seo";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [{ title: SITE_NAME }, ...buildSeoMeta({ title: SITE_NAME, image: ogImageUrl() })],
  }),
  component: HomePage,
});

function HomePage() {
  return <ComponentCanvas />;
}
