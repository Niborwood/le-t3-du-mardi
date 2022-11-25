import { useState, useMemo } from "react";
import { trpc } from "../utils/trpc";

// COMPONENTS
import type { NextPage } from "next";
import {
  LayoutMenu,
  LayoutTitle,
  LayoutPrev,
  LayoutAbout,
  LayoutCTA,
} from "../components/layout";
import { Button, DropZone } from "../components/ui";

const Play: NextPage = () => {
  // TRPC DATA
  const currentTopic = trpc.quiz.getCurrentTopic.useQuery();
  const answersMutation = trpc.quiz.postAnswers.useMutation();

  const [topList, setTopList] = useState<[string, string, string]>([
    "Premier",
    "Deuxième",
    "Troisième",
  ]);

  const isAbleToSubmit = useMemo(
    () => topList.every((item) => !!item),
    [topList]
  );

  const postAnswers = () => {
    if (!isAbleToSubmit || !currentTopic.data) {
      return;
    }

    answersMutation.mutateAsync({
      topicId: currentTopic.data?.id,
      answers: topList,
    });

    setTopList(["", "", ""]);
  };

  return (
    <>
      <LayoutTitle>
        <div>Play</div>
      </LayoutTitle>
      <LayoutMenu />
      <LayoutPrev>
        <div>Play</div>
      </LayoutPrev>
      <LayoutAbout>
        <div className="grid h-full w-full place-items-center">
          <Button disabled={!isAbleToSubmit} onClick={postAnswers}>
            Valider
          </Button>
        </div>
      </LayoutAbout>

      {/* 3 tops zones */}
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
