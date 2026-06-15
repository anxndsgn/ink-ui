import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { DocsShell } from "../components/site/docs-shell";
import { docsClientLoader } from "../lib/docs-client-loader";
import { getDocPage } from "../lib/docs-page-data";
import { buildSeoMeta, ogImageUrl } from "../lib/seo";

const getIndexDoc = createServerFn({ method: "GET" }).handler(async () => getDocPage([]));

export const Route = createFileRoute("/docs/")({
  loader: async () => {
    const data = await getIndexDoc();

    await docsClientLoader.preload(data.path);

    return data;
  },
  head: ({ loaderData }) => {
    const title = loaderData?.title ?? "Docs";
    const description = loaderData?.description ?? "Component documentation page.";

    return {
      meta: [
        { title: `${title} - Ink UI` },
        ...buildSeoMeta({ title, description, image: ogImageUrl({ title, description }) }),
      ],
    };
  },
  component: DocsIndexPage,
});

function DocsIndexPage() {
  const data = Route.useLoaderData();

  return <DocsShell>{docsClientLoader.useContent(data.path)}</DocsShell>;
}
