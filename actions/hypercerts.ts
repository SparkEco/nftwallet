import { HypercertClient } from "@hypercerts-org/sdk";
import { getAccount, getProvider } from "./actions";
import { ethers } from "ethers";

async function setupClient() {
  let client;
  try {
    const { provider } = await getProvider();
    const signer = await provider?.getSigner();

    client = new HypercertClient({
      chainId: 5, // goerli testnet
    });
  } catch (error) {
    console.error("Error during setup:", error);
  }
  return client;
}
export async function getClaims(owner: string) {
  let claims;
  const client = await setupClient();
  try {
    claims = await client?.indexer.graphClient.ClaimTokensByOwner({
      owner: owner,
    });
  } catch (err) {
    console.error("Couldn't get claims", err);
  }
  return claims;
}
