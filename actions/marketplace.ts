"use server";

import ABI from "@/ABIs/marketplaceAbi.json";
import { createContract } from "./serverActions";
let MARKETPLACE_CONTRACT = process.env
  .NEXT_PUBLIC_MARKETPLACE_CONTRACT as string;

export async function getAllListing() {
  let allListing;
  try {
    const contract = await createContract(MARKETPLACE_CONTRACT, ABI);
    if (contract !== undefined) {
      allListing = await contract.getAllListing();
    }
  } catch (err) {
    console.error("Failed to get all listing", err);
  }
  return allListing;
}
