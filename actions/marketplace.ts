import ABI from "@/ABIs/marketplaceAbi.json";
import { createContract } from "./actions";
const contractAddress = "0x8909f270a9db947b1DeF26699d4E13926ae85654";

async function getAllListing() {
  let allListing;
  try {
    const contract = await createContract(contractAddress, ABI);
    allListing = await contract?.getAllListing();
  } catch (err) {
    console.error("Failed to get all listing", err);
  }
  return allListing;
}
