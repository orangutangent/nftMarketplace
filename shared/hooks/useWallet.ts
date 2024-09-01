import { create } from "zustand";

interface WalletState {
  accounts: any;
  setAccounts: (accounts: any) => void;
  activeAccount: any;
  setActiveAccount: (account: any) => void;
  provider: any;
  setProvider: (provider: any) => void;
}

export const useWallet = create<WalletState>((set) => ({
  accounts: null,
  setAccounts: (accounts: any) => set({ accounts }),
  activeAccount: null,
  setActiveAccount: (account: any) => set({ activeAccount: account }),
  provider: null,
  setProvider: (provider: any) => set({ provider }),
}));
