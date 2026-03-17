import { forwardRef, type HTMLAttributes } from "react";

import { tv, type VariantProps } from "tailwind-variants";

import { cn } from "@/lib/utils";

const badgeVariants = tv({
  base: "inline-flex items-center gap-2 font-mono text-sm",
  variants: {
    variant: {
      critical: "text-accent-red",
      warning: "text-accent-amber",
      good: "text-accent-green",
    },
    size: {
      default: "text-sm",
      sm: "text-xs",
      lg: "text-base",
    },
  },
  defaultVariants: {
    variant: "good",
    size: "default",
  },
});

export interface BadgeProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(badgeVariants({ variant, size, className }))}
        {...props}
      />
    );
  },
);

Badge.displayName = "Badge";

const BadgeDot = forwardRef<HTMLSpanElement, HTMLAttributes<HTMLSpanElement>>(
  ({ className, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn("block h-2 w-2 rounded-full", className)}
        {...props}
      />
    );
  },
);

BadgeDot.displayName = "BadgeDot";

export { Badge, BadgeDot, badgeVariants };
