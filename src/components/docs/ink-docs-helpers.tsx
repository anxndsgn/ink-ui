import type { CSSProperties, ReactNode } from "react";
import { propsRegistry } from "../../lib/props-registry";

export function ComponentSection({ children }: { children: ReactNode }) {
  return <section className="mb-12">{children}</section>;
}

export function PropsTable({ component, hideDescription = false }: { component: string; hideDescription?: boolean }) {
  const entry = propsRegistry[component];

  if (!entry) {
    return (
      <div className="text-sm text-muted-foreground">
        PropsTable not available for <code>{component}</code>.
      </div>
    );
  }

  if (entry.props.length === 0 && entry.extends) {
    return (
      <p className="text-sm text-muted-foreground">
        This component does not add any props on top of <BaseLink href={entry.extends.href}>{entry.extends.name}</BaseLink>. See the Base UI docs for the full API reference.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {entry.extends && !hideDescription ? (
        <p className="text-sm text-muted-foreground">
          The <code>{component}</code> component extends the <BaseLink href={entry.extends.href}>{entry.extends.name}</BaseLink> props and adds the following:
        </p>
      ) : null}
      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full text-left text-sm">
          <thead className="bg-muted text-xs font-medium text-muted-foreground uppercase">
            <tr>
              <th className="px-4 py-3">Prop</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Default</th>
              <th className="px-4 py-3">Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {entry.props.map((prop) => (
              <tr key={prop.name}>
                <td className="px-4 py-3 font-mono text-xs font-medium text-foreground">{prop.name}</td>
                <td className="px-4 py-3 font-mono text-xs text-orange-600 dark:text-orange-400">{prop.type}</td>
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{prop.defaultValue ?? "-"}</td>
                <td className="px-4 py-3 text-muted-foreground">{prop.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function Callout({ children }: { children: ReactNode; type?: "info" | "warning" | "error" }) {
  return <div className="my-6 border-l-2 border-border pl-4 text-muted-foreground">{children}</div>;
}

export function ColorSwatch({ bg, label, textColor = "text-white" }: { bg: string; label: string; textColor?: string }) {
  return (
    <div className="flex h-16 w-full items-center justify-center rounded-lg border border-black/5 dark:border-white/5" style={{ backgroundColor: bg }}>
      <span className={`text-sm font-bold tabular-nums ${textColor}`}>{label}</span>
    </div>
  );
}

const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const;
const values = {
  gray: { 50: "oklch(0.98559 0.002 48.697)", 100: "oklch(0.95 0.001 48.697)", 200: "oklch(0.925 0.002 48.697)", 300: "oklch(0.84598 0.002 48.697)", 400: "oklch(0.7374 0.002 48.697)", 500: "oklch(0.585 0.003 48.697)", 600: "oklch(0.46 0.002 48.697)", 700: "oklch(0.37 0.002 48.697)", 800: "oklch(0.31 0.001 48.697)", 900: "oklch(0.265 0.001 48.697)", 950: "oklch(0.21 0.002 48.697)" },
  red: { 50: "oklch(0.96453 0.015 24)", 100: "oklch(0.95036 0.03 24)", 200: "oklch(0.92601 0.045 24)", 300: "oklch(0.8455 0.07 24)", 400: "oklch(0.73813 0.135 24)", 500: "oklch(0.63497 0.18 24)", 600: "oklch(0.50144 0.15 24)", 700: "oklch(0.38998 0.125 24)", 800: "oklch(0.30985 0.095 24)", 900: "oklch(0.26461 0.06 24)", 950: "oklch(0.21016 0.04 24)" },
  orange: { 50: "oklch(0.96453 0.02 41.5)", 100: "oklch(0.95036 0.025 41.5)", 200: "oklch(0.92601 0.03 41.5)", 300: "oklch(0.8455 0.07 41.5)", 400: "oklch(0.73813 0.14 41.5)", 500: "oklch(0.63497 0.17 41.5)", 600: "oklch(0.50144 0.135 41.5)", 700: "oklch(0.38998 0.08 41.5)", 800: "oklch(0.30985 0.065 41.5)", 900: "oklch(0.26461 0.055 41.5)", 950: "oklch(0.21016 0.04 41.5)" },
} satisfies Record<string, Record<(typeof shades)[number], string>>;

export function ColorScale({ name }: { name: "gray" | "red" | "orange" }) {
  return (
    <div className="grid grid-cols-6 gap-3 sm:grid-cols-11">
      {shades.map((shade) => (
        <ColorSwatch key={shade} bg={values[name][shade]} label={`${shade}`} textColor={shade < 500 ? `text-${name}-900` : "text-white"} />
      ))}
    </div>
  );
}

export function ColorToken({ name, description }: { name: string; description?: string }) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-border p-3">
      <div className="h-10 w-10 shrink-0 rounded-md border border-black/5 dark:border-white/5" style={{ backgroundColor: `var(--${name})` } as CSSProperties} />
      <div className="flex min-w-0 flex-col">
        <span className="text-sm font-medium text-foreground">{name}</span>
        {description ? <span className="text-xs text-muted-foreground">{description}</span> : null}
      </div>
    </div>
  );
}

export function KeyboardShortcuts({ shortcuts }: { shortcuts: Array<{ keys: string[]; description: string }> }) {
  return (
    <div className="my-4 space-y-2">
      {shortcuts.map(({ keys, description }) => (
        <div key={`${keys.join("+")}-${description}`} className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            {keys.map((key, index) => (
              <span key={`${key}-${index}`} className="flex items-center gap-1">
                <kbd className="inline-flex min-w-6 items-center justify-center rounded border border-border bg-muted px-1.5 py-0.5 text-xs font-medium">{key}</kbd>
                {index < keys.length - 1 ? <span className="text-xs text-muted-foreground">+</span> : null}
              </span>
            ))}
          </span>
          <span className="text-muted-foreground">{description}</span>
        </div>
      ))}
    </div>
  );
}

function BaseLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a className="text-orange-600 underline underline-offset-2 hover:text-orange-700 dark:text-orange-400 dark:hover:text-orange-300" href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}
