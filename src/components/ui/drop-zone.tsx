import classNames from "classnames";
import { useState } from "react";
import type { Dispatch, SetStateAction } from "react";

type DropZoneProps = {
  index: number;
  item: string;
  updateTop: Dispatch<SetStateAction<[string, string, string]>>;
};

const DropZone = ({ index, item, updateTop }: DropZoneProps) => {
  const [isActive, setIsActive] = useState(false);
  const [hasAnswer, setHasAnswer] = useState(false);

  const toggleActive = (e: DragEvent) => {
    e.preventDefault();
    setIsActive((prev) => !prev);
  };

  const onDrop = (event: DragEvent) => {
    const eventAnswer = event.dataTransfer?.getData("text/plain");

    if (!eventAnswer) return;
    const target = event.target;
    if (!target) return;

    const index = +target.id.split("-")[1];

    setIsActive(false);
    setHasAnswer(true);
    updateTop((prev) => {
      const newTop = [...prev];
      newTop[index] = eventAnswer;
      return newTop as [string, string, string];
    });
  };

  return (
    <div
      className={classNames(
        "grid place-content-center rounded-lg border-2 border-dashed border-zinc-900 text-3xl font-extralight text-zinc-900 transition-all duration-500",
        {
          "!border-0 bg-emerald-600 !text-zinc-50": isActive || hasAnswer,
          "bg-emerald-600/60": isActive,
        }
      )}
      key={index}
      id={`top-${index}`}
      onDragEnter={toggleActive}
      onDragLeave={toggleActive}
      onDragOver={(e) => e.preventDefault()}
      onDrop={onDrop}
    >
      {hasAnswer ? (
        <span className="text-lg">
          TOP {index + 1}
          <br />
          {item}
        </span>
      ) : (
        <span>TOP {index + 1}</span>
      )}
    </div>
  );
};

export default DropZone;
