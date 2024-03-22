import { HypercertClient } from "@hypercerts-org/sdk";
import { getTokenAccount } from "./serverActions";
import { sepolia } from "viem/chains";
import { createWalletClient, custom } from "viem";

function setupClient() {
  let client;
  try {
    const walletClient = createWalletClient({
      chain: sepolia,
      transport: custom(window.ethereum as any),
    });
    client = new HypercertClient({
      chainId: BigInt(sepolia.id), // sepolia testnet
      walletClient: walletClient as any,
    });
  } catch (error) {
    console.error("Error during setup:", error);
  }
  return client;
}

export async function getClaims(owner: string) {
  let claims;
  const client = setupClient();
  if (client) {
    try {
      claims = await client.indexer.claimsByOwner(owner);
    } catch (err) {
      console.error("Couldn't get claims", err);
    }
  }
  return claims?.claims;
}
export async function getAccountClaims(id: number) {
  let claims;
  const tokenAccount = await getTokenAccount(id);
  try {
    claims = await getClaims(tokenAccount);
  } catch (err) {
    console.error("failed to fetch claims", err);
  }
  return claims;
}
