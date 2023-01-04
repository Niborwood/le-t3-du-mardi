import { Combobox } from "@headlessui/react";
import classNames from "classnames";
import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";

type TopVotingBlockProps = {
  variant: "one" | "two-three";
  index: 1 | 2 | 3;
  value: string;
  setValue: (index: 1 | 2 | 3, value: string) => void;
  currentAnswers?: string[];
  userVote?: string;
};

export const TopVotingBlock = ({
  variant,
  index,
  value,
  setValue,
  currentAnswers,
  userVote,
}: TopVotingBlockProps) => {
  const [query, setQuery] = useState("");

  const filterdAnswers =
    query === ""
      ? currentAnswers
      : currentAnswers?.filter((answer) => {
          return answer.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <div
      className={classNames(
        "flex w-full flex-col items-center gap-2 rounded-md border-4 p-8 2xl:flex-row",
        {
          // Variant One
          "border-emerald-600 bg-emerald-600 py-12 text-zinc-50 2xl:py-8":
            variant === "one",
          // Variant Two-Three
          "border-zinc-900": variant === "two-three",
        }
      )}
    >
      <p
        className={classNames("font-clash text-7xl font-bold", {
          // Variant One
          "text-7xl lg:text-5xl 2xl:text-7xl": variant === "one",
          // Variant Two-Three
          "text-5xl lg:text-3xl 2xl:text-5xl": variant === "two-three",
        })}
      >
        {index}.
      </p>

      {/* COMBOBOX */}
      <div className="relative w-full">
        {userVote ? (
          <div
            className={classNames(
              "text-center font-clash font-bold 2xl:text-left",
              {
                // Variant One
                " text-3xl 2xl:text-7xl": variant === "one",
                // Variant Two-Three
                " text-xl 2xl:text-5xl": variant === "two-three",
              }
            )}
          >
            {userVote}
          </div>
        ) : (
          <Combobox value={value} onChange={(value) => setValue(index, value)}>
            <div className="">
              <div
                className={classNames(
                  "relative w-full cursor-default overflow-hidden border-b-4 bg-transparent text-left text-2xl focus:outline-none focus-visible:ring-0 focus-visible:ring-white focus-visible:ring-opacity-75",
                  {
                    // Variant One
                    "border-zinc-50 text-zinc-50": variant === "one",
                    // Variant Two-Three
                    "border-zinc-900 text-zinc-900": variant === "two-three",
                  }
                )}
              >
                <Combobox.Input
                  className={classNames(
                    "w-full border-none bg-transparent py-2 pl-3 pr-10 text-base leading-5 tracking-wider outline-none focus:ring-0 2xl:text-xl",
                    {
                      // Variant One
                      "border-b-4 border-zinc-50 text-zinc-50 placeholder:text-zinc-50/70":
                        variant === "one",
                      // Variant Two-Three
                      "text-zinc-900": variant === "two-three",
                    }
                  )}
                  onChange={(event) => setQuery(event.target.value)}
                  maxLength={30}
                  placeholder={`Top ${index}`}
                  autoComplete="off"
                />
                <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronsUpDown
                    className={classNames("h-5 w-5", {
                      // Variant One
                      "text-zinc-50": variant === "one",
                      // Variant Two-Three
                      "text-zinc-900": variant === "two-three",
                    })}
                    aria-hidden="true"
                  />
                </Combobox.Button>
              </div>

              <Combobox.Options className="absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-md bg-zinc-50 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {query.length > 0 && (
                  <Combobox.Option
                    className={({ active }) =>
                      `relative cursor-pointer select-none py-2 pr-4 text-zinc-900 ${
                        active ? "pl-10" : "pl-4"
                      }`
                    }
                    value={query}
                  >
                    Ajouter la réponse &quot;{query}&quot;
                  </Combobox.Option>
                )}
                {filterdAnswers?.map((answer) => (
                  <Combobox.Option
                    key={answer}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pr-4 ${
                        active
                          ? "bg-emerald-600 pl-10 text-slate-50"
                          : "pl-4 text-gray-900"
                      }`
                    }
                    value={answer}
                  >
                    {({ selected, active }) => (
                      <>
                        <span>{answer}</span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? "text-slate-50" : "text-emerald-600"
                            }`}
                          >
                            <Check className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))}
              </Combobox.Options>
            </div>
          </Combobox>
        )}
      </div>
    </div>
  );
};
