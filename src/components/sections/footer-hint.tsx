import { forwardRef, type HTMLAttributes } from "react";

import { tv, type VariantProps } from "tailwind-variants";

import { cn } from "@/lib/utils";

const footerHintVariants = tv({
  slots: {
    root: "flex items-center justify-center gap-2 font-mono text-xs text-text-tertiary",
    separator: "",
  },
  variants: {
    size: {
      default: "text-xs",
      sm: "text-[10px]",
      lg: "text-sm",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

export interface FooterHintRootProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof footerHintVariants> {}

const FooterHintRoot = forwardRef<HTMLDivElement, FooterHintRootProps>(
  ({ className, size, children, ...props }, ref) => {
    const { root } = footerHintVariants({ size });

    return (
      <div ref={ref} className={cn(root({ className }))} {...props}>
        {children}
      </div>
    );
  },
);

FooterHintRoot.displayName = "FooterHintRoot";

export interface FooterHintItemProps extends HTMLAttributes<HTMLSpanElement> {}

const FooterHintItem = forwardRef<HTMLSpanElement, FooterHintItemProps>(
  ({ className, ...props }, ref) => {
    return <span ref={ref} className={cn(className)} {...props} />;
  },
);

FooterHintItem.displayName = "FooterHintItem";

export interface FooterHintSeparatorProps
  extends HTMLAttributes<HTMLSpanElement> {
  symbol?: string;
}

const FooterHintSeparator = forwardRef<
  HTMLSpanElement,
  FooterHintSeparatorProps
>(({ className, symbol = "·", ...props }, ref) => {
  const { separator } = footerHintVariants();

  return (
    <span ref={ref} className={cn(separator({ className }))} {...props}>
      {symbol}
    </span>
  );
});

FooterHintSeparator.displayName = "FooterHintSeparator";

const FooterHint = Object.assign(FooterHintRoot, {
  Item: FooterHintItem,
  Separator: FooterHintSeparator,
});

export {
  FooterHint,
  FooterHintItem,
  FooterHintRoot,
  FooterHintSeparator,
  footerHintVariants,
};
