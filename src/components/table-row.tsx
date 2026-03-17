import { forwardRef, type HTMLAttributes } from "react";

import { tv, type VariantProps } from "tailwind-variants";

import { cn } from "@/lib/utils";

const tableRowVariants = tv({
  base: "flex w-full items-center gap-6 border-b border-border-primary px-5 py-4",
  variants: {
    size: {
      default: "",
      sm: "py-2",
      lg: "py-6",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

export interface TableRowProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof tableRowVariants> {}

const TableRow = forwardRef<HTMLDivElement, TableRowProps>(
  ({ className, size, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(tableRowVariants({ size, className }))}
        {...props}
      />
    );
  },
);

TableRow.displayName = "TableRow";

export { TableRow, tableRowVariants };
