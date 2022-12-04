import { Combobox } from "@headlessui/react";
import classNames from "classnames";
import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";

type TopVotingBlockProps = {
  variant: "one" | "two-three";
  index: 1 | 2 | 3;
};

const people = [
  { id: 1, name: "Wade Cooper" },
  { id: 2, name: "Arlene Mccoy" },
  { id: 3, name: "Devon Webb" },
  { id: 4, name: "Tom Cook" },
];

export const TopVotingBlock = ({ variant, index }: TopVotingBlockProps) => {
  const [selectedPerson, setSelectedPerson] = useState<{
    id: number;
    name: string;
  }>();
  const [query, setQuery] = useState("");

  const filteredPeople =
    query === ""
      ? people
      : people.filter((person) => {
          return person.name.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <div
      className={classNames(
        "flex w-full items-center gap-2 rounded-md border-4 p-8",
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
          "text-7xl": variant === "one",
          // Variant Two-Three
          "text-5xl": variant === "two-three",
        })}
      >
        {index}.
      </p>

      {/* COMBOBOX */}
      <div className="relative w-full">
        <Combobox value={selectedPerson} onChange={setSelectedPerson}>
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
                  "w-full border-none bg-transparent py-2 pl-3 pr-10 text-xl leading-5 outline-none focus:ring-0",
                  {
                    // Variant One
                    "border-b-4 border-zinc-50 text-zinc-50": variant === "one",
                    // Variant Two-Three
                    "text-zinc-900": variant === "two-three",
                  }
                )}
                displayValue={(person: any) => person?.name || ""}
                onChange={(event) => setQuery(event.target.value)}
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
              {filteredPeople.length === 0 && query !== "" ? (
                <div className="relative cursor-default select-none py-2 px-4 text-zinc-700">
                  Nothing found.
                </div>
              ) : (
                filteredPeople.map((person) => (
                  <Combobox.Option
                    key={person.id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? "bg-emerald-600 text-white" : "text-gray-900"
                      }`
                    }
                    value={person}
                  >
                    {({ selected, active }) => (
                      <>
                        <span>{person.name}</span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? "text-white" : "text-emerald-600"
                            }`}
                          >
                            <Check className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </div>
        </Combobox>
      </div>
    </div>
  );
};
