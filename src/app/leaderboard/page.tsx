import type { Metadata } from "next";
import type { BundledLanguage } from "shiki";
import { ShameLeaderboardEntry } from "@/app/shame-leaderboard-entry";
import { Hero } from "@/components";
import { CodeBlock } from "@/components/code-block";
import { createTRPCContext } from "@/trpc/init";
import { createCaller } from "@/trpc/server";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Shame Leaderboard | devroast",
  description:
    "the most roasted code on the internet. see the worst code submissions ranked by shame.",
  openGraph: {
    title: "Shame Leaderboard | devroast",
    description: "the most roasted code on the internet",
    type: "website",
  },
};

export default async function LeaderboardPage() {
  const caller = createCaller(await createTRPCContext());
  const { entries, totalCount } = await caller.roast.getShameLeaderboard({
    limit: 20,
  });

  return (
    <main className="flex min-h-screen flex-col items-center bg-bg-page px-10 py-10">
      <div className="flex w-full max-w-3xl flex-col gap-10 items-center">
        <Hero>
          <Hero.Title prefix="> ">shame_leaderboard</Hero.Title>
          <Hero.Description>
            the most roasted code on the internet
          </Hero.Description>
        </Hero>

        <div className="flex w-full flex-col gap-5">
          {entries.map((entry) => (
            <ShameLeaderboardEntry
              key={entry.id}
              rank={entry.rank}
              score={entry.score}
              language={entry.language}
              lineCount={entry.lineCount}
            >
              <CodeBlock
                code={entry.code}
                lang={entry.language as BundledLanguage}
                className="border-0"
              />
            </ShameLeaderboardEntry>
          ))}
        </div>

        <p className="font-mono text-xs text-text-tertiary text-center">
          showing top {entries.length} of {totalCount.toLocaleString()} · view
          full leaderboard &gt;&gt;
        </p>

        <div className="h-16" />
      </div>
    </main>
  );
}
