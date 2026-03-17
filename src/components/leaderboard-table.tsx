import { forwardRef, type HTMLAttributes } from "react";

import { tv, type VariantProps } from "tailwind-variants";

import { cn } from "@/lib/utils";

const leaderboardTableVariants = tv({
  slots: {
    root: "w-full border border-border-primary",
    header:
      "flex h-10 w-full items-center border-b border-border-primary bg-bg-surface px-5",
    headerCell: "font-mono text-xs font-medium text-text-tertiary",
    row: "flex items-center px-5 py-4",
    cell: "",
    rank: "w-[50px] font-mono text-xs",
    rankFirst: "text-accent-amber",
    rankOther: "text-text-secondary",
    score: "w-[70px] font-mono text-xs font-bold text-accent-red",
    code: "flex-1 font-mono text-xs text-text-primary",
    codeLine: "text-text-primary",
    codeComment: "text-zinc-500",
    lang: "w-[100px] font-mono text-xs text-text-secondary",
  },
  variants: {
    size: {
      default: "",
      sm: "text-sm",
      lg: "text-lg",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

export interface LeaderboardTableProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof leaderboardTableVariants> {
  entries?: {
    rank: number;
    score: number;
    code: string | string[];
    lang: string;
  }[];
}

const defaultEntries = [
  {
    rank: 1,
    score: 1.2,
    code: [
      'eval(prompt("enter code"))',
      "document.write(response)",
      "// trust the user lol",
    ],
    lang: "javascript",
  },
  {
    rank: 2,
    score: 1.8,
    code: [
      "if (x == true) { return true; }",
      "else if (x == false) { return false; }",
      "else { return !false; }",
    ],
    lang: "typescript",
  },
  {
    rank: 3,
    score: 2.1,
    code: ["SELECT * FROM users WHERE 1=1", "-- TODO: add authentication"],
    lang: "sql",
  },
];

const LeaderboardTableRoot = forwardRef<HTMLDivElement, LeaderboardTableProps>(
  ({ className, size, entries = defaultEntries, children, ...props }, ref) => {
    const {
      root,
      header,
      headerCell,
      row,
      rank,
      rankFirst,
      rankOther,
      score,
      code,
      codeLine,
      codeComment,
      lang,
    } = leaderboardTableVariants({ size });

    const renderCode = (codeValue: string | string[]) => {
      const lines = Array.isArray(codeValue) ? codeValue : [codeValue];
      return lines.map((line) => (
        <span
          key={line}
          className={cn(
            codeLine(),
            line.startsWith("//") || line.startsWith("--") ? codeComment() : "",
          )}
        >
          {line}
        </span>
      ));
    };

    return (
      <div ref={ref} className={cn(root({ className }))} {...props}>
        <div className={header()}>
          <span className={cn(headerCell(), "w-[50px]")}>#</span>
          <span className={cn(headerCell(), "w-[70px]")}>score</span>
          <span className={cn(headerCell(), "flex-1")}>code</span>
          <span className={cn(headerCell(), "w-[100px]")}>lang</span>
        </div>
        {children ||
          entries.map((entry) => (
            <div key={entry.rank} className={row()}>
              <span
                className={cn(
                  rank(),
                  entry.rank === 1 ? rankFirst() : rankOther(),
                )}
              >
                {entry.rank}
              </span>
              <span className={score()}>{entry.score}</span>
              <span className={cn(code(), "flex-col gap-[3px]")}>
                {renderCode(entry.code)}
              </span>
              <span className={lang()}>{entry.lang}</span>
            </div>
          ))}
      </div>
    );
  },
);

LeaderboardTableRoot.displayName = "LeaderboardTableRoot";

export interface LeaderboardTableHeaderProps
  extends HTMLAttributes<HTMLDivElement> {}

const LeaderboardTableHeader = forwardRef<
  HTMLDivElement,
  LeaderboardTableHeaderProps
>(({ className, children, ...props }, ref) => {
  const { header, headerCell } = leaderboardTableVariants();

  return (
    <div ref={ref} className={cn(header({ className }))} {...props}>
      {children || (
        <>
          <span className={headerCell()}>#</span>
          <span className={headerCell()}>score</span>
          <span className={cn(headerCell(), "flex-1")}>code</span>
          <span className={headerCell()}>lang</span>
        </>
      )}
    </div>
  );
});

LeaderboardTableHeader.displayName = "LeaderboardTableHeader";

export interface LeaderboardTableRowProps
  extends HTMLAttributes<HTMLDivElement> {}

const LeaderboardTableRow = forwardRef<
  HTMLDivElement,
  LeaderboardTableRowProps
>(({ className, children, ...props }, ref) => {
  const { row } = leaderboardTableVariants();

  return (
    <div ref={ref} className={cn(row({ className }))} {...props}>
      {children}
    </div>
  );
});

LeaderboardTableRow.displayName = "LeaderboardTableRow";

export interface LeaderboardTableCellProps
  extends HTMLAttributes<HTMLSpanElement> {
  variant?: "rank" | "score" | "code" | "lang";
  isFirst?: boolean;
}

const LeaderboardTableCell = forwardRef<
  HTMLSpanElement,
  LeaderboardTableCellProps
>(({ className, variant = "code", isFirst, children, ...props }, ref) => {
  const { rank, rankFirst, rankOther, score, code, lang } =
    leaderboardTableVariants();

  const variantClasses = {
    rank: cn(rank(), isFirst ? rankFirst() : rankOther()),
    score: score(),
    code: code(),
    lang: lang(),
  };

  return (
    <span
      ref={ref}
      className={cn(variantClasses[variant], className)}
      {...props}
    >
      {children}
    </span>
  );
});

LeaderboardTableCell.displayName = "LeaderboardTableCell";

const LeaderboardTable = Object.assign(LeaderboardTableRoot, {
  Header: LeaderboardTableHeader,
  Row: LeaderboardTableRow,
  Cell: LeaderboardTableCell,
});

export {
  LeaderboardTable,
  LeaderboardTableCell,
  LeaderboardTableHeader,
  LeaderboardTableRoot,
  LeaderboardTableRow,
  leaderboardTableVariants,
};
