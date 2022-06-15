import * as trpc from "@trpc/server";
import { prisma } from "../../db/client";
import { z } from "zod";

export const questionsRouter = trpc
  .router()
  .query("get-all", {
    async resolve() {
      return await prisma.pollQuestion.findMany();
    },
  })
  .query("get-by-id", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ input }) {
      return await prisma.pollQuestion.findUnique({ where: { id: input.id } });
    },
  })
  .mutation("create", {
    input: z.object({
      question: z.string().min(5).max(400),
    }),
    async resolve({ input }) {
      return await prisma.pollQuestion.create({
        data: {
          question: input.question,
        },
      });
    },
  });
