import { ArrowDownRight, ArrowLeft, ArrowRight } from "lucide-react";
import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

import { trpc } from "../utils/trpc";

// COMPONENTS
import {
  LayoutMenu,
  LayoutTitle,
  LayoutPrev,
  LayoutAbout,
  LayoutCTA,
} from "../components/layout";
import { Button } from "../components/ui";
import { useSession } from "next-auth/react";

const Home: NextPage = () => {
  const lastTopics = trpc.quiz.getLastTopics.useQuery();
  const { data: sessionData } = useSession();

  return (
    <>
      <Head>
        <title>Le top 3 du mardi</title>
        <meta
          name="description"
          content="Si c'est mardi, c'est top 3. Si c'est pas mardi, c'est pas top 3."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* TITLE */}
      <LayoutTitle>
        <h1 className="py-8 font-clash text-7xl font-extrabold uppercase 2xl:row-span-2 2xl:text-9xl">
          Le <span className="rotate-3 text-emerald-600">top 3</span> du{" "}
          {new Intl.DateTimeFormat("fr-FR", {
            weekday: "long",
          }).format(new Date())}
        </h1>
        <p className="flex flex-col items-end justify-between gap-4 border-t-2 border-zinc-800 py-4 text-lg 2xl:flex-row 2xl:text-2xl">
          <span>
            Tous les <strong>jours</strong>, un top 3 de n&apos;importe quoi.
            <strong>Votez</strong> et <strong>proposez</strong> des sujets !
          </span>
          <ArrowDownRight
            className="relative top-1 rotate-45 2xl:rotate-0"
            size={40}
          />
        </p>
      </LayoutTitle>

      {/* MENU */}
      <LayoutMenu />

      {/* PREVIOUS */}
      <LayoutPrev>
        <main className="order-2 flex flex-col justify-between gap-2 rounded-md  bg-zinc-50 p-2 2xl:order-none 2xl:grid-rows-4 2xl:gap-4">
          <div className="space-y-4">
            {lastTopics.data?.length ? (
              lastTopics.data.map((topic, index) => (
                <button
                  className={`flex flex-row-reverse items-center justify-end gap-2 rounded-md bg-zinc-50 px-4 py-6 text-left text-xl font-light uppercase text-zinc-900 transition-all hover:scale-105 lg:py-3 2xl:gap-4 2xl:py-0 2xl:row-start-${
                    index + 2
                  }`}
                  key={topic.id}
                >
                  <span>
                    Top 3{" "}
                    <span className="font-semibold text-emerald-700">
                      {topic.name}
                    </span>
                  </span>
                  <ArrowRight className="min-w-[30px] 2xl:-rotate-45" />
                </button>
              ))
            ) : (
              <div className="col-auto grid place-items-center p-8 text-zinc-900">
                Il n&apos;y a pas encore d&apos;historique.
              </div>
            )}
          </div>

          {/* See More */}
          <Button variant="secondary" size="md" href="/topics">
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
        <div className="grid gap-4 2xl:col-span-2 2xl:grid-cols-2">
          <Button variant="secondary" href={sessionData ? "/topics" : "/me"}>
            Voir les anciens résultats
          </Button>
          <Button
            variant="primary"
            href={sessionData ? "/play" : "/me"}
            disabled={!sessionData}
          >
            {!sessionData ? "Se connecter pour voter" : "Voter"}
          </Button>
        </div>
      </LayoutCTA>
    </>
  );
};

export default Home;
