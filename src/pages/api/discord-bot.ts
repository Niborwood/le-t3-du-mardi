import type { NextApiRequest, NextApiResponse } from "next";
import { env } from "../../env/server.mjs";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { authorization } = req.headers;
    if (authorization === `Bearer ${process.env.API_SECRET}`) {
      await fetch(env.DISCORD_WEBHOOK, {
        method: "POST",
        body: JSON.stringify({
          content: `Aujourd'hui c'est top 3 ! \n \n https://top3dumardi.vercel.app/`,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      return res.status(200).json({ message: "Success" });
    }
  } catch (err) {}
};

export default handler;
