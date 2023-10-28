import ABI from "@/ABIs/marketplaceAbi.json";
import { createContract } from "./actions";
const contractAddress = "0xB594Cdeb1b46254A11Fc69d25D1a726aEbf9642c";

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

export async function purchaseListing(amount: any, index: number) {
  try {
    const contract = await createContract(contractAddress, ABI);
    await contract?.purchaseListing(amount, index);
  } catch (err) {
    console.error("Purchase Failed:", err);
  }
}
