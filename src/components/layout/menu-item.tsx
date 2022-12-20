import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { menus } from "./layout-menu";
import { useRouter } from "next/router";
import { useAutoAnimate } from "@formkit/auto-animate/react";

type MenuItemProps = {
  item: typeof menus[number];
};

const MenuItem = ({ item }: MenuItemProps) => {
  const router = useRouter();
  const [parent] = useAutoAnimate<HTMLAnchorElement>();
  const isActive =
    router.pathname === "/"
      ? item.id === "home"
      : router.pathname.includes(item.id);

  return (
    <button className="min-w-full uppercase">
      <Link
        className="flex items-center justify-start gap-1 2xl:justify-end"
        href={`/${item.id === "home" ? "" : item.id}`}
        ref={parent}
      >
        {isActive && <ArrowRight size={16} className="relative" />}
        <div className="text-right">{item.name}</div>
      </Link>
    </button>
  );
};

export default MenuItem;
