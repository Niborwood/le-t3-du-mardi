import { ArrowLeft, ArrowRight } from "lucide-react";
import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { trpc } from "../utils/trpc";
import { useSession } from "next-auth/react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { weekday } from "../utils";

// COMPONENTS
import {
  LayoutMenu,
  LayoutTitle,
  LayoutPrev,
  LayoutAbout,
  LayoutCTA,
} from "../components/layout";
import { Button } from "../components/ui";

const Home: NextPage = () => {
  const lastTopics = trpc.quiz.getLastTopics.useQuery(undefined, {
    placeholderData: [
      { id: "placeholder-1", name: "..." },
      {
        id: "placeholder-2",
        name: "...",
      },
      {
        id: "placeholder-3",
        name: "...",
      },
    ],
  });
  const { data: sessionData, status } = useSession();
  const [parent] = useAutoAnimate<HTMLDivElement>();

  // if (status === "loading" || lastTopics.isLoading) return <FullscreenLoader />;

  return (
    <>
      <Head>
        <title>Le top 3 du mardi</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* TITLE */}
      <LayoutTitle>
        <div className="row-span-2 2xl:grid 2xl:grid-rows-4">
          <h1 className="py-8 font-clash text-7xl font-extrabold uppercase lg:text-6xl 2xl:row-span-3 2xl:text-9xl">
            Le <span className="rotate-3 text-emerald-600">top 3</span> du{" "}
            {weekday}
          </h1>
          <div className="row-span-1 gap-4 space-y-4 2xl:grid 2xl:grid-cols-3 2xl:space-y-0">
            <Button href="/play" className="relative text-left normal-case">
              <ArrowRight size={30} className="absolute right-2 bottom-2" />
              <div className="flex items-center gap-1 font-clash text-xl font-semibold">
                1. Voter
              </div>
              <p className="font-archivo text-sm font-light">
                Tous les jours, un nouveau sujet de top 3 est choisi. Chacun
                vote, soit avec ses réponses, soit avec celles des autres.
              </p>
            </Button>
            <Button
              variant="secondary"
              className="relative text-left normal-case"
              href="/topics"
            >
              <ArrowRight size={30} className="absolute right-2 bottom-2" />
              <div className="font-clash text-xl font-semibold">
                2. Consulter les anciens tops
              </div>
              <p className="font-archivo text-sm font-light">
                Regardez les classements du vote du jour et des précédentes
                votes. Les 12 meilleures réponses sont affichées.
              </p>
            </Button>
            <Button
              variant="secondary"
              className="relative text-left normal-case"
              href="/topics"
            >
              <ArrowRight size={30} className="absolute right-2 bottom-2" />
              <div className="font-clash text-xl font-semibold">
                3. Proposer et voter des tops
              </div>
              <p className="font-archivo text-sm font-light">
                Vous pouvez proposer vos propres tops et voter pour ceux des
                autres. Le vote qui a le meilleur score est sélectionné chaque
                matin&nbsp;!
              </p>
            </Button>
          </div>
        </div>
      </LayoutTitle>

      {/* MENU */}
      <LayoutMenu />

      {/* PREVIOUS */}
      <LayoutPrev>
        <main className="order-2 flex flex-col justify-between gap-2 rounded-md bg-zinc-50 p-2 2xl:order-none 2xl:grid-rows-4">
          {lastTopics.data?.length ? (
            lastTopics.data.map((topic, index) => (
              <Button
                className={`flex flex-row-reverse items-center justify-end gap-2 rounded-md bg-zinc-50 px-4 py-6 text-left text-base font-light uppercase text-zinc-900 transition-all lg:py-3 2xl:gap-2 2xl:py-1 2xl:row-start-${
                  index + 2
                }`}
                key={topic.id}
                size="sm"
                variant="secondary"
                href={`/topics?history=${index}`}
              >
                <span>
                  Top 3{" "}
                  <span className="font-semibold text-emerald-700">
                    {topic.name}
                  </span>
                </span>
                <ArrowRight className="min-w-[30px] 2xl:-rotate-45" />
              </Button>
            ))
          ) : (
            <div className="col-auto grid place-items-center p-8 text-zinc-900">
              Il n&apos;y a pas encore d&apos;historique.
            </div>
          )}

          {/* See More */}
          <Button variant="primary" size="md" href="/topics">
            Historique
          </Button>
        </main>

        <aside className="order-1 grid h-full w-full place-content-center place-items-center gap-4 rounded-lg bg-zinc-50 p-8 text-center text-4xl text-zinc-800 lg:p-4 2xl:order-none">
          <ArrowLeft size={80} className="-rotate-90 2xl:rotate-0" /> Précédents
          sujets
        </aside>
      </LayoutPrev>

      {/* ABOUT */}
      <LayoutAbout>
        <div className="grid place-items-center">
          <Image
            src="/finite-logo.png"
            alt="Logo"
            className="w-24 2xl:w-48"
            width={200}
            height={200}
          />
        </div>
      </LayoutAbout>

      {/* CTA */}
      <LayoutCTA>
        {status === "loading" ? (
          <div className="col-span-2 grid place-items-center">
            Chargement des tops...
          </div>
        ) : (
          <div
            className="grid gap-4 2xl:col-span-2 2xl:grid-cols-2"
            ref={parent}
          >
            <Button variant="secondary" href="/topics">
              Voir les anciens résultats
            </Button>
            <Button variant="primary" href={sessionData ? "/play" : "/me"}>
              {!sessionData ? "Se connecter pour voter" : "Voter"}
            </Button>
          </div>
        )}
      </LayoutCTA>
    </>
  );
};

export default Home;
