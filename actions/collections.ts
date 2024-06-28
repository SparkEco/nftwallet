import { publicClient } from "@/config/client";
import { Account, WalletClient } from "viem";
import FactoryABI from "@/ABIs/ImpactNFTABI.json";
const impactNftFactoryAddress = "0x59EE60e47256970F5942e5482d3b9B49d8891D14";

export async function getImpactNfts({
  index,
}: {
  index: number;
}): Promise<string> {
  try {
    const data = await publicClient.readContract({
      address: impactNftFactoryAddress,
      abi: FactoryABI,
      functionName: "impactNFTs",
      args: [index],
    });
    return data as string;
  } catch (e) {
    console.error(e);
    throw e;
  }
}
interface createImpactNFTProps {
  client: WalletClient;
  args: {
    maxSupply: bigint;
    unitPrice: bigint;
    reciever: string;
    defaultAdmin: string;
    defaultMetadataURI: string;
  };
}
export async function createImpactNFT({ client, args }: createImpactNFTProps) {
  try {
    const _args = Object.values(args);
    const txhash = await client.writeContract({
      account: client.account as Account,
      chain: client.chain,
      address: impactNftFactoryAddress,
      abi: FactoryABI,
      functionName: "createImpactNFT",
      args: [..._args],
    });
    const reciept = await publicClient.waitForTransactionReceipt({
      hash: txhash,
    });
    if (reciept.status === "reverted") {
      throw Error("Transaction reverted");
    }
  } catch (e) {
    console.error(e);
  }
}
