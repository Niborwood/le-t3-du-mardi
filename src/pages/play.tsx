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
import Head from "next/head";
import { ChevronsUpDown } from "lucide-react";
import Tooltip from "@mui/material/Tooltip";

const Play: NextPage = () => {
  // AUTOANIMATE
  const [parent] = useAutoAnimate<HTMLDivElement>();

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

  const answersMutation = trpc.quiz.postAnswers.useMutation({
    onSuccess: () => {
      utils.quiz.hasUserAlreadyVoted.invalidate();
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
  if (typeof window !== "undefined" && !sessionData) {
    router.replace("/me");
  }

  return (
    <>
      <Head>
        <title>Jouer | Le Top 3 du Mardi</title>
      </Head>
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
          <h2 ref={parent}>
            <span className="font-archivo font-extralight">TOP 3 </span>
            <br />
            <span
              className="text-4xl font-bold text-zinc-50 2xl:text-7xl "
              ref={parent}
            >
              {!currentTopicIsLoading && currentTopic?.name}
            </span>
          </h2>
        </section>
      </LayoutPrev>

      {/* VALIDATE BUTTON */}
      <LayoutAbout />

      {/* DROP ZONES */}
      <LayoutCTA>
        <div className="grid place-items-start text-sm">
          <p>
            Un petit conseil : en tapant votre réponse, vous avez accès à celles
            de tout le monde. Si vous voulez donner du poids à une réponse qui
            vous semble universelle, essayez de la chercher avant de
            l&apos;ajouter - les{" "}
            <strong>différences orthographiques sont prises en compte</strong>.
          </p>
          <p>
            Cliquez sur l&apos;icône{" "}
            <ChevronsUpDown size={20} className="inline" /> pour voir les
            réponses déjà données. Pour valider une réponse que vous inventez,
            cliquez sur &quot;ajouter la réponse...&quot; ou appuyez sur Entrée.
          </p>
        </div>
        <div>
          <Button
            className="h-full w-full"
            disabled={!isAbleToSubmit && !userVotes?.length}
            onClick={postAnswers}
            href={userVotes?.length ? "/topics" : undefined}
          >
            {userVotes?.length ? "Voir les résultats" : "Voter"}
          </Button>
        </div>
      </LayoutCTA>
    </>
  );
};

export default Play;
