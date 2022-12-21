import classNames from "classnames";
import { useSession } from "next-auth/react";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { weekday } from "../../utils";

type FullscreenLoaderProps = {
  children: React.ReactNode;
  loaders?: boolean[];
};

export const FullscreenLoader = ({
  children,
  loaders,
}: FullscreenLoaderProps) => {
  const { status } = useSession();
  const [isClosing, setIsClosing] = React.useState(false);
  const [secondLoaded, setSecondLoaded] = useState(false);

  const hasEveryLoaderFinished =
    loaders?.every((loader) => loader === false) &&
    status !== "loading" &&
    secondLoaded;

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsClosing(true);
    }, 2300);

    return () => {
      clearTimeout(timeout);
      setIsClosing(false);
    };
  }, []);

  // If session is loading, show loading screen for at least 1 second
  useEffect(() => {
    const timeout = setTimeout(() => {
      setSecondLoaded(true);
    }, 500);

    return () => clearTimeout(timeout);
  }, []);

  if (!hasEveryLoaderFinished) {
    return (
      <div
        className={classNames(
          "fixed inset-0 grid h-screen w-screen place-items-center bg-emerald-600 p-4 font-clash text-6xl font-bold text-zinc-50 lg:text-8xl 2xl:text-9xl",
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
  }

  return <>{children}</>;
};
