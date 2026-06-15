/**
 * Centralized SEO / Open Graph helpers.
 *
 * The canonical site URL is read from the `VITE_SITE_URL` build-time env var
 * (set it when building/deploying) and falls back to the production domain
 * below. Using a Vite env var keeps the value inlined for both SSR and client
 * so `head()` functions can build absolute `og:image` URLs everywhere.
 */
const FALLBACK_SITE_URL = "https://ink-ui.com";

export const SITE_URL = (import.meta.env.VITE_SITE_URL ?? FALLBACK_SITE_URL).replace(/\/+$/, "");

export const SITE_NAME = "Ink UI";

export const DEFAULT_DESCRIPTION = "Ink UI — a warm component library.";

/** Build the absolute URL to the dynamic OG image endpoint. */
export function ogImageUrl(input?: { title?: string; description?: string }): string {
  const url = new URL("/api/og.png", SITE_URL);
  if (input?.title) url.searchParams.set("title", input.title);
  if (input?.description) url.searchParams.set("description", input.description);
  return url.toString();
}

/**
 * Build the Open Graph + Twitter meta tags for a page. Callers keep ownership
 * of the `{ title }` entry (used for the document `<title>`); this returns the
 * `description`, `og:*`, and `twitter:*` tags.
 */
export function buildSeoMeta(input: {
  title: string;
  description?: string;
  image?: string;
}): Array<Record<string, string>> {
  const description = input.description ?? DEFAULT_DESCRIPTION;
  const image = input.image ?? ogImageUrl({ title: input.title, description });

  return [
    { name: "description", content: description },
    { property: "og:type", content: "website" },
    { property: "og:site_name", content: SITE_NAME },
    { property: "og:title", content: input.title },
    { property: "og:description", content: description },
    { property: "og:image", content: image },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: input.title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: image },
  ];
}
