// API Endpoint that chooses the answer that have the greatest score, then puts it as current: true. Any other current:true answers are set to current: false and used: true. API is trigger with GitHub Actions every tuesday at midnight, so it needs API_SECRET in Authorization header to be able to run.
import { type NextApiRequest, type NextApiResponse } from "next";

import { prisma } from "../../server/db/client";

const cron = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const { authorization } = req.headers;

      // Checks for authorization bearer token
      if (authorization === `Bearer ${process.env.API_SECRET}`) {
        // Old current topic is set to used: true and current:false
        await prisma.topic.updateMany({
          data: {
            current: false,
            used: true,
          },
          where: {
            current: true,
          },
        });

        // Finds the answer with the highest score
        const topic = await prisma.topic.findFirst({
          where: {
            used: false,
            current: false,
          },
          include: {
            answers: true,
          },
          orderBy: {
            votes: "desc",
          },
          take: 1,
        });

        // If no topic is found, find the topic with the least votes and set it as current
        if (!topic) {
          // Finds the answer with the lowest count of answers
          const topicWithLowestAnswers = await prisma.topic.findFirst({
            where: {
              current: false,
            },
            include: {
              answers: true,
            },
            orderBy: {
              answers: {
                _count: "asc",
              },
            },
            take: 1,
          });

          if (!topicWithLowestAnswers) {
            res.status(403).json({ message: "No topics found" });
            return;
          }

          // Sets the topic as current: true
          await prisma.topic.update({
            data: {
              current: true,
              votedAt: new Date(),
            },
            where: {
              id: topicWithLowestAnswers.id,
            },
          });

          res.status(200).json({ message: "Success, old topic" });
          return;
        }

        // Sets the topic as current: true
        await prisma.topic.update({
          data: {
            current: true,
            votedAt: new Date(),
          },
          where: {
            id: topic.id,
          },
        });

        // Delete any answer that have a score lower than 0
        await prisma.topic.deleteMany({
          where: {
            votes: {
              lt: 0,
            },
          },
        });

        res.status(200).json({ message: "Success, new topic" });
      } else {
        res.status(401).json({ success: false });
      }
    } catch (err: any) {
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
};

export default cron;
