# Padrões de Componentes UI

## Visão Geral

Este documento estabelece os padrões para criação de componentes UI reutilizáveis no projeto, utilizando:
- **React** com TypeScript
- **Tailwind CSS** para estilização
- **tailwind-variants** para variantes de componentes
- **tailwind-merge** + **clsx** para manipulação de classes

## Instalação de Dependências

```bash
pnpm add tailwind-variants clsx tailwind-merge
```

## Estrutura de Arquivos

```
src/components/ui/
├── componente.tsx
└── AGENTS.md       # Este documento
```

## Padrões de Código

### Imports

```tsx
import { type ButtonHTMLAttributes, forwardRef } from "react";

import { tv, type VariantProps } from "tailwind-variants";

import { cn } from "@/lib/utils";
```

### Estrutura do Componente

```tsx
// 1. Tipos - estender propriedades nativas do elemento HTML
export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

// 2. Variants usando tailwind-variants
const buttonVariants = tv({
  base: "classes base",
  variants: {
    variant: {
      default: "classes default",
      secondary: "classes secondary",
    },
    size: {
      default: "classes size default",
      sm: "classes small",
    },
  },
  // Compound variants - estilos aplicados quando múltiplas variants são combinadas
  compoundVariants: [
    {
      variant: "default",
      size: "lg",
      class: "classes extras para combinação específica",
    },
  ],
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

// 3. Componente com forwardRef
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";

// 4. Exports - SEMPRE named exports
export { Button, buttonVariants };
```

### Slots (Composição de Componentes)

Para componentes mais complexos com múltiplas partes (ex: Alert, Card):

```tsx
const alertVariants = tv({
  slots: {
    root: "rounded p-4",
    title: "font-bold",
    message: "text-sm"
  },
  variants: {
    variant: {
      outlined: { root: "border" },
      filled: { root: "" }
    },
    severity: {
      error: "",
      success: ""
    }
  },
  compoundVariants: [
    {
      variant: "outlined",
      severity: "error",
      class: {
        root: "border-red-500",
        title: "text-red-700",
        message: "text-red-600"
      }
    }
  ],
  defaultVariants: {
    variant: "filled",
    severity: "success"
  }
});

// Uso
const { root, title, message } = alertVariants({ variant, severity });

return (
  <div className={root()}>
    <div className={title()}>Title</div>
    <div className={message()}>Message</div>
  </div>
);
```

### TypeScript com VariantProps

O tipo `VariantProps` extrai automaticamente os tipos das variants:

```typescript
import { tv, type VariantProps } from "tailwind-variants";

const button = tv({
  base: "font-medium",
  variants: {
    color: {
      primary: "bg-blue-500",
      secondary: "bg-purple-500"
    },
    size: {
      sm: "text-sm",
      lg: "text-lg"
    }
  },
  defaultVariants: {
    color: "primary",
    size: "sm"
  }
});

// type ButtonVariants = { color?: "primary" | "secondary", size?: "sm" | "lg" }
type ButtonVariants = VariantProps<typeof button>;
```

## Regras

### ✗ Nunca fazer
- Default exports
- Componentes sem forwardRef
- Classes hardcoded sem variants

### ✓ Sempre fazer
- Named exports
- Estender propriedades nativas do elemento HTML
- Usar forwardRef para ref forwarding
- Usar tailwind-variants para variantes
- Usar cn() para merging de classes
- Definir displayName no componente

### Estilização

- Usar números para valores (ex: `gap-2`, não `gap-[8px]`)
- Usar paleta de cores existente (zinc, emerald, red, etc)
- Manter consistência com o design system do projeto

## Utils

### Função cn()

Disponível em `src/lib/utils.ts`:

```tsx
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

### Uso

```tsx
import { cn } from "@/lib/utils";

className={cn(buttonVariants({ variant, size }), "classe adicional")}
```

## Referências

- [tailwind-variants](https://tailwind-variants.org)
- [shadcn/ui](https://ui.shadcn.com)

## Componentes Disponíveis

### Componentes Genéricos

| Componente | Arquivo | Descrição |
|------------|---------|-----------|
| Button | button.tsx | Botão com variantes |
| Toggle | toggle.tsx | Switch/Toggle |
| Badge | badge.tsx | Badge com variantes |
| TableRow | table-row.tsx | Linha de tabela |
| ScoreRing | score-ring.tsx | Indicador circular de score |

### Componentes Específicos

| Componente | Arquivo | Descrição |
|------------|---------|-----------|
| AnalysisCard | analysis-card.tsx | Card de análise de código |
| CodeBlock | code-block.tsx | Bloco de código com shiki (Server Component) |
| DiffLine | diff-line.tsx | Linha de diff (+/-) |

### Componentes de Sessão (Sections)

Componentes compostos para páginas específicas, localizados em `src/components/sections/`:

| Componente | Arquivo | Descrição |
|------------|---------|-----------|
| Hero | hero.tsx | Seção hero com título e descrição |
| FooterHint | footer-hint.tsx | Hint de rodapé com itens e separador |
| LeaderboardPreview | leaderboard-preview.tsx | Preview do leaderboard com header e descrição |

### Padrão de Composição

Componentes de sessão seguem o padrão **Compound Components**:

```tsx
// Uso
<Hero>
  <Hero.Title prefix="> ">paste your code. get roasted.</Hero.Title>
  <Hero.Description>Descrição aqui</Hero.Description>
</Hero>

<FooterHint>
  <FooterHint.Item>Texto</FooterHint.Item>
  <FooterHint.Separator />
  <FooterHint.Item>Outro texto</FooterHint.Item>
</FooterHint>

<LeaderboardPreview>
  <LeaderboardPreview.Header>
    <LeaderboardPreview.Title>Título</LeaderboardPreview.Title>
  </LeaderboardPreview.Header>
  <LeaderboardPreview.Description>Descrição</LeaderboardPreview.Description>
  <LeaderboardTable />
</LeaderboardPreview>
```
