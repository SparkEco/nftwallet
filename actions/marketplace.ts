"use server";

import ABI from "@/ABIs/marketplaceAbi.json";
import { createContract } from "./serverActions";
const contractAddress = "0x4b9e1520D6AD44C57d4e3B3B647ecCF46dA6e9d3";

export async function getAllListing() {
  let allListing;
  try {
    const contract = await createContract(contractAddress, ABI);
    if (contract !== undefined) {
      allListing = await contract.getAllListing();
    }
  } catch (err) {
    console.error("Failed to get all listing", err);
  }
  return allListing;
}
