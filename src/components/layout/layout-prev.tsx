import type { ReactNode } from "react";
import { useRouter } from "next/router";
import classNames from "classnames";

const LayoutPrev = ({ children }: { children?: ReactNode }) => {
  const router = useRouter();
  console.log(router.pathname);
  return (
    <section
      className={classNames(
        "grid gap-4 lg:row-span-2 2xl:order-none 2xl:row-span-1 2xl:grid-cols-2",
        {
          "order-1 lg:order-3": router.pathname === "/play",
          "order-3": router.pathname !== "/play",
        }
      )}
    >
      {children}
    </section>
  );
};

export default LayoutPrev;
