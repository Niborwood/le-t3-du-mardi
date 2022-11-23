import { ArrowDownRight } from "lucide-react";
import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import {
  LayoutMenu,
  LayoutTitle,
  LayoutPrev,
  LayoutAbout,
  LayoutCTA,
} from "../components/layout";
import { Button } from "../components/ui";

import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const topics = trpc.quiz.getAllTopics.useQuery();
  console.log("🚀 ~ file: index.tsx ~ line 9 ~ topics", topics);

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
        <div>Hello</div>
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
