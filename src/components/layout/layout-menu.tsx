import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useSession } from "next-auth/react";
import { useMemo } from "react";
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
    name: "à propos",
  },
];

const LayoutMenu = () => {
  const { data: sessionData, status } = useSession();
  const [parent] = useAutoAnimate<HTMLUListElement>();
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
  );
};
export default LayoutMenu;
