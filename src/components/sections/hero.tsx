import { forwardRef, type HTMLAttributes } from "react";

import { tv, type VariantProps } from "tailwind-variants";

import { cn } from "@/lib/utils";

const heroVariants = tv({
  slots: {
    root: "flex flex-col items-center gap-3",
    title:
      "flex items-center gap-3 font-mono text-4xl font-bold text-text-primary",
    titlePrefix: "text-accent-green",
    titleText: "",
    description: "font-mono text-sm text-text-secondary",
  },
  variants: {
    size: {
      default: "",
      sm: {
        title: "text-2xl",
        description: "text-xs",
      },
      lg: {
        title: "text-5xl",
        description: "text-base",
      },
    },
  },
  defaultVariants: {
    size: "default",
  },
});

export interface HeroRootProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof heroVariants> {}

const HeroRoot = forwardRef<HTMLDivElement, HeroRootProps>(
  ({ className, size, children, ...props }, ref) => {
    const { root } = heroVariants({ size });

    return (
      <div ref={ref} className={cn(root({ className }))} {...props}>
        {children}
      </div>
    );
  },
);

HeroRoot.displayName = "HeroRoot";

export interface HeroTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  prefix?: string;
}

const HeroTitle = forwardRef<HTMLHeadingElement, HeroTitleProps>(
  ({ className, prefix = "$", children, ...props }, ref) => {
    const { title, titlePrefix, titleText } = heroVariants();

    return (
      <h1 ref={ref} className={cn(title({ className }))} {...props}>
        <span className={titlePrefix()}>{prefix}</span>
        <span className={titleText()}>{children}</span>
      </h1>
    );
  },
);

HeroTitle.displayName = "HeroTitle";

export interface HeroDescriptionProps
  extends HTMLAttributes<HTMLParagraphElement> {}

const HeroDescription = forwardRef<HTMLParagraphElement, HeroDescriptionProps>(
  ({ className, ...props }, ref) => {
    const { description } = heroVariants();

    return (
      <p ref={ref} className={cn(description({ className }))} {...props} />
    );
  },
);

HeroDescription.displayName = "HeroDescription";

const Hero = Object.assign(HeroRoot, {
  Title: HeroTitle,
  Description: HeroDescription,
});

export { Hero, HeroDescription, HeroRoot, HeroTitle, heroVariants };
