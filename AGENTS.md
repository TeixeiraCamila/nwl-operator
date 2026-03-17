# devroast - NLW Operator

## Stack
- **Framework**: Next.js 15 (App Router)
- **UI**: React 19, Tailwind CSS 4
- **Linguagem**: TypeScript
- **Estilização**: tailwind-variants + tailwind-merge
- **Code Highlighting**: Shiki

## Scripts
```bash
npm run dev      # Desenvolvimento
npm run build    # Build de produção
npm run lint     # Verificar código
npm run format   # Formatar código
```

## Estrutura
```
src/
├── app/              # Next.js App Router
├── components/
│   ├── ui/           # Componentes reutilizáveis
│   └── sections/     # Componentes de página
└── lib/              # Utilitários
```

## Padrões

### Componentes UI
- Local: `src/components/ui/`
- Usar `cn()` para merge de classes
- Composição via sub-componentes (Compound Components)

### Componentes de Sessão
- Local: `src/components/sections/`
- Hero, FooterHint, LeaderboardPreview
- Seguem padrão compound components

### Convenções
- **Nomeclatura**: CamelCase para componentes
- **Export**: Sempre named exports
- **Estilização**: Classes Tailwind (ex: `gap-2`, não `gap-[8px]`)
