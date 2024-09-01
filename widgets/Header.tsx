"use client";
import { ModeToggle } from "@/features/ModeToggle";
import { WalletConnect } from "@/features/WalletConnect";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const links = [
  {
    name: "Home",
    href: "/",
  },
  // {
  //   name: "Create",
  //   href: "/create",
  // },
  {
    name: "My NFTs",
    href: "/my-nfts",
  },
];

export const Header = () => {
  const pathname = usePathname();
  return (
    <div className="flex justify-between w-full py-4 px-8 rounded-full bg-secondary">
      <div className="flex gap-4">
        {links.map((link) => (
          <Link href={link.href} key={link.name} className="relative p-2">
            {link.href === pathname && (
              <motion.div
                layoutId="underline"
                style={{
                  borderRadius: "9999px",
                }}
                className=" absolute inset-0  bg-blue-500"
              />
            )}
            <span className="font-bold relative z-10">{link.name}</span>
          </Link>
        ))}
      </div>
      <div className="flex gap-4">
        <WalletConnect />
        <ModeToggle />
      </div>
    </div>
  );
};
