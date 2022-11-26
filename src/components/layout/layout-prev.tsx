import type { ReactNode } from "react";

const LayoutPrev = ({ children }: { children?: ReactNode }) => {
  return (
    <section className="order-3 grid gap-4 lg:row-span-2 2xl:order-none 2xl:row-span-1 2xl:grid-cols-2">
      {children}
    </section>
  );
};

export default LayoutPrev;
