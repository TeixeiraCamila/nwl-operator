import { FooterHint } from "@/components/sections/footer-hint";
import { createTRPCContext } from "@/trpc/init";
import { createCaller } from "@/trpc/server";
import { StatsValue } from "./stats-value";

interface StatsMetricsProps {
  className?: string;
}

export async function StatsMetrics({ className }: StatsMetricsProps) {
  let stats: { totalRoasts: number; avgScore: number } = {
    totalRoasts: 0,
    avgScore: 0,
  };

  try {
    const caller = createCaller(await createTRPCContext());
    const data = await caller.roast.getShameLeaderboard({ limit: 0 });
    stats = { totalRoasts: data.totalRoasts, avgScore: data.avgScore };
  } catch {
    // Keep default values
  }

  return (
    <FooterHint className={className}>
      <FooterHint.Item>
        <StatsValue value={stats.totalRoasts} /> codes roasted
      </FooterHint.Item>
      <FooterHint.Separator />
      <FooterHint.Item>
        avg score:{" "}
        <StatsValue value={stats.avgScore} decimals={1} suffix="/10" />
      </FooterHint.Item>
    </FooterHint>
  );
}
