import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const quizRouter = router({
  hello: publicProcedure
    .input(z.object({ text: z.string().nullish() }).nullish())
    .query(({ input }) => {
      return {
        greeting: `Hello ${input?.text ?? "world"}`,
      };
    }),

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
      if (!input) return [];

      return ctx.prisma.answer.groupBy({
        by: ["name"],
        where: {
          topicId: input,
          banned: false,
        },
      });
    }),

  // Mutation procedures
  postAnswers: publicProcedure
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
          userId: ctx.session?.user?.id || "claxv5jgh0006tojg4pflb1ad", // test ID
        })),
      });
    }),
});
