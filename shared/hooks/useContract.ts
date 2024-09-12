import { create } from "zustand";
import { NFTMarketplace } from "../types/NFTMarketplace";

interface ContractState {
  contract: null | NFTMarketplace;
  setContract: (contract: any) => void;
}

export const useContract = create<ContractState>((set) => ({
  contract: null,
  setContract: (contract: NFTMarketplace) => set({ contract }),
}));
