import { create } from "zustand";
// import { NFTMarketplace } from "../../shared/types/NFTMarketplace";
import { NFTMarketplaceV2 as NFTMarketplace } from "../types/NFTMarketplaceV2";

interface ContractState {
  contract: null | NFTMarketplace;
  setContract: (contract: any) => void;
}

export const useContract = create<ContractState>((set) => ({
  contract: null,
  setContract: (contract: NFTMarketplace) => set({ contract }),
}));
