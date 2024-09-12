"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { formSchema } from "../model/schema";
import { z } from "zod";
import { uploadMetadataToIPFS } from "../model/actions";

import { Button } from "@/shared/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { FileUpploader } from "@/shared/ui/FileUpploader";
import React from "react";
import { uploadFileToIPFS, uploadJSONToIPFS } from "@/shared/lib/pinata";
import { useContract } from "@/shared/hooks/useContract";
import { ethers } from "ethers";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "sonner";
interface NFTFormProps {
  onSuccess?: () => void;
}

export function NFTForm({ onSuccess }: NFTFormProps) {
  const { contract } = useContract();
  const [loading, setLoading] = React.useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      price: "0",
      royalty: "0",
      image: null,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    let loadingToast;
    try {
      loadingToast = toast.loading("Creating your NFT...", {
        id: "create-nft",
      });

      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("description", values.description);
      formData.append("file", values.image as File);

      const res = await uploadMetadataToIPFS(formData);

      if (res.success && contract && res.metadata) {
        const metadataURL = res.metadata;
        const tx = await contract.createToken(
          metadataURL,
          ethers.parseEther(values.price),
          ethers.toBigInt(values.royalty)
        );
        await tx.wait();
        toast.success("✅ Your NFT was uploaded to the IPFS network.");
        onSuccess?.();
        form.reset();
      }
    } catch (error) {
      toast.error("Something went wrong");
      setLoading(false);
      return;
    } finally {
      toast.dismiss(loadingToast);
    }
    setLoading(false);
  }
  if (!contract) {
    return (
      <div className="text-center p-4 ">
        <p className="text-3xl font-bold text-primary-foreground">
          Connect your wallet
        </p>
      </div>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        layout
        transition={{ duration: 0.3, type: "spring" }}
        initial={{ opacity: 0, y: -100, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -100, scale: 0.8 }}
      >
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-2 min-w-[400px] bg-background rounded-xl p-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>NFT name</FormLabel>
                  <FormControl>
                    <Input placeholder="token" {...field} />
                  </FormControl>
                  <FormDescription>This is name of your NFT.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>description</FormLabel>
                  <FormControl>
                    <Input placeholder="..." {...field} />
                  </FormControl>
                  <FormDescription>
                    You have to describe your NFT.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input placeholder="0.0" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is price of your NFT in MATIC.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="royalty"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Royalty</FormLabel>
                  <FormControl>
                    <Input placeholder="0" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your royalty for this NFT {"(%)"}.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <FileUpploader onUpload={field.onChange} />
                  </FormControl>
                  <FormDescription>
                    You have to upload your NFT.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={loading} type="submit">
              {loading ? "Uploading..." : "Create"}
            </Button>
          </form>
        </Form>
      </motion.div>
    </AnimatePresence>
  );
}
