import { useSession } from "next-auth/react";
import Head from "next/head";
import { useEffect, useState } from "react";
import { trpc } from "../../utils/trpc";
import { FullscreenLoader } from "../ui";

const GlobalLayout = ({ children }: { children: React.ReactNode }) => {
  const { status } = useSession();
  const [secondLoaded, setSecondLoaded] = useState(false);

  const { data: currentTopic } = trpc.quiz.getCurrentTopic.useQuery();

  // If session is loading, show loading screen for at least 1 second
  useEffect(() => {
    const timeout = setTimeout(() => {
      setSecondLoaded(true);
    }, 1500);

    return () => clearTimeout(timeout);
  }, []);

  if (status === "loading" || !secondLoaded) {
    return <FullscreenLoader />;
  }

  return (
    <div className="min-h-screen bg-zinc-900 font-archivo font-extralight text-zinc-50">
      <Head>
        <meta
          name="description"
          content="Tous les jours, un top 3 de n'importe quoi."
        />
        <meta
          property="og:image"
          content={`https://top3dumardi.vercel.app/api/og?top=n%27importe%20quoi}`}
        />
      </Head>
      <main className="mt-10 grid grid-rows-1 gap-4 p-2 sm:min-h-screen lg:mt-0 lg:max-h-screen lg:grid-cols-3 lg:grid-rows-3 lg:p-4 2xl:grid-rows-3">
        {children}
      </main>
    </div>
  );
};

export default GlobalLayout;
