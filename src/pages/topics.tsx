import { ArrowDownRight, ChevronDown, ChevronUp } from "lucide-react";
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
  const { data: pastTopics, isLoading: pastTopicsIsLoading } =
    trpc.quiz.getPastTopics.useQuery();

  const {
    data: topicToVote,
    isLoading: topicToVoteIsLoading,
    refetch,
  } = trpc.quiz.getTopicToVote.useQuery();

  const mutateVoteTopic = trpc.quiz.postTopicVote.useMutation();

  const handleVote = (type: "increment" | "decrement") => {
    if (!topicToVote) return;
    mutateVoteTopic.mutateAsync({
      topicId: topicToVote.id,
      type,
    });

    // Refetch topicstoVote
    return refetch();
  };

  // refetch topicsToVote

  return (
    <>
      {/* Topic list */}
      <LayoutTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 2xl:grid-cols-2">
          {pastTopics?.map((topic) => (
            <div key={topic.id}>{topic.name}</div>
          ))}
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
          <div className="col-span-2 grid place-items-center rounded-md bg-zinc-100 text-zinc-900">
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
