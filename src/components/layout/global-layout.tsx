import Head from "next/head";

const GlobalLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen animate-fade-in bg-zinc-900 bg-gradient-to-tr from-zinc-900 to-zinc-800/70 font-archivo font-extralight text-zinc-50">
      <Head>
        <meta
          name="description"
          content="Tous les jours, un top 3 de n'importe quoi."
        />
        <meta
          property="og:image"
          content={`https://top3dumardi.vercel.app/api/og`}
        />
      </Head>
      <main className="mt-10 grid grid-rows-1 gap-4 p-2 sm:min-h-screen lg:mt-0 lg:max-h-screen lg:grid-cols-3 lg:grid-rows-3 lg:p-4 2xl:grid-rows-3">
        {children}
      </main>
    </div>
  );
};

export default GlobalLayout;
