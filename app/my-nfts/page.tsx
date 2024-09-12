import { CreateNFT } from "@/features/createNFT";
import { MyNFTDesk } from "@/widgets/MyNFTDesk";
import React from "react";

function page() {
  return (
    <div className="flex min-h-screen  bg-center bg-cover  flex-col items-center  p-24">
      <CreateNFT />
      <MyNFTDesk />
    </div>
  );
}

export default page;
