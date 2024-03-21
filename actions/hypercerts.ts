import { HypercertClient } from "@hypercerts-org/sdk";
import { getTokenAccount } from "./serverActions";

function setupClient() {
  let client;
  try {
    client = new HypercertClient({
      chainId: BigInt("0x5"), // goerli testnet
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
