import { TRPCError } from "@trpc/server";
import { getHTTPStatusCodeFromError } from "@trpc/server/http";
import type { NextApiRequest, NextApiResponse } from "next";
import { appRouter } from "../../server/trpc/router/_app";
import { createContext } from "../../server/trpc/context";

type ResponseData = string | null | { error: { message: string } };

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) => {
  /** We want to simulate an error, so we pick a post ID that does not exist in the database. */
  const caller = appRouter.createCaller(await createContext({ req, res }));
  try {
    // the server-side call
    const currentTopic = await caller.quiz.getCurrentTopic();
    if (!currentTopic) throw new TRPCError({ code: "NOT_FOUND" });
    res.status(200).json(currentTopic.name);
  } catch (cause) {
    // If this a tRPC error, we can extract additional information.
    if (cause instanceof TRPCError) {
      // We can get the specific HTTP status code coming from tRPC (e.g. 404 for `NOT_FOUND`).
      const httpStatusCode = getHTTPStatusCodeFromError(cause);
      res.status(httpStatusCode).json({ error: { message: cause.message } });
      return;
    }
    // This is not a tRPC error, so we don't have specific information.
    res.status(500).json({
      error: { message: `Error while accessing current topic` },
    });
  }
};

export default handler;
