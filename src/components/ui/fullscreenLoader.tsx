import classNames from "classnames";
import Head from "next/head";
import { useEffect, useState } from "react";
import { weekday } from "../../utils";

export const FullscreenLoader = () => {
  const [isClosing, setIsClosing] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsClosing(true);
    }, 1800);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      className={classNames(
        "fixed inset-0 grid h-screen w-screen place-items-center bg-emerald-600 p-4 font-clash text-6xl font-bold text-zinc-50 lg:text-8xl 2xl:text-9xl",
        {
          "animate-fade-out": isClosing,
        }
      )}
    >
      <h1 className="animate-fade-in">
        Le top 3 du{" "}
        <span className="animate-fade-in-delay opacity-0">{weekday}.</span>
      </h1>
    </div>
  );
};
