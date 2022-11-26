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
import { signIn, signOut, useSession } from "next-auth/react";
import classNames from "classnames";

const Me: NextPage = () => {
  const { data: sessionData } = useSession();

  return (
    <>
      {/* Title */}
      <LayoutTitle>
        <h1 className="py-8 font-clash text-7xl font-extrabold uppercase lg:text-8xl 2xl:row-span-2 2xl:text-9xl">
          Le <span className="rotate-3 text-emerald-600">profil</span> du mardi
        </h1>
        <LayoutTitle.Footer>
          {!sessionData ? (
            <div>
              Non connecté. Vous devez vous inscrire ou vous connecter pour
              participer.
            </div>
          ) : (
            <div>Hello {sessionData.user?.name + " !" || "!"}</div>
          )}
        </LayoutTitle.Footer>
      </LayoutTitle>

      <LayoutMenu />

      <LayoutPrev>
        {sessionData && (
          <>
            <div className="rounded-md bg-zinc-50 p-4 text-xl">
              <h2 className="text-zinc-900">Historique </h2>
            </div>
            <div className="rounded-md bg-zinc-50 p-4 text-xl">
              <h2 className="text-zinc-900">Email</h2>
            </div>
          </>
        )}
      </LayoutPrev>

      <LayoutAbout />

      <LayoutCTA>
        <div className="grid gap-4 lg:col-span-2 lg:grid-cols-1 2xl:grid-cols-2">
          {sessionData && <Button variant="secondary">Mes réponses</Button>}

          <Button
            variant="primary"
            onClick={sessionData ? () => signOut() : () => signIn()}
          >
            {sessionData ? "Déconnexion" : "Me connecter"}
          </Button>

          {!sessionData && (
            <p className="flex items-end justify-end text-sm 2xl:w-2/3">
              En vous inscrivant, vous acceptez de recevoir un (1) email par
              semaine, le mardi, à 9h et quelques, qui n&apos;aura d&apos;autre
              but que de vous rappeler que c&apos;est mardi et que c&apos;est
              top 3. Vous aurez la possibilité de vous désinscrire de cet envoi
              à tout moment.
            </p>
          )}
        </div>
      </LayoutCTA>
    </>
  );
};

export default Me;
