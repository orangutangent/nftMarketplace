import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/dialog";
import { useContract } from "@/shared/hooks/useContract";
import React from "react";
import { toast } from "sonner";
import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";
import { ethers } from "ethers";
import { DialogClose } from "@radix-ui/react-dialog";

interface ListNFTProps {
  id: string;
  onSuccess?: () => void;
}

export const ListNFT = ({ id, onSuccess }: ListNFTProps) => {
  const { contract } = useContract();
  const [price, setPrice] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const closeRef = React.useRef<HTMLButtonElement>(null);

  const handleListNFT = async () => {
    if (!contract) return;
    let loadingToast;
    try {
      setLoading(true);
      loadingToast = toast.loading("Listing NFT...");
      if (!Number(price)) {
        toast.error("Please enter a valid price");
        return;
      }
      let _price = ethers.parseUnits(price, "ether");
      const tx = await contract.listTokenForSale(id, _price, {
        value: ethers.parseEther(
          process.env.NEXT_PUBLIC_LISTING_PRICE as string
        ),
      });
      await tx.wait();
      toast.success("NFT listed successfully");
      closeRef.current && closeRef.current?.click();
      onSuccess?.();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
      toast.dismiss(loadingToast);
    }
  };
  return (
    <Dialog>
      <DialogTrigger>
        <Button>List NFT</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Write the price of your NFT in MATIC</DialogTitle>
        </DialogHeader>
        <DialogDescription className="p-4 flex flex-col items-center gap-4">
          <Input value={price} onChange={(e) => setPrice(e.target.value)} />
        </DialogDescription>
        <div className="p-4 flex  items-center gap-4">
          {/* <DialogClose ref={closeRef}>
            <Button disabled={loading}>Cancel</Button>
          </DialogClose> */}
          <Button
            disabled={loading}
            className="self-center max-w-max"
            variant={"outline"}
            onClick={handleListNFT}
          >
            List NFT
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
