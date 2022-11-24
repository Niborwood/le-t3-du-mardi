import { ArrowDownRight, ArrowLeft, ArrowRight, Plus } from "lucide-react";
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

const Home: NextPage = () => {
  const lastTopics = trpc.quiz.getLastTopics.useQuery();

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
        <h1 className="py-8 font-clash text-7xl font-extrabold uppercase lg:text-8xl 2xl:row-span-2 2xl:text-9xl">
          Le <span className="rotate-3 text-emerald-600">top 3</span> du mardi
        </h1>
        <p className="flex flex-col items-end justify-between gap-4 border-t-2 border-zinc-800 py-4 text-lg 2xl:flex-row 2xl:text-2xl">
          <span>
            Tous les <strong>mardis</strong>, un top 3 de n&apos;importe quoi.
            Si on n&apos;est <strong>pas mardi</strong> ? On joue pas.
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
        <main className="order-2 gap-2 space-y-2 2xl:order-none 2xl:grid-rows-4  2xl:gap-4">
          {lastTopics.data?.map((topic, index) => (
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
          ))}

          {/* See More */}
          <button className="flex flex-row-reverse items-center justify-end gap-2 rounded-md border-4 border-zinc-50 px-4 py-6 font-bold uppercase text-zinc-50 transition-all hover:scale-105 lg:py-3 2xl:row-start-4 2xl:-rotate-2 2xl:py-0">
            <span>
              Voir{" "}
              <span className="font-semibold text-zinc-50">plus de sujets</span>
            </span>
            <Plus className="min-w-[30px]" />
          </button>
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
        <div className="grid gap-4 lg:col-span-2 lg:grid-cols-2">
          <Button variant="secondary">
            <Link href="/topics">
              <span className="underline underline-offset-4">Voter</span> pour
              un sujet
            </Link>
          </Button>

          <Button variant="primary">
            <Link href="/play">Jouer</Link>
          </Button>
        </div>
      </LayoutCTA>
    </>
  );
};

export default Home;
