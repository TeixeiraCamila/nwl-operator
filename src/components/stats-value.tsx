"use client";

import NumberFlow from "@number-flow/react";

interface StatsValueProps {
  value: number;
  decimals?: number;
  suffix?: string;
}

export function StatsValue({ value, decimals = 0, suffix }: StatsValueProps) {
  return (
    <NumberFlow
      value={value}
      locales="en-US"
      format={{
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      }}
      className="inline-block tabular-nums"
    />
  );
}
