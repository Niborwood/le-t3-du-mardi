import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Menu } from "lucide-react";
import { useSession } from "next-auth/react";
import { useMemo, useState } from "react";
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

  const reactiveMenus = useMemo(() => {
    if (status === "loading") return [];
    if (sessionData) return menus;
    return menus
      .filter((item) => item.id !== "play")
      .map((item) => ({
        ...item,
        name: item.name === "Mes réponses" ? "Se connecter" : item.name,
      }));
  }, [sessionData, status]);

  return (
    <>
      {/* DESKTOP */}
      <nav className="hidden rounded-lg lg:order-2 lg:grid 2xl:order-none 2xl:grid-cols-2">
        <div className="grid lg:items-center lg:px-4 2xl:col-start-2 2xl:place-items-center">
          <ul
            className="space-y-4 text-xl lg:space-y-2 2xl:w-2/3 2xl:space-y-4"
            ref={parent}
          >
            {reactiveMenus.map((item) => (
              <MenuItem key={item.id} item={item} />
            ))}
          </ul>
        </div>
      </nav>

      {/* MOBILE */}
      <nav className="fixed top-0 left-0 z-40 flex w-full justify-between bg-zinc-900 px-4 py-2 lg:hidden">
        <p className="font-clash text-xl font-bold uppercase">Le top 3 du _</p>
        <button onClick={() => setIsOpen((prev) => !prev)}>
          <Menu />
        </button>
      </nav>

      <MenuDialog isOpen={isOpen} setIsOpen={setIsOpen} items={menus} />
    </>
  );
};
export default LayoutMenu;
