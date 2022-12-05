import { useState, useMemo } from "react";
import { trpc } from "../utils/trpc";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

// COMPONENTS
import type { NextPage } from "next";
import {
  LayoutMenu,
  LayoutTitle,
  LayoutPrev,
  LayoutAbout,
  LayoutCTA,
} from "../components/layout";
import { Button, TopVotingBlock } from "../components/ui";

const Play: NextPage = () => {
  // AUTOANIMATE
  const [parent] = useAutoAnimate<HTMLDivElement>(/* optional config */);

  const utils = trpc.useContext();

  // NEXT-AUTH
  const { data: sessionData } = useSession();
  const router = useRouter();

  // TRPC DATA
  const { data: currentTopic, isLoading: currentTopicIsLoading } =
    trpc.quiz.getCurrentTopic.useQuery();
  const { data: currentAnswers, isLoading: currentAnswersIsLoading } =
    trpc.quiz.getCurrentAnswers.useQuery(currentTopic?.id);
  const { data: userVotes, isLoading: userVotesIsLoading } =
    trpc.quiz.hasUserAlreadyVoted.useQuery();

  console.log("🚀 ~ file: play.tsx:34 ~ userVotes", userVotes);

  const answersMutation = trpc.quiz.postAnswers.useMutation({
    onSuccess: () => {
      utils.quiz.getCurrentAnswers.invalidate();
    },
  });

  // STATE
  const [topList, setTopList] = useState<[string, string, string]>([
    "",
    "",
    "",
  ]);

  // DERIVED
  const isAbleToSubmit = useMemo(
    () => topList.every((item) => !!item),
    [topList]
  );

  const updateList = (index: 1 | 2 | 3, value: string) => {
    const newList = [...topList];
    newList[index - 1] = value;
    setTopList(newList as [string, string, string]);
  };

  const postAnswers = async () => {
    if (!isAbleToSubmit || !currentTopic) {
      return;
    }

    answersMutation.mutateAsync({
      topicId: currentTopic.id,
      answers: topList,
    });

    setTopList(["", "", ""]);
  };

  // REROUTE IF NOT LOGGED IN
  if (!sessionData && typeof window !== "undefined") {
    router.replace("/me");
  }

  return (
    <>
      {/* ANSWERS */}
      <LayoutTitle>
        <section className="grid-rows row-span-2 grid gap-4 2xl:gap-8">
          <TopVotingBlock
            variant="one"
            index={1}
            value={topList[0]}
            setValue={updateList}
            currentAnswers={currentAnswers?.map((a) => a.name)}
            userVote={userVotes?.[0]?.name}
          />
          <div className="grid gap-4 2xl:grid-cols-2 2xl:gap-8">
            <TopVotingBlock
              variant="two-three"
              index={2}
              value={topList[1]}
              setValue={updateList}
              currentAnswers={currentAnswers?.map((a) => a.name)}
              userVote={userVotes?.[1]?.name}
            />
            <TopVotingBlock
              variant="two-three"
              index={3}
              value={topList[2]}
              setValue={updateList}
              currentAnswers={currentAnswers?.map((a) => a.name)}
              userVote={userVotes?.[2]?.name}
            />
          </div>
        </section>
      </LayoutTitle>
      <LayoutMenu />

      {/* TOP TITLE */}
      <LayoutPrev>
        <section className="col-span-2 grid items-center rounded-md bg-emerald-600 p-8 font-clash text-3xl font-semibold text-zinc-50/90">
          <h2>
            <span className="font-archivo font-extralight">TOP 3 </span>
            <br />
            <span className="text-7xl font-bold text-zinc-50" ref={parent}>
              {!currentTopicIsLoading && currentTopic?.name}
            </span>
          </h2>
        </section>
      </LayoutPrev>

      {/* VALIDATE BUTTON */}
      <LayoutAbout />

      {/* DROP ZONES */}
      <LayoutCTA>
        <div>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Porro eos
          ducimus deserunt adipisci pariatur debitis similique! Vel assumenda
          labore deserunt illo nobis aperiam iusto sit odit doloremque modi, est
          natus quibusdam! Assumenda molestiae corrupti error fuga accusamus.
          Cupiditate nihil blanditiis, vel ratione dicta aspernatur recusandae.
          Nemo est exercitationem sit minima. Nisi voluptate fuga ut dignissimos
          eligendi perspiciatis dolore harum impedit.
        </div>
        <div>
          <Button
            className="h-full w-full"
            disabled={!isAbleToSubmit}
            onClick={postAnswers}
          >
            {userVotes?.length ? "Vous avez déjà voté !" : "Voter"}
          </Button>
        </div>
      </LayoutCTA>
    </>
  );
};

export default Play;
