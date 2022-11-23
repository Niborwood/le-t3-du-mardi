import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { menus } from "./layout-menu";

type MenuItemProps = {
  menuItem: typeof menus[number];
  isActive: boolean;
};

const MenuItem = ({ menuItem, isActive }: MenuItemProps) => {
  return (
    <button className="min-w-full uppercase">
      <Link
        className="flex items-center justify-start gap-1 2xl:justify-end"
        href={`/${menuItem.id}`}
        v-auto-animate
      >
        {isActive && <ArrowRight size={16} className="relative" />}
        <div>{menuItem.name}</div>
      </Link>
    </button>
  );
};

export default MenuItem;
