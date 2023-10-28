import { HypercertClient } from "@hypercerts-org/sdk";
import { getTokenAccount, getProvider } from "./actions";

async function setupClient() {
  let client;
  if (!client) {
    try {
      client = new HypercertClient({
        chainId: 5, // goerli testnet
      });
    } catch (error) {
      console.error("Error during setup:", error);
    }
    return client;
  }
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
  return claims?.claimTokens;
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
