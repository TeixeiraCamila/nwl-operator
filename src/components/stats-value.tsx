"use client";

import { useEffect, useState } from "react";
import NumberFlow from "@number-flow/react";

interface StatsValueProps {
  value: number;
  decimals?: number;
  suffix?: string;
}

export function StatsValue({ value, decimals = 0, suffix }: StatsValueProps) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDisplayValue(value);
    }, 100);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <NumberFlow
      value={displayValue}
      locales="en-US"
      format={{
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      }}
      suffix={suffix}
      className="inline-block tabular-nums"
    />
  );
}
