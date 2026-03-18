import { forwardRef, type HTMLAttributes } from "react";

import { tv, type VariantProps } from "tailwind-variants";

import { cn } from "@/lib/utils";

const scoreRingVariants = tv({
  slots: {
    root: "relative flex items-center justify-center",
    value: "font-mono text-5xl font-bold text-text-primary",
    label: "font-mono text-base text-text-secondary",
  },
  variants: {
    size: {
      default: "h-[180px] w-[180px]",
      sm: "h-[120px] w-[120px]",
      lg: "h-[240px] w-[240px]",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

export interface ScoreRingProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof scoreRingVariants> {
  score: number;
  maxScore?: number;
}

const ScoreRingRoot = forwardRef<HTMLDivElement, ScoreRingProps>(
  ({ className, size, score, maxScore = 100, children, ...props }, ref) => {
    const percentage = Math.min((score / maxScore) * 100, 100);
    const circumference = 2 * Math.PI * 45;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    const strokeColor =
      percentage >= 70
        ? "var(--color-accent-green)"
        : percentage >= 40
          ? "var(--color-accent-amber)"
          : "var(--color-accent-red)";

    const { root } = scoreRingVariants({ size });

    return (
      <div ref={ref} className={cn(root({ className }))} {...props}>
        <svg
          className="absolute h-full w-full -rotate-90"
          viewBox="0 0 100 100"
          aria-label={`Score: ${score} out of ${maxScore}`}
        >
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="var(--color-border-primary)"
            strokeWidth="4"
          />
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke={strokeColor}
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-500"
          />
        </svg>
        {children}
      </div>
    );
  },
);

ScoreRingRoot.displayName = "ScoreRingRoot";

export interface ScoreRingValueProps extends HTMLAttributes<HTMLSpanElement> {}

const ScoreRingValue = forwardRef<HTMLSpanElement, ScoreRingValueProps>(
  ({ className, ...props }, ref) => {
    const { value } = scoreRingVariants();

    return <span ref={ref} className={cn(value({ className }))} {...props} />;
  },
);

ScoreRingValue.displayName = "ScoreRingValue";

export interface ScoreRingLabelProps extends HTMLAttributes<HTMLSpanElement> {}

const ScoreRingLabel = forwardRef<HTMLSpanElement, ScoreRingLabelProps>(
  ({ className, ...props }, ref) => {
    const { label } = scoreRingVariants();

    return <span ref={ref} className={cn(label({ className }))} {...props} />;
  },
);

ScoreRingLabel.displayName = "ScoreRingLabel";

const ScoreRing = Object.assign(ScoreRingRoot, {
  Value: ScoreRingValue,
  Label: ScoreRingLabel,
});

export {
  ScoreRing,
  ScoreRingLabel,
  ScoreRingRoot,
  ScoreRingValue,
  scoreRingVariants,
};
