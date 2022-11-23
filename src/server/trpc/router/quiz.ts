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
  getAllTopics: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.topic.findMany();
  }),
});