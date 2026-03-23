"use client";

import { ChevronDown } from "lucide-react";
import { type ReactNode, useState } from "react";

const COLLAPSED_HEIGHT = 120;
const COLLAPSIBLE_THRESHOLD = 5;

type ShameLeaderboardEntryProps = {
  children: ReactNode;
  lineCount: number;
};

function scoreColor(score: number): string {
  if (score <= 3) return "text-accent-red";
  if (score <= 6) return "text-accent-amber";
  return "text-accent-green";
}

export function ShameLeaderboardEntry({
  children,
  lineCount,
  rank,
  score,
  language,
}: ShameLeaderboardEntryProps & {
  rank: number;
  score: number;
  language: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col border border-border-primary overflow-hidden">
      <div className="flex items-center justify-between h-12 px-5 border-b border-border-primary">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="font-mono text-[13px] text-text-tertiary">#</span>
            <span className="font-mono text-[13px] font-bold text-accent-amber">
              {rank}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="font-mono text-xs text-text-tertiary">score:</span>
            <span
              className={`font-mono text-[13px] font-bold ${scoreColor(score)}`}
            >
              {score.toFixed(1)}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-text-secondary">
            {language}
          </span>
          <span className="font-mono text-xs text-text-tertiary">
            {lineCount} lines
          </span>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="relative overflow-hidden transition-[max-height] duration-300 ease-in-out">
          <div
            style={
              lineCount > COLLAPSIBLE_THRESHOLD && !open
                ? { maxHeight: COLLAPSED_HEIGHT }
                : undefined
            }
          >
            {children}
          </div>

          {lineCount > COLLAPSIBLE_THRESHOLD && !open && (
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-bg-input to-transparent" />
          )}
        </div>

        {lineCount > COLLAPSIBLE_THRESHOLD && (
          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            className="flex items-center justify-center gap-1.5 w-full py-2 border-t border-border-primary font-mono text-xs text-text-secondary enabled:hover:bg-bg-elevated enabled:hover:text-text-primary transition-colors cursor-pointer"
          >
            {open ? "show less" : "show more"}
            <ChevronDown
              size={12}
              className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}
            />
          </button>
        )}
      </div>
    </div>
  );
}
