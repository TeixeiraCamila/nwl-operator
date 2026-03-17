import { forwardRef, type HTMLAttributes } from "react";

import { tv, type VariantProps } from "tailwind-variants";

import { cn } from "@/lib/utils";

const navbarVariants = tv({
  base: "flex h-14 w-full items-center justify-between border-b border-border-primary bg-bg-page px-10",
  variants: {
    size: {
      default: "h-14",
      sm: "h-12",
      lg: "h-16",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

export interface NavbarProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof navbarVariants> {}

const Navbar = forwardRef<HTMLDivElement, NavbarProps>(
  ({ className, size, ...props }, ref) => {
    return (
      <nav
        ref={ref}
        className={cn(navbarVariants({ size, className }))}
        {...props}
      />
    );
  },
);

Navbar.displayName = "Navbar";

export { Navbar, navbarVariants };
