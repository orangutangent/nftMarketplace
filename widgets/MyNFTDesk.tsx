"use client";
import React, { useEffect, useState } from "react";
import { useContract } from "@/shared/hooks/useContract";
// import { NFTMarketplace } from "@/shared/types/NFTMarketplace";
import { NFTMarketplaceV2 as NFTMarketplace } from "@/shared/types/NFTMarketplaceV2";
import axios from "axios";
import { NFTItem } from "@/entities/NFTItem";
import { NFTItemSkeleton } from "@/entities/NFTItemSkeleton";
type NFT = NFTMarketplace.ListedTokenStructOutput;
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { ethers } from "ethers";

export const MyNFTDesk = () => {
  const [nfts, setNfts] = useState<NFT[] | undefined>(undefined);
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { contract } = useContract();

  useEffect(() => {
    if (!nfts || !contract) return;
    (async () => {
      try {
        const _items = await Promise.all(
          nfts.map(async (nft) => {
            const uri = await contract.tokenURI(nft.tokenId);
            const response = await axios.get(uri);
            return {
              ...response.data,
              id: Number(nft.tokenId),
              owner: nft.owner,
              creator: nft.creator,
              price: ethers.formatEther(nft.price),
              currentlyListed: nft.currentlyListed,
            };
          })
        );
        setItems(_items);
        setLoading(false);
      } catch (error: any) {
        console.log(error?.message);
        toast.error("Something went wrong");
      } finally {
        setLoading(false);
      }
    })();
  }, [nfts, contract]);

  useEffect(() => {
    (async () => {
      if (!contract) return;
      try {
        const _nfts = await contract.getMyNFTs();
        setNfts(_nfts);
      } catch (error: any) {
        if (error.code === "BAD_DATA") {
          toast.error("Received empty response.");
          return;
        }
        toast.error("Something went wrong");
      }
    })();
  }, [contract]);

  if (!contract)
    return (
      <div className="flex justify-center">
        <p className="text-3xl font-bold">Connect your wallet</p>
      </div>
    );

  if (!nfts || nfts.length === 0)
    return (
      <div className=" text-center mt-20">
        <h2 className="text-3xl font-bold">You don't own any NFT</h2>
        <p className="text-3xl font-bold">You can create one or buy one</p>
      </div>
    );

  return (
    <AnimatePresence>
      <div className="w-full min-h-screen  ">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-4 w-full pt-24">
          {loading
            ? Array.from({ length: 3 }).map((_, i) => (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  key={i}
                >
                  <NFTItemSkeleton />
                </motion.div>
              ))
            : items.map((item, i) => (
                <AnimatePresence key={item.id}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    key={i}
                  >
                    <NFTItem {...item} />
                  </motion.div>
                </AnimatePresence>
              ))}
        </div>
      </div>
    </AnimatePresence>
  );
};
