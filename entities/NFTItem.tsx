"use client";
import React from "react";
import Image from "next/image";
import { INFTItem } from "@/shared/types/NFTItem";
import { Button } from "@/shared/ui/button";
import { getShortAddress } from "@/shared/lib/utils";
import { useContract } from "@/shared/hooks/useContract";
import { toast } from "sonner";
import { ethers } from "ethers";
import { useWallet } from "@/shared/hooks/useWallet";
import { useRouter } from "next/navigation";

export const NFTItem = (item: INFTItem) => {
  const router = useRouter();
  const { contract } = useContract();
  const { activeAccount } = useWallet();

  const handleBuy = async () => {
    if (!contract) {
      alert("Connect your wallet");
      return;
    }

    try {
      const tx = await contract.executeSale(item.id, {
        value: ethers.parseEther(item.price.toString()),
      });
      await tx.wait();
      toast.success("NFT bought successfully");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const handleOpenNFT = (e: React.MouseEvent) => {
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
        <p className="font-bold text-center">{item.price} ETH</p>
        {activeAccount &&
        activeAccount.toLowerCase() !== item.owner.toLocaleLowerCase() ? (
          <Button variant="default" onClick={handleBuy}>
            Buy
          </Button>
        ) : (
          <div>
            <p className="text-center font-bold text-muted-foreground">
              {"That's your NFT"}
            </p>
            {/* {item.currentlyListed ? (
              <p>On sale for {item.price}</p>
            ) : (
              <Button variant="default" onClick={handleBuy}>
                List on sale
              </Button>
            )} */}
          </div>
        )}
      </div>
    </div>
  );
};
