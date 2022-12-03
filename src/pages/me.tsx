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
import { trpc } from "../utils/trpc";

const Me: NextPage = () => {
  const { data: sessionData } = useSession();
  const utils = trpc.useContext();

  // TRPC QUERY
  const { data: user, isLoading: userIsLoading } =
    trpc.user.getStats.useQuery();

  // MUTATIONS
  const mutateUnsubscribe = trpc.user.unsubscribe.useMutation({
    onSuccess: () => {
      utils.user.getStats.invalidate();
    },
  });

  // HANDLERS
  const handleUnsubscribe = async () => {
    await mutateUnsubscribe.mutateAsync();
  };

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
            <div>
              Hello {sessionData.user?.name + " !" || "!"} |{" "}
              <button onClick={() => signOut()}>Se déconnecter</button>
            </div>
          )}
        </LayoutTitle.Footer>
      </LayoutTitle>

      <LayoutMenu />

      <LayoutPrev>
        {sessionData && (
          <>
            <div className="space-y-4 rounded-md bg-zinc-50 p-4 text-zinc-900">
              <h2 className="text-xl font-semibold text-zinc-900">Stats </h2>
              <div>
                <p className="font-clash text-4xl font-semibold">
                  {user?._count.answers}
                </p>
                <p className="text-md lg:text-lg">réponses données</p>
              </div>
              <div>
                <p className="font-clash text-4xl font-semibold">
                  {user?._count.topics}
                </p>
                <p className="text-md lg:text-lg">sujets proposés</p>
              </div>
            </div>
            <div className="flex flex-col gap-4 rounded-md bg-zinc-50 p-4 text-zinc-900">
              <h2 className="text-xl font-semibold text-zinc-900">
                Newsletter
              </h2>
              <p>
                {user?.isUnsubscribed
                  ? "Vous souhaitez de nouveau"
                  : "Vous ne souhaitez plus"}{" "}
                recevoir le mail automatique de rappel du top 3 du mardi ?
              </p>
              <Button onClick={handleUnsubscribe} variant="secondary" size="sm">
                Se {user?.isUnsubscribed ? "réabonner" : "désabonner"}
              </Button>
            </div>
          </>
        )}
      </LayoutPrev>

      <LayoutAbout />

      <LayoutCTA>
        <div className="grid gap-4 lg:col-span-2 lg:grid-cols-1 2xl:grid-cols-2">
          {sessionData && (
            <Button variant="secondary" href="/topics">
              <span className="underline underline-offset-4">Voter</span> /{" "}
              <span className="underline underline-offset-4">Proposer</span> un
              sujet
            </Button>
          )}

          <Button
            variant="primary"
            onClick={sessionData ? undefined : () => signIn()}
            href={sessionData ? "/play" : undefined}
          >
            {sessionData ? "Jouer" : "Me connecter"}
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
