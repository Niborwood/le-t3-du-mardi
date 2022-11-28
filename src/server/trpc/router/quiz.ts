import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { router, publicProcedure, protectedProcedure } from "../trpc";

export const quizRouter = router({
  // Query procedures
  getAllTopics: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.topic.findMany();
  }),
  getLastTopics: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.topic.findMany({
      take: 3,
      where: {
        used: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }),
  getCurrentTopic: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.topic.findFirst({
      where: {
        used: false,
      },
      orderBy: {
        votes: "desc",
      },
    });
  }),
  getCurrentAnswers: publicProcedure
    .input(z.string().cuid().optional())
    .query(({ ctx, input }) => {
      if (!input) throw new TRPCError({ code: "BAD_REQUEST" });

      return ctx.prisma.answer.groupBy({
        by: ["name"],
        where: {
          topicId: input,
          banned: false,
        },
      });
    }),
  getPastTopics: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.topic.findMany({
      take: 4,
      where: {
        used: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }),
  getTopicToVote: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.topic.findFirst({
      where: {
        used: false,
        current: false,
        users: {
          none: {
            userId: ctx.session.user.id,
          },
        },
      },
    });
  }),

  // Mutation procedures
  postAnswers: protectedProcedure
    .input(
      z.object({
        answers: z.array(z.string().min(1).trim()),
        topicId: z.string().cuid(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.answer.createMany({
        data: input.answers.map((answer, index) => ({
          name: answer,
          score: input.answers.length - index,
          topicId: input.topicId,
          userId: ctx.session.user.id || "claxv5jgh0006tojg4pflb1ad", // test ID
        })),
      });
    }),

  postTopicVote: protectedProcedure
    .input(
      z.object({
        topicId: z.string().cuid(),
        type: z.enum(["increment", "decrement"]),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const topic = await ctx.prisma.topic.findUnique({
        where: {
          id: input.topicId,
        },
      });
      if (!topic) throw new TRPCError({ code: "BAD_REQUEST" });

      await ctx.prisma.topic.update({
        where: {
          id: input.topicId,
        },
        data: {
          votes: {
            [input.type]: 1,
          },
        },
      });

      return ctx.prisma.topicsOnUsers.create({
        data: {
          topicId: input.topicId,
          userId: ctx.session.user.id || "claxv5jgh0006tojg4pflb1ad", // test ID
        },
      });
    }),
});
