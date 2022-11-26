import classNames from "classnames";
import type { ReactNode } from "react";

const LayoutTitle = ({
  children,
  empty = false,
}: {
  children: ReactNode;
  empty?: boolean;
}) => {
  return (
    <section
      className={classNames(
        {
          "bg-transparent": empty,
        },
        "rounded-lg bg-zinc-100 p-4 text-zinc-900 lg:row-span-3 lg:grid-rows-1 lg:p-8 2xl:col-span-2 2xl:row-span-2 2xl:grid 2xl:grid-rows-2"
      )}
    >
      {children}
    </section>
  );
};

export default LayoutTitle;
