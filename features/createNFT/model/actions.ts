"use server";

import { PinataSDK } from "pinata";

const pinata = new PinataSDK({
  pinataJwt: process.env.NEXT_PUBLIC_PINATA_JWT,
  pinataGateway: process.env.NEXT_PUBLIC_PINATA_DOMAIN!,
});

const pinataURL = "https://gateway.pinata.cloud/ipfs/";

export const uploadMetadataToIPFS = async (formData: FormData) => {
  try {
    const file = formData.get("file") as File;
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const price = formData.get("price") as string;
    const formatedFile = new File([file], name, { type: file.type });
    const fileURL =
      pinataURL + (await pinata.upload.file(formatedFile)).IpfsHash;
    const metadata =
      pinataURL +
      (
        await pinata.upload.json({
          name,
          description,
          image: fileURL,
          price,
        })
      ).IpfsHash;
    return {
      success: true,
      metadata,
    };
  } catch (err) {
    return {
      success: false,
      metadata: null,
    };
  }
};
