import * as trpc from "@trpc/server";
import superjson from "superjson";
import { prisma } from "../../db/client";
import { questionsRouter } from "./questions";

export const appRouter = trpc
  .router()
  .transformer(superjson)
  .merge("questions.", questionsRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
