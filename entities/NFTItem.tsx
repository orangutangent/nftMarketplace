"use client";
import React from "react";
import Image from "next/image";
import { INFTItem } from "@/shared/types/NFTItem";
import { getShortAddress } from "@/shared/lib/utils";
import { useWallet } from "@/shared/hooks/useWallet";
import { useRouter } from "next/navigation";
import BuyNFT from "@/features/BuyNFT";

export const NFTItem = (item: INFTItem) => {
  const router = useRouter();
  const { activeAccount } = useWallet();

  const handleOpenNFT = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(`/nfts/${item.id}`);
  };

  return (
    <div
      onClick={handleOpenNFT}
      className="flex w-[320px] h-[500px] flex-col justify-between gap-4 cursor-pointer hover:scale-105 duration-150 ease-in-out  overflow-hidden p-4 border-border border-2 rounded-xl"
    >
      <div className="flex flex-col gap-2 w-full">
        <h3 className="font-bold text-2xl text-center px-1 truncate">
          {item.name}
        </h3>
        <div className="relative mx-auto w-[240px] h-[220px] rounded-lg">
          <Image
            src={item.image}
            alt={item.name}
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
        <p
          style={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 3,
            height: "56px",
            lineHeight: "18px",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {item.description}
        </p>

        <p className="text-muted-foreground text-sm">
          Owner: {getShortAddress(item.owner)}
        </p>
        <p className="text-muted-foreground text-sm">
          Creator: {getShortAddress(item.creator)}
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <p className="font-bold text-center">{item.price} MATIC</p>
        {activeAccount &&
        activeAccount.toLowerCase() !== item.owner.toLocaleLowerCase() ? (
          <BuyNFT id={item.id.toString()} price={item.price.toString()} />
        ) : (
          <div>
            <p className="text-center font-bold text-muted-foreground">
              {"That's your NFT"} {item.currentlyListed ? "(on sale)" : ""}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
