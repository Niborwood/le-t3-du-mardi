import classNames from "classnames";
import type { NextPage } from "next";
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
  // TRPC
  const { data: pastTopics, isLoading: pastTopicsIsLoading } =
    trpc.quiz.getPastTopics.useQuery();

  const {
    data: topicToVote,
    isLoading: topicToVoteIsLoading,
    refetch,
  } = trpc.quiz.getTopicToVote.useQuery();

  const mutateVoteTopic = trpc.quiz.postTopicVote.useMutation();

  // STATE
  const [currentTopicId, setCurrentTopicId] = useState<string | undefined>(
    pastTopics?.[0]?.id
  );

  const { data: topAnswers, isLoading } =
    trpc.quiz.getCurrentAnswers.useQuery(currentTopicId);

  // DERIVED
  const currentTopic = pastTopics?.find((t) => t.id === currentTopicId);

  // VOTE
  const handleVote = (type: "increment" | "decrement") => {
    if (!topicToVote) return;
    mutateVoteTopic.mutateAsync({
      topicId: topicToVote.id,
      type,
    });

    // Refetch topicstoVote
    return refetch();
  };

  return (
    <>
      {/* Topic list */}
      <LayoutTitle>
        <div className="row-span-2 grid grid-rows-3 gap-4">
          <div className="grid grid-cols-1 border-b-4 border-zinc-900 md:grid-cols-2 lg:grid-cols-1 2xl:grid-cols-2">
            {/* Title */}
            <h2 className="flex flex-col text-2xl">
              <span>Top 3</span>
              <span className="font-clash text-5xl font-bold 2xl:text-7xl">
                {currentTopic?.name}
              </span>
            </h2>

            {/* Stats */}
            <div className="space-y-4">
              <p>
                Voté le <br />
                <span className="font-clash text-2xl font-semibold 2xl:text-4xl">
                  {currentTopic?.votedAt.toLocaleDateString("fr-FR", {
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

          <div className="grid grid-cols-2">
            {/* Top 1 to 3 */}
            <div className="grid grid-cols-2 gap-4">
              {/* Top 1 */}
              <div className="row-span-2 flex flex-col rounded-md bg-emerald-600 p-4 text-zinc-50">
                <span className="font-clash text-7xl font-bold">1. </span>
                <span className="font-clash text-3xl font-semibold">
                  {topAnswers?.[0]?.name}
                </span>
                <span>{topAnswers?.[0]?._sum.score} votes</span>
              </div>

              {/* Top 2 & 3 */}
              <div className="grid grid-rows-2 p-2">
                <div className="row-span-2 flex flex-col">
                  <span className="font-clash text-4xl font-semibold">
                    <span className="font-bold">2.</span>{" "}
                    {topAnswers?.[1]?.name}
                  </span>
                  <span>{topAnswers?.[1]?._sum.score} votes</span>
                </div>

                <div className="row-span-2 flex flex-col">
                  <span className="font-clash text-4xl font-semibold">
                    <span className="font-bold">3.</span>{" "}
                    {topAnswers?.[2]?.name}
                  </span>
                  <span>{topAnswers?.[2]?._sum.score} votes</span>
                </div>
              </div>
            </div>
            {/* Top 3 to 10 */}
            <div>Hello 4 to 10</div>
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
      </LayoutTitle>

      {/* Menu */}
      <LayoutMenu />

      {/* Topic scores */}
      <LayoutPrev>
        {topicToVote ? (
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
          <div className="col-span-2 grid place-items-center rounded-md bg-zinc-100 p-8 text-zinc-900">
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
        <div>Hello</div>
      </LayoutCTA>
    </>
  );
};

export default Topics;
