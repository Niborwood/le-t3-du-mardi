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
          <div className="col-span-2 rounded-md bg-zinc-50 p-4">
            <h2 className="text-zinc-900">Historique</h2>
          </div>
        )}
      </LayoutPrev>

      <LayoutAbout />

      <LayoutCTA>
        <div className="grid gap-4 lg:col-span-2 lg:grid-cols-1 2xl:grid-cols-2">
          {sessionData && <Button variant="secondary">Mes réponses</Button>}

          <Button
            variant="primary"
            onClick={sessionData ? () => signOut() : () => signIn()}
            className={classNames({
              "col-start-2": !sessionData,
            })}
          >
            {sessionData ? "Déconnexion" : "Me connecter"}
          </Button>
        </div>
      </LayoutCTA>
    </>
  );
};

export default Me;
