const LayoutAbout = ({ children }: { children: React.ReactNode }) => {
  return (
    <footer className="order-last grid h-full w-full place-items-center 2xl:order-none">
      {children}
    </footer>
  );
};

export default LayoutAbout;
