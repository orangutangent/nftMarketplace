"use client";
import { NFTForm } from "@/features/createNFT/NFTForm/ui";
import { useWallet } from "@/shared/hooks/useWallet";
import { AnimatePresence, motion } from "framer-motion";
import { PlusIcon } from "lucide-react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export function CreateNFT() {
  const [open, setOpen] = useState(false);
  const { activeAccount } = useWallet();
  const router = useRouter();

  const onSuccess = () => {
    setOpen(false);
    router.refresh();
  };
  if (!activeAccount) return <></>;
  return (
    <>
      {open && (
        <motion.div
          layout
          transition={{ duration: 0.3 }}
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          className="fixed z-10 h-lvh  inset-0 bg-black/20 backdrop-blur-md   "
        />
      )}
      <div
        className={`flex absolute z-20  bg-center bg-cover  flex-col items-center `}
      >
        <motion.div
          layout
          transition={{ duration: 0.3 }}
          initial={false}
          animate={open ? "open" : "closed"}
          variants={{
            open: { borderRadius: "12px" },
            closed: { borderRadius: "50%" },
          }}
          className={`bg-primary cursor-pointer relative min-h-[66px] min-w-[66px] pt-[66px] overflow-hidden  ${
            open ? " p-2 mb-16" : ""
          }`}
        >
          <motion.div
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.85 }}
            className="  flex items-center justify-center absolute top-[8px] left-[calc(50%-25px)]   "
            animate={open ? "open" : "closed"}
            layout
            variants={{
              open: { rotate: 45 },
              closed: { rotate: 0 },
            }}
            transition={{ duration: 0.2 }}
            onClick={() => setOpen(!open)}
          >
            <PlusIcon
              width={50}
              height={50}
              className={"text-primary-foreground h-[50px] w-[50px] "}
            />
          </motion.div>
          {open && (
            <AnimatePresence>
              <motion.div
                animate={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: -100 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <NFTForm onSuccess={onSuccess} />
              </motion.div>
            </AnimatePresence>
          )}
        </motion.div>
      </div>
    </>
  );
}
