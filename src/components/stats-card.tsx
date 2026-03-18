"use client";

import NumberFlow from "@number-flow/react";

interface StatsCardProps {
  value: number;
  suffix?: string;
  label: string;
  className?: string;
}

export function StatsCard({
  value,
  suffix = "",
  label,
  className,
}: StatsCardProps) {
  return (
    <div className={className}>
      <div className="flex items-baseline gap-1">
        <NumberFlow
          value={value}
          className="font-mono text-2xl font-bold text-text-primary tabular-nums"
          locales="en-US"
        />
        <span className="font-mono text-sm text-text-tertiary">{suffix}</span>
      </div>
      <span className="font-mono text-xs text-text-secondary">{label}</span>
    </div>
  );
}
