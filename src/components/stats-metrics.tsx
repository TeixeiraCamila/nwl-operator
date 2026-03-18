import { FooterHint } from "@/components/sections/footer-hint";
import { createCaller } from "@/trpc/server";
import { createTRPCContext } from "@/trpc/init";
import { StatsValue } from "./stats-value";

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
    <FooterHint className={className}>
      <FooterHint.Item>
        <StatsValue value={stats.totalRoasts} /> codes roasted
      </FooterHint.Item>
      <FooterHint.Separator />
      <FooterHint.Item>
        avg score: <StatsValue value={stats.avgScore} decimals={1} suffix="/10" />
      </FooterHint.Item>
    </FooterHint>
  );
}
