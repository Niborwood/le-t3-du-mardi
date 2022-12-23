import { Dialog } from "@headlessui/react";
import { useState } from "react";
import { share } from "../../utils";
import { Button } from "../ui";

const LayoutAbout = ({
  children,
  logo = true,
}: {
  children?: React.ReactNode;
  logo?: boolean;
}) => {
  const [isShareToastOpen, setIsShareToastOpen] = useState(false);
  const handleShare = async () => {
    try {
      await share();

      // Open toast, then close it after 3 seconds
      setIsShareToastOpen(true);
      setTimeout(() => setIsShareToastOpen(false), 3000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <footer className="order-last grid h-full w-full place-items-center 2xl:order-none">
      {logo ? (
        <div className="grid place-items-center">
          <Button onClick={handleShare} variant="light">
            Partager
          </Button>
        </div>
      ) : (
        children
      )}

      <Dialog
        open={isShareToastOpen}
        onClose={() => setIsShareToastOpen(false)}
      >
        <section className="fixed bottom-2 left-2 right-2 z-50 m-auto w-fit">
          <Dialog.Panel className="rounded-lg bg-emerald-600 p-8 font-archivo font-light text-zinc-50">
            Le lien est copié dans le presse-papier !
          </Dialog.Panel>
        </section>
      </Dialog>
    </footer>
  );
};

export default LayoutAbout;
