"use client";

import { forwardRef, type ComponentProps, useCallback, useState } from "react";

import { tv, type VariantProps } from "tailwind-variants";

import { cn } from "@/lib/utils";

const toggleVariants = tv({
  slots: {
    root: "inline-flex items-center gap-3 cursor-pointer font-mono text-sm",
    indicator:
      "relative h-[22px] w-[40px] cursor-pointer rounded-full bg-bg-surface p-[3px] outline-none transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
    thumb:
      "pointer-events-none block h-[16px] w-[16px] rounded-full transition-transform duration-150",
    label: "",
  },
  variants: {
    size: {
      default: "",
      sm: "text-xs",
      lg: "text-base",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

export interface ToggleProps
  extends Omit<ComponentProps<"label">, "onChange">,
    VariantProps<typeof toggleVariants> {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
}

const ToggleRoot = forwardRef<HTMLLabelElement, ToggleProps>(
  (
    {
      className,
      size,
      checked: controlledChecked,
      defaultChecked = false,
      onChange,
      children,
      ...props
    },
    ref,
  ) => {
    const [internalChecked, setInternalChecked] = useState(defaultChecked);
    const isControlled = controlledChecked !== undefined;
    const isChecked = isControlled ? controlledChecked : internalChecked;

    const handleClick = useCallback(() => {
      const newValue = !isChecked;
      if (!isControlled) {
        setInternalChecked(newValue);
      }
      onChange?.(newValue);
    }, [isChecked, isControlled, onChange]);

    const { root, indicator, thumb } = toggleVariants({ size });

    return (
      <label ref={ref} className={cn(root({ className }))} onClick={handleClick}>
        <span
          className={cn(
            indicator(),
            isChecked ? "bg-accent-green" : "bg-border-primary",
          )}
        >
          <span
            className={cn(
              thumb(),
              isChecked
                ? "translate-x-[18px] bg-white"
                : "translate-x-[3px] bg-zinc-400",
            )}
          />
        </span>
        {children !== undefined && <span>{children}</span>}
      </label>
    );
  },
);

ToggleRoot.displayName = "ToggleRoot";

const Toggle = ToggleRoot;

export { Toggle, ToggleRoot, toggleVariants };
