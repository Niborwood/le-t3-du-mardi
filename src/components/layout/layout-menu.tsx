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
    name: "Sujets",
  },
  {
    id: "log",
    name: "Journal",
  },
  {
    id: "about",
    name: "à propos",
  },
] as const;

const LayoutMenu = () => {
  <nav className="hidden rounded-lg lg:order-2 lg:grid 2xl:order-none 2xl:grid-cols-2">
    <div className="grid lg:items-center lg:px-4 2xl:col-start-2 2xl:place-items-center">
      <ul className="space-y-4 text-xl 2xl:w-2/3"></ul>
    </div>
  </nav>;
};

export default LayoutMenu;
