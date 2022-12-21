import classNames from "classnames";
import Head from "next/head";
import React, { useEffect } from "react";
import { weekday } from "../../utils";

export const FullscreenLoader = () => {
  const [isClosing, setIsClosing] = React.useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsClosing(true);
    }, 2300);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      className={classNames(
        "2xl:text-9xl} grid h-screen w-screen place-items-center bg-emerald-600 p-4 font-clash text-6xl font-bold text-zinc-50 lg:text-8xl",
        {
          "animate-fade-out": isClosing,
        }
      )}
    >
      <Head>
        <meta
          name="description"
          content="Tous les jours, un top 3 de n'importe quoi."
        />
        <meta
          name="og:description"
          content="Tous les jours, un top 3 de n'importe quoi."
        />
        <meta
          property="og:image"
          content={`https://top3dumardi.vercel.app/api/og`}
        />
      </Head>
      <h2 className="animate-fade-in">
        Le top 3 du{" "}
        <span className="animate-fade-in-delay opacity-0">{weekday}.</span>
      </h2>
    </div>
  );
};
