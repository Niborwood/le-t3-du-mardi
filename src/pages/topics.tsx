import classNames from "classnames";
import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import type { FormEventHandler } from "react";
import { useState } from "react";
import {
  LayoutAbout,
  LayoutCTA,
  LayoutMenu,
  LayoutPrev,
  LayoutTitle,
} from "../components/layout";
import { Button } from "../components/ui";
import { trpc } from "../utils/trpc";

const Topics: NextPage = () => {
  const { data: sessionData } = useSession();

  // TRPC
  const utils = trpc.useContext();
  const { data: pastTopics, isLoading: pastTopicsIsLoading } =
    trpc.quiz.getPastTopics.useQuery(undefined, {
      onSuccess: (data) => {
        if (!currentTopicId) setCurrentTopicId(data[0]?.id);
      },
    });

  const { data: topicToVote, isLoading: topicToVoteIsLoading } =
    trpc.quiz.getTopicToVote.useQuery();

  const { mutateAsync: voteForTopic } = trpc.quiz.postTopicVote.useMutation({
    onSuccess: () => {
      invalidateTopicToVote();
    },
  });
  const { mutateAsync: postTopic } = trpc.quiz.postTopic.useMutation({
    onSuccess: () => {
      invalidateTopicToVote();
    },
  });

  const invalidateTopicToVote = () => {
    utils.quiz.getTopicToVote.invalidate();
  };

  // STATE
  const [currentTopicId, setCurrentTopicId] = useState<string | undefined>(
    undefined
  );
  const [postTopicInput, setPostTopicInput] = useState("");

  const { data: topAnswers, isLoading } =
    trpc.quiz.getCurrentAnswers.useQuery(currentTopicId);

  // DERIVED
  const currentTopic = pastTopics?.find((t) => t.id === currentTopicId);

  // VOTE
  const handleVote = async (type: "increment" | "decrement") => {
    if (!topicToVote) return;
    await voteForTopic({
      topicId: topicToVote.id,
      type,
    });
  };

  // POST TOPIC
  const handlePostTopic: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    await postTopic(postTopicInput);
    setPostTopicInput("");
  };

  return (
    <>
      <Head>
        <title>Sujets | Le top 3 du mardi</title>
      </Head>
      {/* Topic list */}
      <LayoutTitle>
        {!pastTopics?.length ? (
          <div className="col-span-full row-span-full grid place-items-center">
            Il n&apos;y a pas encore d&apos;historique.
          </div>
        ) : (
          <div className="space-y-4 lg:row-span-2 lg:grid lg:grid-rows-6 lg:gap-4 lg:space-y-0">
            <div className="border-b-4 border-zinc-900 lg:grid lg:grid-cols-1 2xl:row-span-2 2xl:grid-cols-3">
              {/* Title */}
              <h2 className="col-span-2 flex flex-col text-2xl">
                <span>Top 3</span>
                <span className="break-words font-clash text-5xl font-bold lg:text-4xl 2xl:text-6xl">
                  {currentTopic?.name}
                </span>
              </h2>

              {/* Stats */}
              <div className="space-y-4">
                <p>
                  Voté le <br />
                  <span className="font-clash text-2xl font-semibold 2xl:text-2xl">
                    {currentTopic?.votedAt?.toLocaleDateString("fr-FR", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </p>
                <p>
                  Nombre de votes <br />
                  <span className="font-clash text-4xl font-semibold">
                    {currentTopic?._count.answers}
                  </span>
                </p>
              </div>
            </div>

            <div className="lg:row-span-3 lg:grid lg:grid-cols-2">
              {/* Top 1 to 3 */}
              <div className="grid gap-4 2xl:grid-cols-2">
                {/* Top 1 */}
                <div className="row-span-2 flex flex-col rounded-md bg-emerald-600 p-4 text-zinc-50">
                  <span className="font-clash text-7xl font-bold">1. </span>
                  <span className="break-words font-clash text-3xl font-semibold">
                    {topAnswers?.[0]?.name}
                  </span>
                  <span className="text-xl">
                    {topAnswers?.[0]?._sum.score} points
                  </span>
                </div>

                {/* Top 2 & 3 */}
                <div className="mb-4 grid grid-rows-2 2xl:mb-0 2xl:p-2">
                  {topAnswers?.slice(1, 3).map((answer, index) => (
                    <div className="row-span-2 flex flex-col" key={answer.name}>
                      <span className="font-clash text-3xl font-semibold">
                        <span className="break-words font-bold">
                          {index + 2}.
                        </span>{" "}
                        {answer.name}
                      </span>
                      <span className="text-lg">
                        {answer._sum.score} points
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              {/* Top 4 to 12 */}
              <div className="grid-flow grid grid-cols-2 gap-4 2xl:grid-flow-col 2xl:grid-rows-3 2xl:gap-0">
                {topAnswers?.slice(3, 12).map((answer, index) => (
                  <div key={answer.name}>
                    <p className="font-clash text-lg font-semibold">
                      {index + 4}. {answer.name}
                    </p>{" "}
                    <p className="break-words">
                      {answer._sum.score} point
                      {answer._sum.score && answer._sum.score > 1 ? "s" : ""}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4 2xl:grid-cols-4">
              {pastTopics?.map((topic) => (
                <button
                  key={topic.id}
                  onClick={() => setCurrentTopicId(topic.id)}
                  className={classNames(
                    "grid place-items-center rounded-md border-4 font-clash text-xl font-bold transition-all hover:border-zinc-900 hover:text-zinc-900",
                    {
                      "border-zinc-900 text-zinc-900":
                        topic.id === currentTopicId,
                      "border-zinc-900/30 text-zinc-900/30":
                        topic.id !== currentTopicId,
                    }
                  )}
                >
                  {topic.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </LayoutTitle>

      {/* Menu */}
      <LayoutMenu />

      {/* Topic scores */}
      <LayoutPrev>
        {!sessionData ? (
          <div className="col-span-2 grid place-items-center rounded-md bg-zinc-100 p-8 text-center text-zinc-900">
            <div>
              <h3 className="text-2xl">
                Vous devez{" "}
                <Link className="font-normal text-emerald-600" href="/me">
                  être connecté
                </Link>{" "}
                pour voter pour les prochains sujets.
              </h3>
            </div>
          </div>
        ) : topicToVote ? (
          <div className="col-span-2 grid grid-rows-2 gap-4 rounded-md bg-zinc-100 p-8 text-zinc-900 2xl:grid-cols-2 2xl:grid-rows-1">
            <div className="flex flex-col justify-between p-2">
              <h3 className="text-2xl">
                Votez pour le prochain sujet du mardi !
              </h3>
              <div>
                <p className="text-sm">Top 3...</p>
                <p className="font-clash text-4xl font-bold">
                  {topicToVote.name}&nbsp;?
                </p>
              </div>
            </div>

            {/* Increment / Decrement */}
            <div className="grid grid-rows-2 gap-4">
              <Button
                variant="secondary"
                onClick={() => handleVote("increment")}
              >
                {/* <ChevronUp size={60} className="m-auto" /> */}+ 1
              </Button>
              <Button
                variant="secondary"
                onClick={() => handleVote("decrement")}
              >
                {/* <ChevronDown size={60} className="m-auto" /> */}- 1
              </Button>
            </div>
          </div>
        ) : (
          <div className="col-span-2 grid place-items-center rounded-md bg-zinc-100 p-8 text-center text-zinc-900">
            <div>
              <h3 className="text-2xl">Vous avez voté pour tous les sujets.</h3>
              <p>Proposez-en vous-même puisque vous êtes si malins</p>
            </div>
          </div>
        )}
      </LayoutPrev>

      {/* About default image */}
      <LayoutAbout />

      {/* Selected topic with aggregated stats */}
      <LayoutCTA>
        <form
          className="grid gap-4 2xl:col-span-2 2xl:grid-cols-2 2xl:gap-8"
          onSubmit={handlePostTopic}
        >
          <div className="flex flex-col justify-between p-0">
            <div>
              <h4 className="text-3xl">Proposez votre sujet du mardi&nbsp;!</h4>
              <p>
                Vous avez une idée de sujet pour le mardi ? Proposez-le ici.
                S&apos;il rassemble assez de votes, il sera sélectionné pour le
                prochain mardi.
              </p>
            </div>
            {sessionData ? (
              <input
                type="text"
                className="w-full border-b-4 border-zinc-900 bg-transparent px-2 py-2 tracking-wider text-zinc-900 outline-none focus:ring-0"
                placeholder="Une idée de sujet (40 caractères max.)"
                maxLength={40}
                value={postTopicInput}
                onChange={(e) => setPostTopicInput(e.target.value)}
              />
            ) : (
              <p className="text-sm">
                <Link href="/me" className="font-normal text-emerald-600">
                  Connectez-vous
                </Link>{" "}
                pour proposer un sujet.
              </p>
            )}
          </div>
          {sessionData && (
            <Button type="submit" variant="secondary" disabled={!!sessionData}>
              Proposer
            </Button>
          )}
        </form>
      </LayoutCTA>
    </>
  );
};

export default Topics;
