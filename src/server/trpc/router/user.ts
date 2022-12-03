import { router, publicProcedure, protectedProcedure } from "../trpc";

export const userRouter = router({
  getSession: publicProcedure.query(({ ctx }) => {
    return ctx.session;
  }),

  unsubscribe: protectedProcedure.mutation(async ({ ctx }) => {
    const { isUnsubscribed } = await ctx.prisma.user.findFirstOrThrow({
      where: {
        id: ctx.session.user.id,
      },
    });

    return ctx.prisma.user.update({
      where: {
        id: ctx.session.user.id,
      },
      data: {
        isUnsubscribed: !isUnsubscribed,
      },
    });
  }),

  getStats: protectedProcedure.query(async ({ ctx }) => {
    return ctx.prisma.user.findFirst({
      where: {
        id: ctx.session.user.id,
      },
    });
  }),
});
