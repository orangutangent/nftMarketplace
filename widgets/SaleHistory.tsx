"use client";
import React from "react";
import { useContract } from "@/shared/hooks/useContract";
import { NFTMarketplaceV2 } from "@/shared/types/NFTMarketplaceV2";
import { ethers } from "ethers";
import { getShortAddress } from "@/shared/lib/utils";
import { Spinner } from "@/shared/ui/spinner";
import RightArrow from "@/shared/icons/RightArrow";

type SalesHistroyType = {
  tokenId: string;
  previousOwner: string;
  newOwner: string;
  salePrice: string;
  saleTimestamp: string;
};

interface SaleHistoryProps {
  tokenId: string;
}

const SaleHistory = ({ tokenId }: SaleHistoryProps) => {
  const { contract } = useContract();
  const [saleHistory, setSaleHistory] = React.useState<
    SalesHistroyType[] | undefined
  >([]);
  React.useEffect(() => {
    (async () => {
      const _saleHistory = await contract?.getSaleHistory(tokenId);
      if (!_saleHistory) return;
      const formatedSaleHistory = _saleHistory.map((sale) => {
        return {
          tokenId: Number(sale.tokenId).toString(),
          previousOwner: sale.previousOwner,
          newOwner: sale.newOwner,
          salePrice: ethers.formatEther(sale.salePrice),
          saleTimestamp: Number(sale.saleTimestamp).toString(),
        };
      });
      setSaleHistory(formatedSaleHistory);
    })();
  }, []);
  if (!saleHistory)
    return (
      <Spinner className="mt-20" size={"large"}>
        <span>Loading History...</span>
      </Spinner>
    );
  if (!saleHistory.length)
    return <p className="text-center">No sales history</p>;

  return (
    <div className="flex flex-col gap-4">
      {saleHistory.map((sale) => (
        <div
          key={sale.tokenId}
          className="grid grid-cols-[1fr,5rem,1fr,8rem,12rem] justify-center items-center"
        >
          <p className="bg-red-500 text-white rounded-full text-center">
            {getShortAddress(sale.previousOwner)}
          </p>
          <RightArrow />
          <p className="bg-blue-500 text-white rounded-full text-center">
            {getShortAddress(sale.newOwner)}
          </p>
          <div className="justify-center flex gap-1 px-1">
            <p title={sale.salePrice} className="truncate cursor-pointer">
              {sale.salePrice}
            </p>
            <p>MATIC</p>
          </div>
          <p className="text-center">
            {new Date(Number(sale.saleTimestamp) * 1000).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
};

export default SaleHistory;
