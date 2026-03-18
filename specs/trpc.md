# Spec: tRPC — Camada de API Type-Safe

## Resumo

Implementar tRPC v11 como camada de API type-safe entre o frontend Next.js e o banco Drizzle/PostgreSQL. A integracao seguira o padrao oficial com TanStack React Query, usando `createTRPCOptionsProxy` para prefetch em Server Components e hooks do React Query em Client Components.

---

## Pesquisa realizada

### Abordagens de API analisadas

| Abordagem | Descricao | Veredicto |
|---|---|---|
| **tRPC v11 + TanStack React Query** | API type-safe end-to-end, integracao nativa com RSC via `createTRPCOptionsProxy`, prefetch com hydration | **Recomendado** |
| **Next.js Server Actions** | Funcoes server-side chamadas diretamente do client. Simples, sem camada extra | Insuficiente — sem cache layer, sem query invalidation, sem staleTime |
| **API Routes manuais + fetch** | Route handlers em `app/api/`, fetch manual com tipos duplicados | Descartado — duplicacao de tipos, sem type-safety end-to-end |

### Integracao com React Server Components

O tRPC v11 oferece duas formas de consumir dados no server:

| Metodo | Uso | Integra com cache do React Query? |
|---|---|---|
| **`createTRPCOptionsProxy`** + `prefetchQuery` | Prefetch em RSC, consume com `useQuery`/`useSuspenseQuery` no client | Sim — hydration via `HydrationBoundary` |
| **`createCallerFactory`** (server caller) | Chamada direta no RSC, retorna dados | Nao — desacoplado do QueryClient |

Decisao: usar `createTRPCOptionsProxy` como padrao para prefetch + hydration. Expor tambem um `caller` para casos onde o dado e consumido apenas no server (ex: metadata dinamica).

---

## Decisao

### Arquitetura

```
Browser (Client Component)
  │
  │  useQuery(trpc.roast.getById.queryOptions({ id }))
  │  useMutation(trpc.roast.create.mutationOptions())
  │
  ▼
TRPCReactProvider (layout.tsx)
  │  QueryClientProvider + TRPCProvider
  │
  ▼
httpBatchLink → /api/trpc/[trpc]/route.ts
  │  fetchRequestHandler
  │
  ▼
appRouter (tRPC router)
  │  procedures com zod validation
  │
  ▼
Drizzle ORM → PostgreSQL


Server Component (RSC)
  │
  │  prefetch(trpc.roast.getById.queryOptions({ id }))
  │  // ou: caller.roast.getById({ id })
  │
  ▼
appRouter.createCaller (direct call, sem HTTP)
  │
  ▼
Drizzle ORM → PostgreSQL
```

### Por que tRPC + TanStack React Query

1. **Type-safety end-to-end** — Input/output tipados automaticamente do router ate o hook no client, sem codegen.
2. **Prefetch em RSC** — `createTRPCOptionsProxy` permite prefetch no server e hydration no client via `HydrationBoundary`, aproveitando streaming do Next.js.
3. **Cache e invalidation** — React Query gerencia staleTime, refetch, optimistic updates e invalidation apos mutations.
4. **Zod validation** — Input validation colocada na procedure, reutilizavel e type-safe.
5. **Drizzle ja esta no projeto** — Procedures importam `db` diretamente de `@/db`, sem adaptador extra.

---

## Especificacao de implementacao

### Estrutura de arquivos

```
src/
├── trpc/
│   ├── init.ts              # initTRPC, context factory, base procedure
│   ├── routers/
│   │   ├── _app.ts         # appRouter (merge de todos os sub-routers)
│   │   └── roast.ts        # procedures de roast (create, getById, getStats)
│   ├── query-client.ts      # makeQueryClient factory (shared server/client)
│   ├── client.tsx           # TRPCProvider, useTRPC (client-only)
│   └── server.tsx           # createTRPCOptionsProxy, prefetch helper, caller (server-only)
└── app/
    ├── api/
    │   └── trpc/
    │       └── [trpc]/
    │           └── route.ts  # fetchRequestHandler (GET + POST)
    └── layout.tsx            # wraps children com TRPCReactProvider
```

### 1. `src/trpc/init.ts` — Inicializacao do tRPC

```typescript
import { initTRPC } from "@trpc/server"
import { cache } from "react"
import { db } from "@/db"

export const createTRPCContext = cache(async () => {
  return { db }
})

const t = initTRPC.create()

export const createTRPCRouter = t.router
export const createCallerFactory = t.createCallerFactory
export const baseProcedure = t.procedure
```

Notas:
- Sem `superjson` — os dados do Drizzle sao serializaveis nativamente
- O context expoe `db` para todas as procedures
- `cache()` do React garante que o contexto e criado uma unica vez por request no server

### 2. `src/trpc/routers/_app.ts` — Root router

```typescript
import { createTRPCRouter } from "../init"
import { roastRouter } from "./roast"

export const appRouter = createTRPCRouter({
  roast: roastRouter,
})

export type AppRouter = typeof appRouter
```

### 3. `src/trpc/routers/roast.ts` — Procedures de roast

```typescript
import { z } from "zod"
import { eq, asc, count, avg } from "drizzle-orm"
import { roasts, analysisItems } from "@/db/schema"
import { createTRPCRouter, baseProcedure } from "../init"

export const roastRouter = createTRPCRouter({
  getById: baseProcedure
    .input(z.object({ id: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      const [roast] = await ctx.db
        .select()
        .from(roasts)
        .where(eq(roasts.id, input.id))

      if (!roast) throw new Error("Roast not found")

      const items = await ctx.db
        .select()
        .from(analysisItems)
        .where(eq(analysisItems.roastId, input.id))
        .orderBy(asc(analysisItems.order))

      return { ...roast, analysisItems: items }
    }),

  getStats: baseProcedure.query(async ({ ctx }) => {
    const [stats] = await ctx.db
      .select({
        totalRoasts: count(),
        avgScore: avg(roasts.score),
      })
      .from(roasts)

    return {
      totalRoasts: stats?.totalRoasts ?? 0,
      avgScore: Number(stats?.avgScore ?? 0),
    }
  }),

  create: baseProcedure
    .input(z.object({
      code: z.string().min(1).max(10000),
      language: z.string(),
      roastMode: z.boolean(),
    }))
    .mutation(async ({ ctx, input }) => {
      // TODO: integrar com Vercel AI SDK para gerar analise
      return { id: "placeholder" }
    }),
})
```

### 4. `src/trpc/query-client.ts` — QueryClient factory

```typescript
import { QueryClient } from "@tanstack/react-query"

export function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 30 * 1000,
      },
    },
  })
}
```

### 5. `src/trpc/client.tsx` — Client provider

```typescript
"use client"

import type { QueryClient } from "@tanstack/react-query"
import { QueryClientProvider } from "@tanstack/react-query"
import { createTRPCClient, httpBatchLink } from "@trpc/client"
import { createTRPCContext } from "@trpc/tanstack-react-query"
import { useState } from "react"
import { makeQueryClient } from "./query-client"
import type { AppRouter } from "./routers/_app"

export const { TRPCProvider, useTRPC } = createTRPCContext<AppRouter>()

let browserQueryClient: QueryClient

function getQueryClient() {
  if (typeof window === "undefined") {
    return makeQueryClient()
  }
  if (!browserQueryClient) browserQueryClient = makeQueryClient()
  return browserQueryClient
}

function getUrl() {
  if (typeof window !== "undefined") return ""
  return `http://localhost:${process.env.PORT ?? 3000}`
}

export function TRPCReactProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const queryClient = getQueryClient()
  const [trpcClient] = useState(() =>
    createTRPCClient<AppRouter>({
      links: [httpBatchLink({ url: `${getUrl()}/api/trpc` })],
    }),
  )

  return (
    <QueryClientProvider client={queryClient}>
      <TRPCProvider trpcClient={trpcClient} queryClient={queryClient}>
        {children}
      </TRPCProvider>
    </QueryClientProvider>
  )
}
```

### 6. `src/trpc/server.tsx` — Server-side helpers

```typescript
import "server-only"

import { createTRPCOptionsProxy } from "@trpc/tanstack-react-query"
import type { TRPCQueryOptions } from "@trpc/tanstack-react-query"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"
import { cache } from "react"
import { createTRPCContext } from "./init"
import { makeQueryClient } from "./query-client"
import { appRouter } from "./routers/_app"

export const getQueryClient = cache(makeQueryClient)

export const trpc = createTRPCOptionsProxy({
  ctx: createTRPCContext,
  router: appRouter,
  queryClient: getQueryClient,
})

export const caller = appRouter.createCaller(createTRPCContext)

export function HydrateClient({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient()
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  )
}
```

### 7. `src/app/api/trpc/[trpc]/route.ts` — HTTP handler

```typescript
import { fetchRequestHandler } from "@trpc/server/adapters/fetch"
import { createTRPCContext } from "@/trpc/init"
import { appRouter } from "@/trpc/routers/_app"

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: createTRPCContext,
  })

export { handler as GET, handler as POST }
```

### 8. `src/app/layout.tsx` — Adicionar provider

```typescript
import { TRPCReactProvider } from "@/trpc/client"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <TRPCReactProvider>
          <Navbar />
          {children}
        </TRPCReactProvider>
      </body>
    </html>
  )
}
```

---

## Dependencias novas

| Pacote | Motivo | Estimativa Bundle |
|---|---|---|
| `@trpc/server` | Core do tRPC (router, procedures, adapters) | ~15 KB |
| `@trpc/client` | Client HTTP (httpBatchLink) | ~10 KB |
| `@trpc/tanstack-react-query` | Integracao TanStack React Query | ~5 KB |
| `@tanstack/react-query` | Cache layer, hooks (useQuery, useMutation) | ~15 KB |
| `zod` | Validacao de input nas procedures | ~12 KB |
| `server-only` | Garante que modulos server nao sao importados no client | ~1 KB |

**Total estimado client bundle:** ~30-40 KB gzip

---

## Riscos e consideracoes

1. **Hydration mismatch** — Se o `staleTime` for muito baixo, o client pode refetch imediatamente apos hydration. Configurar `staleTime: 30s` deve evitar isso.

2. **Mutation `roast.create` depende da IA** — A procedure `create` e placeholder ate a integracao com Vercel AI SDK. A estrutura ja estara pronta.

3. **Compatibilidade com Next.js** — Verificar que o fetch adapter funciona corretamente com o App Router. A documentacao oficial ja cobre esse cenario.

4. **Bundle size** — tRPC + React Query adicionam ~30-40 KB ao client bundle. Aceitavel para a funcionalidade que entregam.

---

## TODOs de implementacao

- [x] Criar `src/trpc/init.ts` — initTRPC, context com `db`, baseProcedure
- [x] Criar `src/trpc/routers/roast.ts` — procedure getStats
- [x] Criar `src/trpc/routers/_app.ts` — appRouter mergeando sub-routers
- [x] Criar `src/trpc/query-client.ts` — makeQueryClient factory
- [x] Criar `src/trpc/client.tsx` — TRPCReactProvider, useTRPC
- [x] Criar `src/trpc/server.tsx` — createTRPCOptionsProxy, HydrateClient, caller
- [x] Criar `src/app/api/trpc/[trpc]/route.ts` — fetch adapter handler
- [x] Modificar `src/app/layout.tsx` — adicionar TRPCReactProvider
- [x] Substituir dados hardcoded em `src/app/page.tsx` por StatsMetrics com tRPC
- [ ] Criar procedure `roast.getById` para pagina de resultado
- [ ] Criar procedure `roast.create` para submeter codigo
- [ ] Criar procedure `leaderboard.list` para listagem
- [ ] Rodar lint + typecheck em todos os arquivos
- [ ] Testar build completo
