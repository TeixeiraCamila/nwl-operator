import { forwardRef, type HTMLAttributes } from "react";

import { tv, type VariantProps } from "tailwind-variants";

import { cn } from "@/lib/utils";

const leaderboardPreviewVariants = tv({
  slots: {
    root: "flex w-[960px] flex-col gap-6",
    header: "flex items-center justify-between",
    headerLeft: "flex items-center gap-2",
    prefix: "font-mono text-sm font-bold text-accent-green",
    title: "font-mono text-sm font-bold text-text-primary",
    description: "font-mono text-xs text-text-tertiary",
  },
  variants: {
    size: {
      default: "",
      sm: {
        title: "text-xs",
        description: "text-[10px]",
      },
      lg: {
        title: "text-base",
        description: "text-sm",
      },
    },
  },
  defaultVariants: {
    size: "default",
  },
});

export interface LeaderboardPreviewRootProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof leaderboardPreviewVariants> {}

const LeaderboardPreviewRoot = forwardRef<
  HTMLDivElement,
  LeaderboardPreviewRootProps
>(({ className, size, children, ...props }, ref) => {
  const { root } = leaderboardPreviewVariants({ size });

  return (
    <div ref={ref} className={cn(root({ className }))} {...props}>
      {children}
    </div>
  );
});

LeaderboardPreviewRoot.displayName = "LeaderboardPreviewRoot";

export interface LeaderboardPreviewHeaderProps
  extends HTMLAttributes<HTMLDivElement> {}

const LeaderboardPreviewHeader = forwardRef<
  HTMLDivElement,
  LeaderboardPreviewHeaderProps
>(({ className, children, ...props }, ref) => {
  const { header } = leaderboardPreviewVariants();

  return (
    <div ref={ref} className={cn(header({ className }))} {...props}>
      {children}
    </div>
  );
});

LeaderboardPreviewHeader.displayName = "LeaderboardPreviewHeader";

export interface LeaderboardPreviewTitleProps
  extends HTMLAttributes<HTMLHeadingElement> {
  prefix?: string;
}

const LeaderboardPreviewTitle = forwardRef<
  HTMLHeadingElement,
  LeaderboardPreviewTitleProps
>(({ className, prefix = "//", children, ...props }, ref) => {
  const {
    headerLeft,
    prefix: prefixClass,
    title,
  } = leaderboardPreviewVariants();

  return (
    <div ref={ref} className={cn(headerLeft({ className }))} {...props}>
      <span className={prefixClass()}>{prefix}</span>
      <span className={title()}>{children}</span>
    </div>
  );
});

LeaderboardPreviewTitle.displayName = "LeaderboardPreviewTitle";

export interface LeaderboardPreviewDescriptionProps
  extends HTMLAttributes<HTMLParagraphElement> {}

const LeaderboardPreviewDescription = forwardRef<
  HTMLParagraphElement,
  LeaderboardPreviewDescriptionProps
>(({ className, ...props }, ref) => {
  const { description } = leaderboardPreviewVariants();

  return <p ref={ref} className={cn(description({ className }))} {...props} />;
});

LeaderboardPreviewDescription.displayName = "LeaderboardPreviewDescription";

const LeaderboardPreview = Object.assign(LeaderboardPreviewRoot, {
  Header: LeaderboardPreviewHeader,
  Title: LeaderboardPreviewTitle,
  Description: LeaderboardPreviewDescription,
});

export {
  LeaderboardPreview,
  LeaderboardPreviewDescription,
  LeaderboardPreviewHeader,
  LeaderboardPreviewRoot,
  LeaderboardPreviewTitle,
  leaderboardPreviewVariants,
};
