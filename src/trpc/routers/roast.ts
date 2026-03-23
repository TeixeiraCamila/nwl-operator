import { asc, avg, count } from "drizzle-orm";
import { z } from "zod";
import { roasts } from "@/db/schema";
import { baseProcedure, createTRPCRouter } from "../init";

export const roastRouter = createTRPCRouter({
  getShameLeaderboard: baseProcedure
    .input(z.object({ limit: z.number().default(3) }))
    .query(async ({ ctx, input }) => {
      const [entries, [{ totalRoasts, avgScore, totalCount }]] =
        await Promise.all([
          ctx.db
            .select({
              id: roasts.id,
              score: roasts.score,
              code: roasts.code,
              language: roasts.language,
            })
            .from(roasts)
            .orderBy(asc(roasts.score))
            .limit(input.limit),
          ctx.db
            .select({
              totalRoasts: count(),
              avgScore: avg(roasts.score),
              totalCount: count(),
            })
            .from(roasts),
        ]);

      return {
        entries: entries.map((entry, index) => ({
          ...entry,
          rank: index + 1,
          lineCount: entry.code.split("\n").length,
        })),
        totalRoasts: totalRoasts ?? 0,
        avgScore: Number(avgScore ?? 0),
        totalCount: totalCount ?? 0,
      };
    }),
});
