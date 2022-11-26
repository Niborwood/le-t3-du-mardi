import Image from "next/image";

const LayoutAbout = ({
  children,
  logo = true,
}: {
  children?: React.ReactNode;
  logo?: boolean;
}) => {
  return (
    <footer className="order-last grid h-full w-full place-items-center 2xl:order-none">
      {logo ? (
        <div className="grid place-items-center">
          <Image
            src="/finite-logo.png"
            alt="Logo"
            className="w-24 2xl:w-48"
            width={200}
            height={200}
          />
        </div>
      ) : (
        children
      )}
    </footer>
  );
};

export default LayoutAbout;
