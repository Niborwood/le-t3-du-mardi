import { ChevronDown, ChevronUp } from "lucide-react";
import type { NextPage } from "next";
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

  const { data: topicsToVote, isLoading: topicsToVoteIsLoading } =
    trpc.quiz.getTopicsToVote.useQuery();

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
        {topicsToVote?.length ? (
          <div className="col-span-2 grid grid-rows-2 gap-4 rounded-md bg-zinc-100 p-8 text-zinc-900 2xl:grid-cols-2 2xl:grid-rows-1">
            <div>
              <h3 className="text-2xl">Votez pour le prochain top 3 !</h3>
            </div>
            <div className="grid grid-rows-2 gap-4">
              <Button variant="secondary">
                {/* <ChevronUp size={60} className="m-auto" /> */}+ 1
              </Button>
              <Button variant="secondary">
                {/* <ChevronDown size={60} className="m-auto" /> */}- 1
              </Button>
            </div>
          </div>
        ) : (
          <div className="col-span-2 grid place-items-center rounded-md bg-zinc-100 text-zinc-900">
            <h3 className="text-2xl">Aucun sujet en attente de vote.</h3>
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
