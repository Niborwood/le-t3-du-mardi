import type { FormEvent } from "react";
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
import { Button, DropZone, TopVotingBlock } from "../components/ui";

const Play: NextPage = () => {
  // AUTOANIMATE
  const [parent] = useAutoAnimate<HTMLDivElement>(/* optional config */);

  // NEXT-AUTH
  const { data: sessionData } = useSession();
  const router = useRouter();

  // TRPC DATA
  const { data: currentTopic, isLoading: currentTopicIsLoading } =
    trpc.quiz.getCurrentTopic.useQuery();
  const { data: currentAnswers, isLoading: currentAnswersIsLoading } =
    trpc.quiz.getCurrentAnswers.useQuery(currentTopic?.id);
  const answersMutation = trpc.quiz.postAnswers.useMutation();

  // STATE
  const [topList, setTopList] = useState<[string, string, string]>([
    "",
    "",
    "",
  ]);
  const [answers, setAnswers] = useState<string[]>([]);
  const [inputAnswer, setInputAnswer] = useState<string>("");
  const [inputSearch, setInputSearch] = useState<string>("");

  // DERIVED
  const isAbleToSubmit = useMemo(
    () => topList.every((item) => !!item),
    [topList]
  );

  const filteredResults = useMemo(() => {
    if (!currentAnswers) return [];
    if (!inputSearch) return currentAnswers;

    return currentAnswers.filter((answer) =>
      answer.name.toLowerCase().includes(inputSearch.toLowerCase())
    );
  }, [currentAnswers, inputSearch]);

  // FORM
  const onSubmitAnswer = (event: FormEvent) => {
    event.preventDefault();

    // If nothing in answer or answer already in list, do nothing
    if (!inputAnswer || answers.includes(inputAnswer)) return;

    // If answerList is > 3, remove first item and replace with new answer
    if (answers.length >= 3) {
      setAnswers((prev) => [...prev.slice(1), inputAnswer]);
    } else {
      // Else just push new answer
      setAnswers([...answers, inputAnswer]);
    }

    // Clean the input
    setInputAnswer("");
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
          <TopVotingBlock variant="one" index={1} />
          <div className="grid gap-4 2xl:grid-cols-2 2xl:gap-8">
            <TopVotingBlock variant="two-three" index={2} />
            <TopVotingBlock variant="two-three" index={3} />
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
      <LayoutAbout logo={false}>
        <div className="grid h-full w-full place-items-center">
          <Button disabled={!isAbleToSubmit} onClick={postAnswers}>
            Valider
          </Button>
        </div>
      </LayoutAbout>

      {/* DROP ZONES */}
      <LayoutCTA>
        <section className="grid grid-cols-3 gap-8 rounded-md lg:grid-cols-1 2xl:col-span-2 2xl:grid-cols-3">
          {topList.map((top, index) => (
            <DropZone
              key={index}
              index={index}
              item={top}
              updateTop={setTopList}
            />
          ))}
        </section>
      </LayoutCTA>
    </>
  );
};

export default Play;
