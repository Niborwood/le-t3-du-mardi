import { router } from "../trpc";
import { userRouter } from "./user";
import { quizRouter } from "./quiz";

export const appRouter = router({
  quiz: quizRouter,
  user: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
