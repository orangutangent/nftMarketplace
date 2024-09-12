"use client";
import { Input } from "@/shared/ui/input";
import { NFTDesk } from "@/widgets/NFTDesk";
import { NFTForm } from "@/features/createNFT/NFTForm/ui";
import React, { useEffect } from "react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <NFTDesk />
    </main>
  );
}
