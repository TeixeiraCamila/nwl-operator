import { forwardRef, type HTMLAttributes } from "react";

import { tv, type VariantProps } from "tailwind-variants";

import { cn } from "@/lib/utils";

import { Badge, BadgeDot } from "./badge";

const analysisCardVariants = tv({
  slots: {
    root: "w-[480px] border border-border-primary p-5 flex flex-col gap-3",
    badge: "flex items-center gap-2",
    title: "font-mono text-sm text-text-primary",
    description: "font-mono text-xs text-text-secondary w-full leading-relaxed",
  },
  variants: {
    severity: {
      critical: "",
      warning: "",
      good: "",
    },
  },
  defaultVariants: {
    severity: "good",
  },
});

type Severity = "critical" | "warning" | "good";

const severityColors: Record<
  Severity,
  {
    dot: string;
    badge: "critical" | "warning" | "good";
    badgeText: string;
  }
> = {
  critical: {
    dot: "bg-accent-red",
    badge: "critical",
    badgeText: "critical",
  },
  warning: {
    dot: "bg-accent-amber",
    badge: "warning",
    badgeText: "warning",
  },
  good: {
    dot: "bg-accent-green",
    badge: "good",
    badgeText: "good",
  },
};

export interface AnalysisCardRootProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof analysisCardVariants> {
  severity: "critical" | "warning" | "good";
}

const AnalysisCardRoot = forwardRef<HTMLDivElement, AnalysisCardRootProps>(
  ({ className, severity, ...props }, ref) => {
    const { root } = analysisCardVariants({ severity });
    return <div ref={ref} className={cn(root({ className }))} {...props} />;
  },
);

AnalysisCardRoot.displayName = "AnalysisCardRoot";

export interface AnalysisCardBadgeProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof analysisCardVariants> {
  severity: "critical" | "warning" | "good";
}

const AnalysisCardBadge = forwardRef<HTMLDivElement, AnalysisCardBadgeProps>(
  ({ className, severity, ...props }, ref) => {
    const { badge } = analysisCardVariants({ severity });
    const colors = severityColors[severity];

    return (
      <div ref={ref} className={cn(badge({ className }))} {...props}>
        <BadgeDot className={colors.dot} />
        <Badge variant={colors.badge}>{colors.badgeText}</Badge>
      </div>
    );
  },
);

AnalysisCardBadge.displayName = "AnalysisCardBadge";

export interface AnalysisCardTitleProps
  extends HTMLAttributes<HTMLSpanElement> {}

const AnalysisCardTitle = forwardRef<HTMLSpanElement, AnalysisCardTitleProps>(
  ({ className, ...props }, ref) => {
    const { title } = analysisCardVariants();

    return <span ref={ref} className={cn(title({ className }))} {...props} />;
  },
);

AnalysisCardTitle.displayName = "AnalysisCardTitle";

export interface AnalysisCardDescriptionProps
  extends HTMLAttributes<HTMLSpanElement> {}

const AnalysisCardDescription = forwardRef<
  HTMLSpanElement,
  AnalysisCardDescriptionProps
>(({ className, ...props }, ref) => {
  const { description } = analysisCardVariants();

  return (
    <span ref={ref} className={cn(description({ className }))} {...props} />
  );
});

AnalysisCardDescription.displayName = "AnalysisCardDescription";

const AnalysisCard = Object.assign(AnalysisCardRoot, {
  Badge: AnalysisCardBadge,
  Title: AnalysisCardTitle,
  Description: AnalysisCardDescription,
});

export {
  AnalysisCard,
  AnalysisCardBadge,
  AnalysisCardDescription,
  AnalysisCardRoot,
  AnalysisCardTitle,
  analysisCardVariants,
};
