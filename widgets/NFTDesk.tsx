"use client";
import React, { useEffect, useState } from "react";
import { useContract } from "@/shared/hooks/useContract";
import { NFTMarketplace } from "@/shared/types/NFTMarketplace";
import axios from "axios";
import { NFTItem } from "@/entities/NFTItem";
import { NFTItemSkeleton } from "@/entities/NFTItemSkeleton";
type NFT = NFTMarketplace.ListedTokenStructOutput;
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { ethers } from "ethers";

export const NFTDesk = () => {
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
      } catch {
        setLoading(false);
        toast.error("Something went wrong");
      }
    })();
  }, [nfts, contract]);

  useEffect(() => {
    (async () => {
      if (!contract) return;
      try {
        const _nfts = await contract.getListedNFTs();
        setNfts(_nfts);
      } catch (error: any) {
        if (error.code === "BAD_DATA") {
          toast.error("Received bad data.");
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

  if (nfts && nfts.length === 0)
    return <p className="text-3xl font-bold">No NFTs on sale</p>;

  return (
    <AnimatePresence>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-4 w-full">
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
    </AnimatePresence>
  );
};
