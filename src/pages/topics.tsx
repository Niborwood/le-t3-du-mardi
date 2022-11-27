import type { NextPage } from "next";
import {
  LayoutAbout,
  LayoutCTA,
  LayoutMenu,
  LayoutPrev,
  LayoutTitle,
} from "../components/layout";
import { trpc } from "../utils/trpc";

const Topics: NextPage = () => {
  const { data: pastTopics, isLoading: pastTopicsIsLoading } =
    trpc.quiz.getPastTopics.useQuery();

  return (
    <>
      {/* Topic list */}
      <LayoutTitle>
        <div className="grid grid-rows-4"></div>
      </LayoutTitle>

      {/* Menu */}
      <LayoutMenu />

      {/* Topic scores */}
      <LayoutPrev>
        <div className="col-span-2 rounded-md bg-zinc-50">Hello</div>
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
