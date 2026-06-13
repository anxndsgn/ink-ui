import type { ReactNode } from "react";

export function DocsArticle({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <article>
      <header className="mb-8 border-b border-border pb-4">
        <h1 className="m-0 max-w-190 text-[clamp(2rem,4vw,3.1rem)] leading-[1.05] text-balance max-md:text-4xl max-md:leading-[1.02]">
          {title}
        </h1>
        {description ? (
          <p className="mt-4 text-sm leading-7 text-pretty text-muted-foreground">{description}</p>
        ) : null}
      </header>
      <div className="docs-article grid gap-6 *:min-w-0">{children}</div>
    </article>
  );
}
