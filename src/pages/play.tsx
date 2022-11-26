import type { FormEvent } from "react";
import { useState, useMemo } from "react";
import { trpc } from "../utils/trpc";
import { useAutoAnimate } from "@formkit/auto-animate/react";

// COMPONENTS
import type { NextPage } from "next";
import {
  LayoutMenu,
  LayoutTitle,
  LayoutPrev,
  LayoutAbout,
  LayoutCTA,
} from "../components/layout";
import { Button, DropZone, DraggableLabel } from "../components/ui";

const Play: NextPage = () => {
  // AUTOANIMATE

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
  const [parent] = useAutoAnimate(/* optional config */);

  // COMPUTED
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

  return (
    <>
      {/* ANSWERS */}
      <LayoutTitle>
        <section className="grid gap-8 p-2 2xl:col-span-2 2xl:grid-cols-2 2xl:gap-16 2xl:p-8">
          {/* New answers from the player */}
          <div>
            <h3 className="border-zinc-900 pb-2 text-xl 2xl:border-b-2 2xl:text-3xl">
              Proposez une réponse :
            </h3>

            <form
              onSubmit={onSubmitAnswer}
              className="mt-4 flex w-full flex-col justify-between gap-8 lg:flex-row"
            >
              <input
                className="w-full border-b-4 border-zinc-800 bg-transparent p-4 tracking-wider outline-none focus:ring-0"
                type="text"
                placeholder="Votre réponse"
                name="answer"
                value={inputAnswer}
                onChange={(e) => setInputAnswer(e.target.value)}
              />
              <button
                className="rounded-md bg-emerald-600 p-4 font-bold text-zinc-50"
                type="submit"
              >
                Enregistrer
              </button>
            </form>

            <div
              className="mt-8 grid gap-2 lg:grid-cols-3 lg:place-items-center 2xl:mt-16 2xl:grid-cols-1 2xl:place-items-start"
              ref={parent}
            >
              {answers.map((answer) => (
                <DraggableLabel key={answer} answer={answer} type="answer" />
              ))}
            </div>
          </div>

          {/* Pre-existing answers */}
          <div>
            <h3 className="border-zinc-900 pb-2 text-xl 2xl:border-b-2 2xl:text-3xl">
              Ou choisissez-en une déjà donnée :
            </h3>

            {/* Search Form */}
            <input
              className="w-full border-b-4 border-zinc-800 bg-transparent p-4 tracking-wider outline-none focus:ring-0"
              type="text"
              placeholder="Terme à rechercher"
              name="answer"
              value={inputSearch}
              onChange={(e) => setInputSearch(e.target.value)}
            />

            {/* Answers List */}
            <div
              className="mt-8 grid gap-2 lg:grid-cols-2 2xl:mt-16"
              ref={parent}
            >
              {!currentAnswersIsLoading &&
                filteredResults.map((answer) => (
                  <DraggableLabel
                    key={answer.name}
                    answer={answer.name}
                    type="search"
                  />
                ))}
            </div>
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
            <span className="text-7xl font-bold text-zinc-50">
              {!currentTopicIsLoading && currentTopic?.name}
            </span>
          </h2>
        </section>
      </LayoutPrev>

      {/* VALIDATE BUTTON */}
      <LayoutAbout>
        <div className="grid h-full w-full place-items-center">
          <Button disabled={!isAbleToSubmit} onClick={postAnswers}>
            Valider
          </Button>
        </div>
      </LayoutAbout>

      {/* DROP ZONES */}
      <LayoutCTA>
        <section className="grid gap-8 rounded-md lg:col-span-2 lg:grid-cols-3">
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
