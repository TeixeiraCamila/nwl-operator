import type { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

type DiffBlockHeaderProps = {
  from?: string;
  to?: string;
};

function DiffBlockHeader({ from, to }: DiffBlockHeaderProps) {
  return (
    <div className="flex items-center gap-2 h-10 px-4 border-b border-border-primary">
      <span className="font-mono text-xs font-medium text-text-secondary">
        {from} → {to}
      </span>
    </div>
  );
}

type DiffBlockProps = ComponentProps<"div"> & {
  from?: string;
  to?: string;
};

function DiffBlock({ from, to, className, children, ...props }: DiffBlockProps) {
  return (
    <div
      className={twMerge(
        "border border-border-primary bg-bg-input overflow-hidden",
        className,
      )}
      {...props}
    >
      <DiffBlockHeader from={from} to={to} />
      <div className="flex flex-col py-1">{children}</div>
    </div>
  );
}

export { DiffBlock, DiffBlockHeader, type DiffBlockProps, type DiffBlockHeaderProps };
