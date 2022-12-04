import classNames from "classnames";

type TopVotingBlockProps = {
  variant: "one" | "two-three";
  // index: number;
};

export const TopVotingBlock = ({ variant }: TopVotingBlockProps) => {
  return (
    <div
      className={classNames("rounded-md border-4", {
        "border-emerald-600 bg-emerald-600": variant === "one",
      })}
    >
      TopVotingBlock
    </div>
  );
};
