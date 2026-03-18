import { StatsCard } from "./stats-card";
import { createCaller } from "@/trpc/server";
import { createTRPCContext } from "@/trpc/init";

interface StatsMetricsProps {
  className?: string;
}

export async function StatsMetrics({ className }: StatsMetricsProps) {
  let stats;

  try {
    const caller = createCaller(await createTRPCContext());
    stats = await caller.roast.getStats();
  } catch {
    stats = { totalRoasts: 0, avgScore: 0 };
  }

  return (
    <div className={className}>
      <StatsCard value={stats.totalRoasts} label="codes roasted" />
      <StatsCard value={stats.avgScore} suffix="/10" label="avg score" />
    </div>
  );
}
