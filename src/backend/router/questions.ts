import * as trpc from "@trpc/server";
import { prisma } from "../../db/client";
import { z } from "zod";
import { createRouter } from "../context";

export const questionsRouter = createRouter()
  .query("get-all-by-owner", {
    async resolve({ ctx }) {
      return await prisma.pollQuestion.findMany({
        where: {
          ownerToken: ctx.token,
        },
      });
    },
  })
  .query("get-by-id", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ input, ctx }) {
      const question = await prisma.pollQuestion.findUnique({
        where: { id: input.id },
      });

      return {
        question,
        isOwner: question?.ownerToken === ctx.token,
      };
    },
  })
  .mutation("create", {
    input: z.object({
      question: z.string().min(5).max(400),
    }),
    async resolve({ input, ctx }) {
      if (!ctx.token) return { error: "Unauthorized" };

      return await prisma.pollQuestion.create({
        data: {
          question: input.question,
          options: [],
          ownerToken: ctx.token,
        },
      });
    },
  });
