import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

const About: NextPage = () => {
  return (
    <div className="font-mono text-xs">
      <Head>
        <title>A Propos | Le top 3 du mardi</title>
      </Head>
      <p>&gt;&gt;&gt; Finite Inc</p>
      <p>
        <a
          href="https://github.com/Niborwood"
          target="_blank"
          rel="noreferrer"
          className="underline"
        >
          @RobinSouriau
        </a>
      </p>
      <br />
      <br />
      <p>
        <Link href="/">&lt;</Link>
      </p>
    </div>
  );
};

export default About;
