import classNames from "classnames";
import { useState } from "react";

type DropZoneProps = {
  index: number;
  item: any;
};

const DropZone = ({ index, item }: DropZoneProps) => {
  const [isActive, setIsActive] = useState(false);
  const [hasAnswer, setHasAnswer] = useState(false);
  const [answer, setAnswer] = useState("");

  const toggleActive = (e: any) => {
    e.preventDefault();
    setIsActive((prev) => !prev);
  };

  const onDrop = (event: DragEvent) => {
    const eventAnswer = event.dataTransfer?.getData("text/plain");

    if (!eventAnswer) return;
    const target = event.target as HTMLElement;

    const index = +target.id.split("-")[1];

    setIsActive(false);
    setHasAnswer(true);
    setAnswer(eventAnswer);
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
      onDrop={(e: DragEvent) => onDrop(e)}
    >
      {hasAnswer ? (
        <span className="text-lg">
          TOP {index + 1}
          <br />
          {item.answer}
        </span>
      ) : (
        <span>TOP {index + 1}</span>
      )}
    </div>
  );
};

export default DropZone;
