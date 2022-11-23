const LayoutTitle = ({ children }: { children: React.ReactNode }) => {
  return (
    <section
      className="rounded-lg bg-zinc-100 p-4 text-zinc-900 lg:row-span-3 lg:grid-rows-1 lg:p-8 2xl:col-span-2 2xl:row-span-2 2xl:grid 2xl:grid-rows-2"
      v-auto-animate
    >
      {children}
    </section>
  );
};

export default LayoutTitle;
