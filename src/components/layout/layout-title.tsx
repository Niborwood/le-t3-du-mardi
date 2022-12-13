import classNames from "classnames";
import { ArrowDownRight } from "lucide-react";
import type { ReactNode } from "react";
import { useRouter } from "next/router";
import { useAutoAnimate } from "@formkit/auto-animate/react";

const LayoutTitle = ({
  children,
  empty = false,
}: {
  children: ReactNode;
  empty?: boolean;
}) => {
  const router = useRouter();
  const [parent] = useAutoAnimate<HTMLDivElement>();

  return (
    <section
      className={classNames(
        {
          "bg-transparent": empty,
          "order-2 lg:order-none": router.pathname === "/play",
        },
        "overflow-auto rounded-lg bg-zinc-100 p-4 text-zinc-900 lg:row-span-3 lg:grid-rows-1 lg:p-8 2xl:col-span-2 2xl:row-span-2 2xl:grid 2xl:grid-rows-2"
      )}
      ref={parent}
    >
      {children}
    </section>
  );
};

const Footer = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col items-end justify-between gap-4 border-t-2 border-zinc-800 py-4 text-lg 2xl:flex-row 2xl:text-2xl">
      <span>{children}</span>
      <ArrowDownRight
        className="relative top-1 rotate-45 2xl:rotate-0"
        size={40}
      />
    </div>
  );
};

LayoutTitle.Footer = Footer;
export default LayoutTitle;
