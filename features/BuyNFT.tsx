"use client";
import React from "react";
import { useContract } from "@/shared/hooks/useContract";
import { ethers } from "ethers";
import { toast } from "sonner";
import { Button } from "@/shared/ui/button";
import { useRouter } from "next/navigation";

interface BuyNFTProps {
  id: string;
  price: string;
}

const BuyNFT = ({ id, price }: BuyNFTProps) => {
  const router = useRouter();
  const { contract } = useContract();
  const [loading, setLoading] = React.useState(false);
  const handleBuy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setLoading(true);
    const loadingToast = toast.loading("Buying NFT...");
    if (!contract) {
      alert("Connect your wallet");
      return;
    }

    try {
      const tx = await contract.executeSale(id, {
        value: ethers.parseEther(price),
      });
      await tx.wait();
      toast.success("NFT bought successfully");
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
      toast.dismiss(loadingToast);
    }
  };

  return (
    <Button disabled={loading} variant="default" onClick={handleBuy}>
      {loading ? "Buying..." : "Buy"}
    </Button>
  );
};

export default BuyNFT;
