import { type ButtonHTMLAttributes, forwardRef } from "react";

import { tv, type VariantProps } from "tailwind-variants";

import { cn } from "@/lib/utils";

const buttonVariants = tv({
  base: "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-none text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer font-mono",
  variants: {
    variant: {
      default: "bg-accent-green text-zinc-950 hover:bg-accent-green/90",
      destructive: "bg-accent-red text-white hover:bg-accent-red/90",
      outline:
        "border border-border-primary text-text-primary hover:bg-bg-surface hover:text-text-primary hover:border-text-primary",
      secondary:
        "border border-border-primary text-text-primary hover:bg-bg-surface hover:text-text-primary hover:border-text-primary",
      ghost:
        "border border-transparent text-text-primary hover:border-border-primary hover:bg-bg-surface",
      link: "border border-transparent text-text-primary hover:border-border-primary hover:bg-bg-surface",
    },
    size: {
      default: "h-10 px-6 py-2.5",
      sm: "h-9 px-3",
      lg: "h-11 px-8",
      icon: "h-10 w-10",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

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

export { Button, buttonVariants };
