import { ArrowDownRight } from "lucide-react";
import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { LayoutTitle } from "../components/layout";

import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const topics = trpc.quiz.getAllTopics.useQuery();
  console.log("🚀 ~ file: index.tsx ~ line 9 ~ topics", topics);

  return (
    <>
      <Head>
        <title>Le top 3 du mardi</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <LayoutTitle>
        <h1 className="py-8 font-clash text-7xl font-extrabold uppercase lg:text-8xl 2xl:row-span-2 2xl:text-9xl">
          Le <span className="rotate-3 text-emerald-700">top 3</span> du mardi
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
    </>
  );
};

export default Home;
