"use client";
import React, { useEffect } from "react";
import { useWallet } from "@/shared/hooks/useWallet";
import { Button } from "@/shared/ui/button";
import { ethers } from "ethers";
import { useContract } from "@/shared/hooks/useContract";
// import { NFTMarketplace__factory } from "@/shared/contract/NFTMarketplace__factory";
import { NFTMarketplaceV2__factory as NFTMarketplace__factory } from "@/shared/contract/NFTMarketplaceV2__factory";
// import contractData from "@/shared/contract/Marketplace.json";
import contractData from "@/shared/contract/MarketplaceV2HHTest.json";

declare global {
  interface Window {
    ethereum: any;
  }
}

declare const window: any;

export const WalletConnect = () => {
  const [balance, setBalance] = React.useState<number | null>(null);
  const {
    accounts,
    setAccounts,
    activeAccount,
    setActiveAccount,
    provider,
    setProvider,
  } = useWallet();
  const { contract, setContract } = useContract();

  window.ethereum?.on("accountsChanged", (accounts: any) => {
    setActiveAccount(accounts[0]);
  });

  const onConnect = async () => {
    setAccounts(
      await window.ethereum?.request({ method: "eth_requestAccounts" })
    );
    setActiveAccount(await window.ethereum?.selectedAddress);
    setProvider(new ethers.BrowserProvider(window.ethereum));
  };

  useEffect(() => {
    console.log(accounts);
  }, [accounts]);

  useEffect(() => {
    console.log("contract: ", contract);
  }, [contract]);

  useEffect(() => {
    console.log("activeAccount: ", activeAccount);
  }, [activeAccount]);

  useEffect(() => {
    console.log("provider: ", provider);
    provider &&
      (async () => {
        provider?.getBalance(activeAccount).then((balance: any) => {
          setBalance(Number(ethers.formatEther(balance)));
        });
        const _contract = NFTMarketplace__factory.connect(
          contractData.address,
          await provider.getSigner()
        );

        setContract(_contract);

        console.log("contract: ", contract);
      })();
  }, [provider]);

  useEffect(() => {
    console.log("balance: ", balance);
  }, [balance]);
  return (
    <div className="flex gap-4 items-center ">
      {activeAccount ? (
        <div className=" font-bold text-primary-foreground bg-primary p-2 rounded-xl">
          {activeAccount.slice(0, 6)}...{activeAccount.slice(-4)}
        </div>
      ) : (
        <Button className="rounded-xl font-bold" onClick={onConnect}>
          Connect Wallet
        </Button>
      )}
    </div>
  );
};
