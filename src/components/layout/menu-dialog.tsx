import { Dialog } from "@headlessui/react";
import classNames from "classnames";
import { ArrowUpRight, Link2, Plus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import type { Dispatch, SetStateAction } from "react";
import { share } from "../../utils";
import type { menus } from "./layout-menu";

type MenuDialogProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  items: typeof menus;
};

export const MenuDialog = ({ isOpen, setIsOpen, items }: MenuDialogProps) => {
  const router = useRouter();
  const handleShare = async () => {
    try {
      await share();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
      <section className="fixed inset-0 z-50 grid place-items-center">
        <Dialog.Panel className="grid h-screen w-screen place-items-center bg-emerald-600 p-8 font-clash text-5xl font-bold uppercase text-zinc-50">
          <section className="flex flex-col gap-8">
            {/* Items */}
            {items.map((item) => {
              const isActive =
                router.pathname === "/"
                  ? item.id === "home"
                  : router.pathname.includes(item.id);

              return (
                <Link
                  className="group"
                  key={item.id}
                  href={`/${item.id === "home" ? "" : item.id}`}
                >
                  <span
                    className={classNames(
                      "transition-all group-hover:underline",
                      {
                        underline: isActive,
                      }
                    )}
                  >
                    {item.name}
                  </span>{" "}
                  <ArrowUpRight
                    className={classNames(
                      "transition-all group-hover:rotate-45",
                      {
                        "-rotate-45": isActive,
                      }
                    )}
                  />
                </Link>
              );
            })}

            {/* Share */}
            <button
              className="group text-left font-clash text-5xl font-bold uppercase"
              onClick={handleShare}
            >
              <span
                className={classNames("transition-all group-hover:underline")}
              >
                Partager
              </span>{" "}
              <Link2 className={classNames("transition-all")} />
            </button>
          </section>
        </Dialog.Panel>
        <button
          className="absolute top-3 right-3 rotate-45 text-zinc-50 transition-all hover:rotate-45 lg:rotate-0"
          onClick={() => setIsOpen(false)}
        >
          <Plus size={35} />
        </button>
      </section>
    </Dialog>
  );
};
