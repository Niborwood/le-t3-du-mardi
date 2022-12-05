import Image from "next/image";
import Link from "next/link";

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
          <Link href="/">
            <Image
              src="/favicon.png"
              alt="Logo"
              className="w-24 rounded-lg 2xl:w-48"
              width={200}
              height={200}
            />
          </Link>
        </div>
      ) : (
        children
      )}
    </footer>
  );
};

export default LayoutAbout;
