"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { useContract } from "@/shared/hooks/useContract";
import { NFTMarketplace } from "@/shared/types/NFTMarketplace";

import { Spinner } from "@/shared/ui/spinner";
import { toast } from "sonner";
import { Button } from "@/shared/ui/button";
import { useWallet } from "@/shared/hooks/useWallet";
import { getShortAddress } from "@/shared/lib/utils";
import { ListNFT } from "@/features/listNFT/ui";
import { ethers } from "ethers";
import SaleHistory from "@/widgets/SaleHistory";
import BuyNFT from "@/features/BuyNFT";

type NFT = NFTMarketplace.ListedTokenStructOutput;

interface NFTMetadata {
  name: string;
  description: string;
  image: string;
}

function NFTPage({ params }: { params: { id: string } }) {
  const { contract } = useContract();
  const { activeAccount } = useWallet();
  const [token, setToken] = React.useState<null | NFT>(null);
  const [tokenMetadata, setTokenMetadata] = React.useState<null | NFTMetadata>(
    null
  );
  useEffect(() => {
    (async () => {
      try {
        const _token = await contract?.getTokenById(params.id);
        _token && setToken(_token);
        const _tokenURI = await contract?.tokenURI(params.id);
        let metadata;
        if (_tokenURI)
          metadata = await (await fetch(_tokenURI, { method: "GET" })).json();
        metadata && setTokenMetadata(metadata);
      } catch {
        toast.error("Something went wrong");
      }
    })();
  }, [contract, params.id]);

  if (!token || !tokenMetadata) {
    return (
      <Spinner className="mt-20" size={"large"}>
        <span>Loading NFT...</span>
      </Spinner>
    );
  }

  const copyText = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard");
  };

  return (
    <div className="size-full space-y-4  mt-8 p-4">
      <div className="flex items-center justify-center min-h-max gap-4">
        <Image
          src={tokenMetadata.image}
          alt={tokenMetadata.name}
          // layout="responsive"
          width={300}
          height={300}
          className="rounded-xl "
        />
        <div className="p-4 w-full min-h-[300px] gap-4 bg-accent rounded-2xl   flex flex-col justify-between">
          <div className="flex flex-col gap-2 items-center">
            <h1 className="text-3xl  font-bold">{tokenMetadata.name}</h1>
            <div className="h-1 bg-slate-200 w-full rounded-full" />
            <p className="text-lg">{tokenMetadata.description}</p>
            {token.owner && (
              <p
                title="click to copy"
                className="cursor-pointer hover:underline"
                onClick={() => copyText(token.owner)}
              >
                Owner: {getShortAddress(token.owner)}
              </p>
            )}
            {token.creator && (
              <p
                title="click to copy"
                className="cursor-pointer hover:underline"
                onClick={() => copyText(token.creator)}
              >
                Creator: {getShortAddress(token.creator)}
              </p>
            )}
            {token.royalty && (
              <p className="text-lg">
                Creator Royalty: {Number(token.royalty)}%
              </p>
            )}
          </div>
          <div className="flex justify-center">
            {token.owner.toLocaleLowerCase() ==
            activeAccount.toLocaleLowerCase() ? (
              token.currentlyListed ? (
                <p> now listed for {ethers.formatEther(token.price)} MATIC</p>
              ) : (
                <ListNFT id={params.id} />
              )
            ) : (
              token.currentlyListed && (
                <BuyNFT
                  id={params.id}
                  price={ethers.formatEther(token.price)}
                />
              )
            )}
          </div>
        </div>
      </div>

      <div className="h-1 bg-slate-200 w-full rounded-full" />
      <SaleHistory tokenId={params.id} />
    </div>
  );
}

export default NFTPage;
