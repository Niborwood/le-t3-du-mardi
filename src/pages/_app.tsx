import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { trpc } from "../utils/trpc";
import "../styles/globals.css";

import GlobalLayout from "../components/layout/global-layout";
import { weekday } from "../utils";
import Head from "next/head";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Head>
        <title>Le top 3 du {weekday}</title>
        <meta
          name="og:description"
          content="Tous les jours, un top 3 de n'importe quoi."
        />

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
        <meta
          property="og:image"
          content={`https://top3dumardi.vercel.app/api/og`}
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@yourwebsite" />
        <meta name="twitter:creator" content="@yourtwitterhandle" />
        <meta
          name="twitter:title"
          content={`Le top 3 du ${weekday || "..."}`}
        />
        <meta
          name="twitter:description"
          content="Tous les jours, un top 3 de n'importe quoi."
        />
        <meta
          name="twitter:image"
          content="https://top3dumardi.vercel.app/api/og"
        />
      </Head>
      <GlobalLayout>
        <Component {...pageProps} />
      </GlobalLayout>
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);
