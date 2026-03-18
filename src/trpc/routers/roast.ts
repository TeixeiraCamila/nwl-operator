import { count, avg } from "drizzle-orm";
import { roasts } from "@/db/schema";
import { createTRPCRouter, baseProcedure } from "../init";

export const roastRouter = createTRPCRouter({
  getStats: baseProcedure.query(async ({ ctx }) => {
    const [stats] = await ctx.db
      .select({
        totalRoasts: count(),
        avgScore: avg(roasts.score),
      })
      .from(roasts);

    return {
      totalRoasts: stats?.totalRoasts ?? 0,
      avgScore: Number(stats?.avgScore ?? 0),
    };
  }),
});
