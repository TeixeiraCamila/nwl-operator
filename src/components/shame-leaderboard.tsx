import type { BundledLanguage } from "shiki";
import { ShameLeaderboardEntry } from "@/app/shame-leaderboard-entry";
import { createTRPCContext } from "@/trpc/init";
import { createCaller } from "@/trpc/server";
import { CodeBlock } from "./code-block";

async function ShameLeaderboard() {
  const caller = createCaller(await createTRPCContext());
  const { entries } = await caller.roast.getShameLeaderboard({ limit: 3 });

  return (
    <div className="flex flex-col gap-5">
      {entries.map((entry, index) => (
        <ShameLeaderboardEntry
          key={entry.id}
          rank={index + 1}
          score={entry.score}
          language={entry.language}
          lineCount={entry.code.split("\n").length}
        >
          <CodeBlock
            code={entry.code}
            lang={entry.language as BundledLanguage}
            className="border-0"
          />
        </ShameLeaderboardEntry>
      ))}
    </div>
  );
}

export { ShameLeaderboard };

export function ShameLeaderboardSkeleton() {
  return (
    <div className="flex flex-col gap-5">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={`skeleton-card-${index.toString()}`}
          className="flex flex-col border border-border-primary overflow-hidden"
        >
          <div className="flex h-12 w-full items-center justify-between border-b border-border-primary bg-bg-surface px-5">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <span className="inline-block h-3 w-3 animate-pulse rounded-sm bg-bg-elevated" />
                <span className="inline-block h-3 w-4 animate-pulse rounded-sm bg-bg-elevated" />
              </div>
              <div className="flex items-center gap-1.5">
                <span className="inline-block h-3 w-10 animate-pulse rounded-sm bg-bg-elevated" />
                <span className="inline-block h-3 w-6 animate-pulse rounded-sm bg-bg-elevated" />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-block h-3 w-16 animate-pulse rounded-sm bg-bg-elevated" />
              <span className="inline-block h-3 w-14 animate-pulse rounded-sm bg-bg-elevated" />
            </div>
          </div>

          <div className="flex flex-col gap-2 p-4">
            <span className="inline-block h-3 w-4/5 animate-pulse rounded-sm bg-bg-elevated" />
            <span className="inline-block h-3 w-3/5 animate-pulse rounded-sm bg-bg-elevated" />
            <span className="inline-block h-3 w-2/3 animate-pulse rounded-sm bg-bg-elevated" />
            <span className="inline-block h-3 w-1/2 animate-pulse rounded-sm bg-bg-elevated" />
          </div>
        </div>
      ))}
    </div>
  );
}
