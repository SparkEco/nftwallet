import { HypercertClient } from "@hypercerts-org/sdk";
import { getAccount, getProvider } from "./actions";

async function setupClient() {
  let client;
  try {
    const { provider } = await getProvider();

    client = new HypercertClient({
      chainId: 5, // goerli testnet
      operator: provider as any,
    });
  } catch (error) {
    console.error("Error during setup:", error);
  }
  return client;
}
export async function getClaims() {
  let claims;
  const owner = await getAccount();
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
