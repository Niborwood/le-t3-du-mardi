import classNames from "classnames";
import { useState } from "react";
import type { Dispatch, SetStateAction, DragEventHandler } from "react";

type DropZoneProps = {
  index: number;
  item: string;
  updateTop: Dispatch<SetStateAction<[string, string, string]>>;
};

const DropZone = ({ index, item, updateTop }: DropZoneProps) => {
  const [isActive, setIsActive] = useState(false);
  const [hasAnswer, setHasAnswer] = useState(false);

  const toggleActive: DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsActive((prev) => !prev);
  };

  const onDrop: DragEventHandler<HTMLDivElement> = (event) => {
    const eventAnswer = event.dataTransfer?.getData("text/plain");

    if (!eventAnswer) return;
    const target = event.target;
    if (!target) return;

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const index = +target.id.split("-")[1];
    console.log(index);

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
          "!border-transparent bg-emerald-600 !text-zinc-50":
            isActive || hasAnswer,
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
        <span id={`top-${index}`} className="text-lg">
          TOP {index + 1}
          <br />
          {item}
        </span>
      ) : (
        <span id={`top-${index}`}>TOP {index + 1}</span>
      )}
    </div>
  );
};

export default DropZone;
