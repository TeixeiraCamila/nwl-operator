import { forwardRef, type HTMLAttributes } from "react";

import { tv, type VariantProps } from "tailwind-variants";

import { cn } from "@/lib/utils";

const leaderboardEntryVariants = tv({
  slots: {
    root: "flex w-full flex-col border border-border-primary bg-bg-input",
    header:
      "flex h-12 items-center justify-between border-b border-border-primary px-5",
    headerLeft: "flex items-center gap-4",
    headerRight: "flex items-center gap-3",
    rank: "flex items-center gap-1.5",
    rankHash: "font-mono text-[13px] text-text-tertiary",
    rankNumber: "font-mono text-[13px] font-bold",
    rankFirst: "text-accent-amber",
    rankOther: "text-text-secondary",
    score: "flex items-center gap-1.5",
    scoreLabel: "font-mono text-xs text-text-tertiary",
    scoreValue: "font-mono text-[13px] font-bold text-accent-red",
    langTag: "font-mono text-xs text-text-secondary",
    linesTag: "font-mono text-xs text-text-tertiary",
    codeContainer:
      "flex h-[120px] overflow-hidden border-t border-border-primary",
    lineNumbers:
      "flex h-full w-10 flex-col items-end gap-1.5 border-r border-border-primary bg-bg-surface px-2.5 py-3.5",
    lineNumber: "font-mono text-xs leading-6 text-text-tertiary",
    codeContent: "flex h-full flex-col gap-1.5 overflow-y-auto px-4 py-3.5",
    codeLine: "font-mono text-xs leading-6 text-text-primary whitespace-pre",
    codeComment: "text-zinc-500",
  },
  variants: {},
  defaultVariants: {},
});

export interface LeaderboardEntryProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof leaderboardEntryVariants> {
  rank: number;
  score: number;
  code: string[];
  lang: string;
}

const LeaderboardEntryRoot = forwardRef<HTMLDivElement, LeaderboardEntryProps>(
  ({ className, rank, score, code, lang, ...props }, ref) => {
    const {
      root,
      header,
      headerLeft,
      headerRight,
      rank: rankClass,
      rankHash,
      rankNumber,
      rankFirst,
      rankOther,
      score: scoreClass,
      scoreLabel,
      scoreValue,
      langTag,
      linesTag,
      codeContainer,
      lineNumbers,
      lineNumber,
      codeContent,
      codeLine,
      codeComment,
    } = leaderboardEntryVariants();

    return (
      <div ref={ref} className={cn(root(), className)} {...props}>
        <div className={header()}>
          <div className={headerLeft()}>
            <div className={rankClass()}>
              <span className={rankHash()}>#</span>
              <span
                className={cn(
                  rankNumber(),
                  rank === 1 ? rankFirst() : rankOther(),
                )}
              >
                {rank}
              </span>
            </div>
            <div className={scoreClass()}>
              <span className={scoreLabel()}>score:</span>
              <span className={scoreValue()}>{score}</span>
            </div>
          </div>
          <div className={headerRight()}>
            <span className={langTag()}>{lang}</span>
            <span className={linesTag()}>{code.length} lines</span>
          </div>
        </div>
        <div className={codeContainer()}>
          <div className={lineNumbers()}>
            {code.map((line) => (
              <span
                key={`ln-${rank}-${line.slice(0, 10).replace(/[^a-zA-Z0-9]/g, "")}`}
                className={lineNumber()}
              >
                {code.indexOf(line) + 1}
              </span>
            ))}
          </div>
          <div className={codeContent()}>
            {code.map((line) => (
              <span
                key={`cl-${rank}-${line.slice(0, 10).replace(/[^a-zA-Z0-9]/g, "")}`}
                className={cn(
                  codeLine(),
                  line.startsWith("//") || line.startsWith("--")
                    ? codeComment()
                    : "",
                )}
              >
                {line}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  },
);

LeaderboardEntryRoot.displayName = "LeaderboardEntryRoot";

const LeaderboardEntry = LeaderboardEntryRoot;

export { LeaderboardEntry, LeaderboardEntryRoot, leaderboardEntryVariants };
