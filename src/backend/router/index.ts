import superjson from "superjson";
import { prisma } from "../../db/client";
import { createRouter } from "../context";
import { questionsRouter } from "./questions";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("questions.", questionsRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
