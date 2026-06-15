import { createFileRoute } from "@tanstack/react-router";
import { fromJsx } from "@takumi-rs/helpers/jsx";
import { Renderer, initSync } from "@takumi-rs/wasm";
// The Cloudflare Vite plugin resolves this `.wasm` import to a `WebAssembly.Module`
// (default export) at build time; the package's bundled types only describe the raw
// wasm-bindgen bindings (named exports, no default), so we ignore that here.
// @ts-expect-error -- .wasm default export is provided by the Cloudflare Vite plugin
import wasm from "@takumi-rs/wasm/takumi_wasm_bg.wasm";
import { SITE_NAME } from "@/lib/seo";

/**
 * Dynamic Open Graph image endpoint: `/api/og.png?title=...&description=...`
 *
 * Rendered with Takumi's WASM build, driven directly via `@takumi-rs/wasm`.
 *
 * We intentionally do NOT use `@takumi-rs/image-response` here: its `render()`
 * resolves the WASM through a `/* @vite-ignore *\/ import("@takumi-rs/wasm")`
 * that Vite leaves unbundled, which works in `vite dev` but throws
 * `No such module "@takumi-rs/wasm"` on the built Cloudflare Worker. Static
 * imports of the renderer + `.wasm` module get bundled by the Cloudflare Vite
 * plugin (the `.wasm` as a `WebAssembly.Module`), so this runs on workerd.
 *
 * The WASM build ships no default fonts and does not decompress WOFF2, so we
 * load an uncompressed variable TTF. We fetch it from an external CDN rather
 * than from our own `/fonts/...` asset: on Cloudflare Workers with Static
 * Assets, a Worker fetching an asset from its own origin can fail (the
 * subrequest re-enters the edge), which 500s in production even though it
 * works in the local miniflare preview. The external fetch is edge-cached and
 * the renderer is memoized per worker isolate.
 */
const FONT_URL = "https://cdn.jsdelivr.net/gh/rsms/inter@v4.1/docs/font-files/InterVariable.ttf";

let rendererPromise: Promise<Renderer> | null = null;

function getRenderer(): Promise<Renderer> {
  rendererPromise ??= (async () => {
    initSync({ module: wasm });
    const res = await fetch(FONT_URL, {
      cf: { cacheTtl: 31_536_000, cacheEverything: true },
    } as RequestInit);
    if (!res.ok) throw new Error(`Failed to load OG font (${res.status}) from ${FONT_URL}`);
    const data = new Uint8Array(await res.arrayBuffer());
    return new Renderer({ fonts: [{ name: "Inter", data }] });
  })();
  return rendererPromise;
}

export const Route = createFileRoute("/api/og.png")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const params = new URL(request.url).searchParams;
        const title = params.get("title") ?? SITE_NAME;
        const description = params.get("description") ?? "";

        try {
          const renderer = await getRenderer();
          const { node, stylesheets } = await fromJsx(
            <div tw="flex h-full w-full flex-col bg-gray-900 p-20 text-neutral-50">
              <div tw="flex flex-1 flex-col justify-center">
                <div
                  tw="text-8xl tracking-tight"
                  style={{ fontWeight: 700, fontVariationSettings: "'wght' 700" }}
                >
                  {title}
                </div>
                {description ? (
                  <div tw="mt-8 text-3xl leading-snug text-neutral-400" style={{ fontWeight: 400 }}>
                    {description}
                  </div>
                ) : null}
              </div>
              <div tw="text-2xl text-neutral-500" style={{ fontWeight: 500 }}>
                {SITE_NAME}
              </div>
            </div>,
          );

          const png = renderer.render(node, {
            width: 1200,
            height: 630,
            format: "png",
            stylesheets,
          });

          return new Response(png.buffer as ArrayBuffer, {
            headers: {
              "Content-Type": "image/png",
              "Cache-Control": "public, max-age=31536000, immutable",
              "CDN-Cache-Control": "public, max-age=31536000, immutable",
            },
          });
        } catch (err) {
          // Reset so a transient failure (e.g. font fetch) can recover on retry.
          rendererPromise = null;
          const detail = err instanceof Error ? `${err.message}\n${err.stack ?? ""}` : String(err);
          return new Response(`OG image render failed:\n${detail}`, {
            status: 500,
            headers: { "Content-Type": "text/plain; charset=utf-8" },
          });
        }
      },
    },
  },
});
