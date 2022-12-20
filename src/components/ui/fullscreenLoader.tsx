import Head from "next/head";
import React from "react";
import { weekday } from "../../utils";
import { trpc } from "../../utils/trpc";

export const FullscreenLoader = () => {
  const { data: currentTopic } = trpc.quiz.getCurrentTopic.useQuery();

  return (
    <div className="grid h-screen w-screen place-items-center bg-emerald-600 p-4 font-clash text-6xl font-bold text-zinc-50 lg:text-8xl 2xl:text-9xl">
      <Head>
        <meta
          name="description"
          content="Tous les jours, un top 3 de n'importe quoi."
        />
        <meta
          property="og:image"
          content={`https://top3dumardi.vercel.app/api/og?top=${currentTopic?.name}}`}
        />
      </Head>
      <h2 className="animate-fade-in">Le top 3 du {weekday}.</h2>
    </div>
  );
};
