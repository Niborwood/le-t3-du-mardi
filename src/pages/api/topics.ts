import { type NextApiRequest, type NextApiResponse } from "next";

import { prisma } from "../../server/db/client";

const topics = async (req: NextApiRequest, res: NextApiResponse) => {
  const topics = await prisma.topic.findMany();
  res.status(200).json(topics);
};

export default topics;
