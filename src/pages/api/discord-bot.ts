import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { authorization } = req.headers;
    if (authorization === `Bearer ${process.env.API_SECRET}`) {
      const webhook =
        "https://discord.com/api/webhooks/1056748034832224367/0NGOGNq6k5pb-5A9saP5mbnxZ93RDFzHwOrpkoBs3OXD7juhh102dygpy-MRA7poJsIS";

      await fetch(webhook, {
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
