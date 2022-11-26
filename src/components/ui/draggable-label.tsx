import classNames from "classnames";

type DraggableLabelProps = {
  answer: string;
  type: "answer" | "search";
};

const DraggableLabel = ({ answer, type }: DraggableLabelProps) => {
  return (
    <div
      key={answer}
      className={classNames({
        "h-full w-full cursor-move rounded-md border-2 border-dashed border-zinc-900 p-2 font-semibold 2xl:p-6 2xl:text-2xl":
          type === "answer",
        "2xl:text-md flex h-14 cursor-move items-center overflow-hidden text-ellipsis rounded-md border-2 border-dashed border-zinc-900 p-2 leading-tight":
          type === "search",
      })}
      draggable="true"
      id={answer}
      onDragStart={(e) => e.dataTransfer.setData("text/plain", answer)}
    >
      {answer}
    </div>
  );
};

export default DraggableLabel;
