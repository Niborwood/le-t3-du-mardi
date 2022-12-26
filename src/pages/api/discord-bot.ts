import type { NextApiRequest, NextApiResponse } from "next";
import { env } from "../../env/server.mjs";
import { weekday } from "../../utils/";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { authorization } = req.headers;
    if (!authorization || authorization !== `Bearer ${env.API_SECRET}`)
      return res.status(401).json({ success: false });

    await fetch(env.DISCORD_WEBHOOK, {
      method: "POST",
      body: JSON.stringify({
        content: `Aujourd'hui c'est top 3 ! \n \n https://top3dumardi.vercel.app/`,
        username: `Le Top 3 du ${
          weekday.charAt(0).toUpperCase() + weekday.slice(1)
        }`,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return res.status(200).json({ message: "Success" });
  } catch (err) {
    // Return unauthorized
    return res.status(401).json({ message: "Failed" });
  }
};

export default handler;
