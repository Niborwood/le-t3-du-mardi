import Head from "next/head";

const GlobalLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-zinc-900 font-archivo font-extralight text-zinc-50">
      <Head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=archivo@1&f[]=clash-display@1&display=swap"
          rel="stylesheet"
        />
      </Head>
      <main className="grid grid-rows-1 gap-4 p-2 sm:min-h-screen lg:max-h-screen lg:grid-cols-3 lg:grid-rows-3 lg:p-4 2xl:grid-rows-3">
        {children}
      </main>
    </div>
  );
};

export default GlobalLayout;
