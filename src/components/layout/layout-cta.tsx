import { useAutoAnimate } from "@formkit/auto-animate/react";

const LayoutCTA = ({ children }: { children: React.ReactNode }) => {
  const [parent] = useAutoAnimate<HTMLDivElement>();
  return (
    <section
      ref={parent}
      className="order-2 grid gap-6 rounded-lg bg-zinc-100 p-6 text-zinc-900 lg:order-3 lg:row-span-2 2xl:order-none 2xl:col-span-2 2xl:row-span-1 2xl:grid-cols-2 2xl:gap-16 2xl:p-16"
    >
      {children}
    </section>
  );
};

export default LayoutCTA;
