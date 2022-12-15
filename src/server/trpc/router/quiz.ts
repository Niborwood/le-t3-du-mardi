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
        OR: [
          {
            used: true,
          },
          {
            current: true,
          },
        ],
      },
      orderBy: {
        votedAt: "desc",
      },
    });
  }),
  getCurrentTopic: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.topic.findFirst({
      where: {
        used: false,
        current: true,
      },
      orderBy: {
        votes: "desc",
      },
    });
  }),
  hasUserAlreadyVoted: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.answer.findMany({
      where: {
        userId: ctx.session.user.id,
        topic: {
          used: false,
          current: true,
        },
      },
      take: 3,
    });
  }),
  getCurrentAnswers: publicProcedure
    .input(z.string().cuid().optional())
    .query(({ ctx, input }) => {
      if (!input) throw new TRPCError({ code: "BAD_REQUEST" });

      return ctx.prisma.answer.groupBy({
        by: ["name"],
        _sum: {
          score: true,
        },
        where: {
          topicId: input,
          banned: false,
        },
        orderBy: {
          _sum: {
            score: "desc",
          },
        },
      });
    }),
  getPastTopics: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.topic.findMany({
      take: 4,
      where: {
        OR: [
          {
            used: true,
          },
          {
            current: true,
          },
        ],
      },
      orderBy: {
        votedAt: "desc",
      },
      include: {
        _count: true,
        answers: {
          where: {
            banned: false,
          },
        },
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
        answers: z.array(z.string().min(1).max(30).trim()).length(3),
        topicId: z.string().cuid(),
      })
    )
    .mutation(({ ctx, input }) => {
      // If it's not tuesday, throw an error
      return ctx.prisma.answer.createMany({
        data: input.answers.map((answer, index) => ({
          // Replace '?' width '' in name
          name: answer.replace(/\?/g, "").toLowerCase(),
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

  postTopic: protectedProcedure
    .input(z.string().min(1).trim())
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.topic.create({
        data: {
          name: input.toLowerCase(),
          userId: ctx.session.user.id || "claxv5jgh0006tojg4pflb1ad", // test ID
        },
      });
    }),
});
