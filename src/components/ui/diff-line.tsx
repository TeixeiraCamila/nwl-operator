import { forwardRef, type HTMLAttributes } from "react";

import { tv, type VariantProps } from "tailwind-variants";

import { cn } from "@/lib/utils";

const diffLineVariants = tv({
  slots: {
    root: "flex w-full gap-2 px-4 py-2 font-mono text-sm",
    prefix: "w-4",
    code: "text-text-secondary",
  },
  variants: {
    type: {
      removed: { root: "bg-accent-red/10" },
      added: { root: "bg-accent-green/10" },
      unchanged: { root: "" },
    },
  },
  defaultVariants: {
    type: "unchanged",
  },
});

export interface DiffLineProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof diffLineVariants> {
  prefix?: "+" | "-" | " ";
  code: string;
}

const DiffLineRoot = forwardRef<HTMLDivElement, DiffLineProps>(
  ({ className, type, children, ...props }, ref) => {
    const { root } = diffLineVariants({ type });

    return (
      <div ref={ref} className={cn(root({ className }))} {...props}>
        {children}
      </div>
    );
  },
);

DiffLineRoot.displayName = "DiffLineRoot";

export interface DiffLinePrefixProps extends HTMLAttributes<HTMLSpanElement> {
  value?: "+" | "-" | " ";
}

const DiffLinePrefix = forwardRef<HTMLSpanElement, DiffLinePrefixProps>(
  ({ className, value = " ", ...props }, ref) => {
    const { prefix } = diffLineVariants();

    const prefixColor =
      value === "-"
        ? "text-accent-red"
        : value === "+"
          ? "text-accent-green"
          : "text-text-tertiary";

    return (
      <span
        ref={ref}
        className={cn(prefix({ className }), prefixColor)}
        {...props}
      >
        {value}
      </span>
    );
  },
);

DiffLinePrefix.displayName = "DiffLinePrefix";

export interface DiffLineCodeProps extends HTMLAttributes<HTMLSpanElement> {}

const DiffLineCode = forwardRef<HTMLSpanElement, DiffLineCodeProps>(
  ({ className, ...props }, ref) => {
    const { code } = diffLineVariants();

    return <span ref={ref} className={cn(code({ className }))} {...props} />;
  },
);

DiffLineCode.displayName = "DiffLineCode";

const DiffLine = Object.assign(DiffLineRoot, {
  Prefix: DiffLinePrefix,
  Code: DiffLineCode,
});

export {
  DiffLine,
  DiffLineCode,
  DiffLinePrefix,
  DiffLineRoot,
  diffLineVariants,
};
