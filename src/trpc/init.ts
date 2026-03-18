import { initTRPC } from "@trpc/server";
import { cache } from "react";
import { db } from "@/db";

type Context = {
  db: typeof db;
};

const createContext = cache(async () => {
  return { db } as Context;
});

const t = initTRPC.context<Context>().create();

export { createContext as createTRPCContext };
export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const baseProcedure = t.procedure;
