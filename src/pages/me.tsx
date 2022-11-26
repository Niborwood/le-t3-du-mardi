import type { NextPage } from "next";

// COMPONENTS & LAYOUTS
import {
  LayoutAbout,
  LayoutCTA,
  LayoutMenu,
  LayoutPrev,
  LayoutTitle,
} from "../components/layout";
import { Button } from "../components/ui";
import Link from "next/link";

const Me: NextPage = () => {
  return (
    <>
      {/* Title */}
      <LayoutTitle>
        <h1 className="py-8 font-clash text-7xl font-extrabold uppercase lg:text-8xl 2xl:row-span-2 2xl:text-9xl">
          Le <span className="rotate-3 text-emerald-600">profil</span> du mardi
        </h1>
      </LayoutTitle>

      <LayoutMenu />

      <LayoutPrev />
      <LayoutAbout />

      <LayoutCTA>
        <div className="grid gap-4 lg:col-span-2 lg:grid-cols-2">
          {/* <Button variant="secondary">
            <Link href="/topics">
              <span className="underline underline-offset-4">Voter</span> pour
              un sujet
            </Link>
          </Button> */}

          <Button variant="primary" className="2xl:col-start-2">
            <Link href="/play">Me connecter</Link>
          </Button>
        </div>
      </LayoutCTA>
    </>
  );
};

export default Me;
