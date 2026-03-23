import Link from "next/link";
import { Suspense } from "react";
import { Button, Hero } from "@/components";
import { LeaderboardPreview } from "@/components/sections/leaderboard-preview";
import {
  ShameLeaderboard,
  ShameLeaderboardSkeleton,
} from "@/components/shame-leaderboard";
import { StatsMetrics } from "@/components/stats-metrics";
import { HomeClient } from "./home-client";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-bg-page px-10 py-10">
      <div className="flex w-full max-w-5xl flex-col items-center gap-8">
        <Hero>
          <Hero.Title prefix="> ">paste your code. get roasted.</Hero.Title>
          <Hero.Description>
            drop your code below and we&apos;ll rate it — brutally honest or
            full roast mode
          </Hero.Description>
        </Hero>

        <HomeClient />

        <StatsMetrics className="flex items-center gap-8" />

        <div className="h-[60px]" />

        <LeaderboardPreview>
          <LeaderboardPreview.Header>
            <LeaderboardPreview.Title>
              shame_leaderboard
            </LeaderboardPreview.Title>
            <Link href="/leaderboard">
              <Button variant="ghost" size="sm">
                $ view_all &gt;&gt;
              </Button>
            </Link>
          </LeaderboardPreview.Header>
          <LeaderboardPreview.Description>
            the worst code on the internet, ranked by shame
          </LeaderboardPreview.Description>
          <Suspense fallback={<ShameLeaderboardSkeleton />}>
            <ShameLeaderboard />
          </Suspense>
        </LeaderboardPreview>

        <div className="h-16" />
      </div>
    </main>
  );
}
