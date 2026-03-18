import "server-only";

import { createCallerFactory } from "@/trpc/init";
import { appRouter } from "@/trpc/routers/_app";

export const createCaller = createCallerFactory(appRouter);
