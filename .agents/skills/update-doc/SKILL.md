---
name: update-doc
description: Add or update ink-ui component documentation pages in src/pages/components/. triggered when user says "add/update documentation for <component>".
---

# Adding/updating component documentation

This skill describes the full procedure for documenting a UI component on the ink-ui docs site.

## Overview

A component doc page has these pieces:

1. **Wrapper component** at `registry/components/ui/<component>.tsx` — styled wrapper around Base UI primitives
2. **Demo examples** at `registry/example/<component>-example.tsx` — exported React functions, one per example
3. **Doc page** at `src/pages/components/<component>.mdx` — MDX page with frontmatter, examples, installation, API reference
4. **Props registry** at `src/lib/props-registry.ts` — entries for `<PropsTable>`
5. **Sidebar nav** at `src/components/sidebar-nav.tsx` — add to `componentItems`

## 1. Check the wrapper component exists

The wrapper at `registry/components/ui/<component>.tsx` must exist and export named components. Read it to understand which sub-components are exported.

## 2. Create/update demo examples

Create `registry/example/<component>-example.tsx`. Each example must be an exported function.

Rules:

- Export one function per example variant: `export function ComponentExample() { ... }`
- Name convention: `<Feature><Component>Example`, e.g. `LoadingButtonExample`, `MenuWithIconsExample`
- Use `client:load` directive in MDX for interactive examples (state, effects, etc.)
- Import from `@registry/components/ui/<component>` and `@phosphor-icons/react` for icons
- Wrap multiple items in `<div className="flex flex-wrap items-center gap-4">`

The `ComponentExample` component auto-extracts source code via AST parsing. It scans `registry/example/**/*.tsx` for the function name and includes only the imports that function actually uses.

## 3. Create the MDX doc page

Create `src/pages/components/<component>.mdx` with this structure:

```mdx
---
layout: ~/layouts/mdx-doc-layout.astro
title: "ComponentName"
description: "Short description of what this component does."
baseUIComponent: "component-name"
---

import { Component, SubComponent } from "@registry/components/ui/component";
import { ComponentExample, VariantExample } from "@registry/example/component-example";
import ComponentExampleBlock from "~/components/docs/component-example.astro";
import ComponentSection from "~/components/docs/component-section.astro";
import PropsTable from "~/components/docs/props-table.astro";
import CodeBlock from "~/components/docs/code-block.astro";
import componentSource from "@registry/components/ui/component?raw";

<ComponentSection>
  <ComponentExampleBlock demo="ComponentExample">
    <ComponentExample client:load />
  </ComponentExampleBlock>
</ComponentSection>

## Examples

### Variant name

Brief description of what this example demonstrates.

<ComponentSection>
  <ComponentExampleBlock demo="VariantExample">
    <VariantExample client:load />
  </ComponentExampleBlock>
</ComponentSection>

## Installation

Copy the source code below into your project:

<CodeBlock code={componentSource} lang="tsx" />

## API Reference

### Component

<PropsTable component="Component" />

### SubComponent

<PropsTable component="SubComponent" />
```

Key notes:

- `baseUIComponent` in frontmatter links to Base UI docs (optional)
- Use `client:load` on interactive demos (anything with React state/hooks)
- The `demo` prop on `<ComponentExampleBlock>` auto-extracts source from the example file
- Include a `<ComponentSection>` wrapper around each `<ComponentExampleBlock>`
- The installation section uses `?raw` import to show the full wrapper source

## 4. Add props to the registry

Add entries to `src/lib/props-registry.ts` for each exported sub-component.

Registry rules:

- Only list **wrapper-specific props** (like `variant`, `size`, `positionerProps`) — NOT inherited Base UI props
- Use `extends` to link to the Base UI API reference for inherited props. you can check the Base UI docs to see which props are available for each primitive. the base ui doc link is like: https://base-ui.com/react/components/{componentName}.md
- If `extends` is set but `props` is empty, the table shows a link to Base UI docs instead of an empty table
- Use the same component names as the exports from the wrapper

Example entry:

```ts
MenuItem: {
  extends: {
    name: "Base UI Menu.Item",
    href: "https://base-ui.com/react/components/menu#api-reference",
  },
  props: [
    {
      name: "variant",
      type: '"default" | "destructive"',
      defaultValue: '"default"',
      description: "Visual style of the menu item.",
    },
  ],
},
```

## 5. Add to sidebar navigation

Add the new component to `componentItems` in `src/components/sidebar-nav.tsx`:

```ts
const componentItems: NavItem[] = [
  { label: "Button", href: "/components/button" },
  { label: "Menu", href: "/components/menu" },
  { label: "ComponentName", href: "/components/component-name" },
];
```

Keep the list alphabetically sorted.

## 6. Verify

Run these commands to check the build:

```bash
pnpm typecheck   # TypeScript validation
pnpm build       # Required before tests
pnpm test        # Run Vitest
```

Check the dev server at `http://localhost:4321/components/component-name` to verify:

- All examples render correctly
- Code snippets are extracted properly
- Props tables show the right data
- Sidebar navigation works
