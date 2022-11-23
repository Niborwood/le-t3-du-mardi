import { router } from "../trpc";
import { authRouter } from "./auth";
import { quizRouter } from "./quiz";

export const appRouter = router({
  quiz: quizRouter,
  auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
