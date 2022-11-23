const LayoutAbout = ({ children }: { children: React.ReactNode }) => {
  return (
    <footer className="order-last h-full w-full 2xl:order-none">
      {children}
    </footer>
  );
};

export default LayoutAbout;
