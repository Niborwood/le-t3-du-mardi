import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Dialog } from "@headlessui/react";
import { Menu } from "lucide-react";
import { useSession } from "next-auth/react";
import { useMemo, useState } from "react";
import { share, weekday } from "../../utils";
import { MenuDialog } from "./menu-dialog";
import MenuItem from "./menu-item";

export const menus = [
  {
    id: "home",
    name: "Home",
  },
  {
    id: "play",
    name: "Jouer",
  },
  {
    id: "topics",
    name: "Anciens tops",
  },
  {
    id: "me",
    name: "Mon compte",
  },
  {
    id: "about",
    name: "À propos",
  },
];

const LayoutMenu = () => {
  const { data: sessionData, status } = useSession();
  const [parent] = useAutoAnimate<HTMLUListElement>();
  const [isOpen, setIsOpen] = useState(false);
  const [isShareToastOpen, setIsShareToastOpen] = useState(false);

  const reactiveMenus = useMemo(() => {
    if (status === "loading") return [];
    if (sessionData) return menus;
    return menus
      .filter((item) => item.id !== "play")
      .map((item) => ({
        ...item,
        name: item.id === "me" ? "Se connecter" : item.name,
      }));
  }, [sessionData, status]);

  const handleShare = async () => {
    try {
      await share();

      // Open toast, then close it after 3 seconds
      setIsShareToastOpen(true);
      setTimeout(() => setIsShareToastOpen(false), 3000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {/* DESKTOP */}
      <nav
        className="hidden rounded-lg lg:order-2 lg:grid 2xl:order-none 2xl:grid-cols-2"
        ref={parent}
      >
        <div className="grid lg:items-center lg:px-4 2xl:col-start-2 2xl:place-items-center">
          <ul
            className="space-y-4 text-right text-xl lg:space-y-2 2xl:w-2/3 2xl:space-y-4"
            ref={parent}
          >
            {reactiveMenus.map((item) => (
              <MenuItem key={item.id} item={item} />
            ))}
            <button
              className="flex items-center justify-start gap-1 text-right uppercase 2xl:ml-auto 2xl:justify-end"
              onClick={handleShare}
            >
              Partager
            </button>
          </ul>
        </div>

        <Dialog
          open={isShareToastOpen}
          onClose={() => setIsShareToastOpen(false)}
        >
          <section className="fixed bottom-2 left-2 right-2 z-50 m-auto w-fit">
            <Dialog.Panel className="rounded-lg bg-emerald-600 p-8 font-archivo font-light text-zinc-50">
              Le lien est copié dans le presse-papier !
            </Dialog.Panel>
          </section>
        </Dialog>
      </nav>

      {/* MOBILE */}
      <nav className="fixed top-0 left-0 z-40 flex w-full justify-between bg-zinc-900 px-4 py-2 lg:hidden">
        <p className="font-clash text-xl font-bold uppercase">
          Le top 3 du {weekday}
        </p>
        <button onClick={() => setIsOpen((prev) => !prev)}>
          <Menu />
        </button>
      </nav>

      <MenuDialog isOpen={isOpen} setIsOpen={setIsOpen} items={reactiveMenus} />
    </>
  );
};
export default LayoutMenu;
