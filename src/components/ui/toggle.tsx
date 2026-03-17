"use client";

import { forwardRef, type HTMLAttributes, useCallback, useState } from "react";

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
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange">,
    VariantProps<typeof toggleVariants> {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
}

const ToggleRoot = forwardRef<HTMLButtonElement, ToggleProps>(
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
      <label className={cn(root({ className }))}>
        <button
          ref={ref}
          type="button"
          role="switch"
          aria-checked={isChecked}
          onClick={handleClick}
          className={cn(
            indicator(),
            isChecked ? "bg-accent-green" : "bg-border-primary",
          )}
          {...props}
        >
          <span
            className={cn(
              thumb(),
              isChecked
                ? "translate-x-[18px] bg-white"
                : "translate-x-[3px] bg-zinc-400",
            )}
          />
        </button>
        {children !== undefined && <span>{children}</span>}
      </label>
    );
  },
);

ToggleRoot.displayName = "ToggleRoot";

export interface ToggleIndicatorProps extends HTMLAttributes<HTMLSpanElement> {
  checked?: boolean;
}

const ToggleIndicator = forwardRef<HTMLSpanElement, ToggleIndicatorProps>(
  ({ className, checked, ...props }, ref) => {
    const { thumb } = toggleVariants();

    return (
      <span
        ref={ref}
        className={cn(
          thumb(),
          checked
            ? "translate-x-[18px] bg-white"
            : "translate-x-[3px] bg-zinc-400",
          className,
        )}
        {...props}
      />
    );
  },
);

ToggleIndicator.displayName = "ToggleIndicator";

export interface ToggleLabelProps extends HTMLAttributes<HTMLSpanElement> {}

const ToggleLabel = forwardRef<HTMLSpanElement, ToggleLabelProps>(
  ({ className, ...props }, ref) => {
    const { label } = toggleVariants();

    return <span ref={ref} className={cn(label({ className }))} {...props} />;
  },
);

ToggleLabel.displayName = "ToggleLabel";

const Toggle = Object.assign(ToggleRoot, {
  Indicator: ToggleIndicator,
  Label: ToggleLabel,
});

export { Toggle, ToggleIndicator, ToggleLabel, ToggleRoot, toggleVariants };
