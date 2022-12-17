import { Dialog } from "@headlessui/react";
import { ArrowUpRight, X } from "lucide-react";
import Link from "next/link";
import type { Dispatch, SetStateAction } from "react";
import type { menus } from "./layout-menu";

type MenuDialogProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  items: typeof menus;
};

export const MenuDialog = ({ isOpen, setIsOpen, items }: MenuDialogProps) => {
  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
      <section className="fixed inset-0 z-50 grid place-items-center">
        <Dialog.Panel className="grid h-screen w-screen place-items-center bg-emerald-600 p-8 font-clash text-5xl font-bold uppercase text-zinc-50">
          <section className="flex flex-col gap-8">
            {items.map((item) => (
              <Link
                className=""
                key={item.id}
                href={`/${item.id === "home" ? "" : item.id}`}
              >
                {item.name} <ArrowUpRight />
              </Link>
            ))}
          </section>
        </Dialog.Panel>
        <button
          className="absolute top-3 right-3 text-zinc-50"
          onClick={() => setIsOpen(false)}
        >
          <X size={35} />
        </button>
      </section>
    </Dialog>
  );
};
