# devroast — NLW Operator

## Stack

- **Framework**: Next.js 15 (App Router)
- **UI**: React 19, Tailwind CSS 4
- **Language**: TypeScript
- **Styling**: tailwind-variants + tailwind-merge
- **Code Highlighting**: Shiki
- **API**: tRPC v11 + TanStack Query v5
- **ORM**: Drizzle + PostgreSQL

## Scripts

```bash
npm run dev      # Development
npm run build    # Production build
npm run lint     # Lint code
npm run format   # Format code
npm run db:seed  # Seed database
```

## File Structure

```
src/
├── app/              # Next.js App Router (pages, layouts, API routes)
├── components/
│   ├── ui/           # Reusable UI components (Button, Badge, etc)
│   ├── sections/     # Page section components (Hero, FooterHint, etc)
│   └── *.tsx         # Root-level shared components
├── db/               # Drizzle ORM (schema, client, seed)
├── hooks/            # Custom React hooks
├── lib/              # Utilities (cn(), languages, etc)
└── trpc/             # tRPC v11 + TanStack Query v5 (see src/trpc/AGENTS.md)
```

## Conventions

### Naming

| Type | Convention | Example |
|------|------------|---------|
| React Components | PascalCase | `CodePreview.tsx`, `Hero.tsx` |
| Hooks | camelCase with `use` prefix | `useShikiHighlighter.ts` |
| Utilities | camelCase or kebab-case | `utils.ts`, `query-client.ts` |
| tRPC Routers | kebab-case | `roast.ts`, `leaderboard.ts` |

### Exports

- **Always use named exports** — no default exports
- Components exported from `src/components/ui/index.ts` and `src/components/sections/index.ts`

### Styling

- Use Tailwind classes (e.g., `gap-2`, not `gap-[8px]`)
- Use `cn()` from `@/lib/utils` for class merging
- UI components follow compound component pattern

## Additional Documentation

- **tRPC patterns**: See `src/trpc/AGENTS.md`
