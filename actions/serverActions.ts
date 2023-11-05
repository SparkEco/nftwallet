"use server";

import { ethers, Contract, AlchemyProvider } from "ethers";
import { NFTData } from "@/context/types";
import { getAllListing } from "./marketplace";
import { getAttributes, getContract } from "./clientActions";

const cache: Record<string, any> = {};

const getCachedValue = async <T>(
  key: string,
  func: () => Promise<T>
): Promise<T> => {
  if (cache[key]) {
    return cache[key];
  } else {
    const result = await func();
    cache[key] = result;
    return result;
  }
};

export async function getProviderReadOnly() {
  const alchemyKey = process.env.NEXT_PUBLIC_ALCHEMY;
  const key = "providerReadOnly";
  return getCachedValue(key, async () => {
    let provider;
    try {
      provider = new AlchemyProvider("goerli", alchemyKey);
      console.log("ReadOnly provider has been set");
    } catch (err) {
      console.error("Provider failed", err);
    }
    return provider;
  });
}

export async function getNextId() {
  const key = "nextId";
  return getCachedValue(key, async () => {
    let nextId;
    try {
      const contract = await getContract();
      if (contract) {
        nextId = await contract.nextTokenId();
      }
    } catch (err) {
      console.error("Operation Failed", err);
    }
    return nextId;
  });
}

export async function getTokenByIndex(index: number) {
  let id;
  try {
    const contract = await getContract();
    if (contract) {
      id = await contract.tokenByIndex(index);
      console.log("ID has been gotten");
    }
  } catch (err) {
    console.error("Can't fetch ID", err);
  }
  return id;
}
export async function getTotalSupply() {
  let totalSupply;
  try {
    const contract = await getContract();
    if (contract) {
      totalSupply = await contract.totalSupply();
      console.log("Total Supply gotten");
    }
  } catch (err) {
    console.error("Method Failed", err);
  }
  return totalSupply;
}

export const getAll = async () => {
  const key = "allnfts";
  return getCachedValue(key, async () => {
    const allNfts: NFTData[] = [];
    try {
      const listings = await getAllListing();
      console.log(listings);
      const unloaded = listings.valueOf();
      const destructured = Array(...unloaded).map((item) => item.valueOf());
      const data = destructured.map((item, index) => {
        return {
          id: item[0],
          price: item[1],
          owner: item[2],
        };
      });

      const nftPromise = data.map(async (item) => {
        const contract = await getContract();
        if (contract) {
          try {
            console.log(item.id);
            let tokenURI = await contract.tokenURI(item.id);
            console.log(tokenURI);
            let tokenAccount = await contract.tokenAccount(item.id);
            console.log(tokenAccount);
            let attributes = await getAttributes(tokenAccount);
            console.log(attributes);
            // let claims = await getClaims(tokenAccount);
            let res = await fetch(tokenURI);
            let data = await res.json();
            let nft: NFTData = {
              id: Number(item.id),
              attributes: attributes,
              name: data.name,
              coordinates: data.coordinates,
              coverImage: data.nftcover,
              projectImages: data.projectimages,
              image: data.image,
              ipfsUri: tokenURI,
              tokenAccount: tokenAccount,
              description: data.description,
            };
            allNfts.push(nft);
          } catch (err) {}
        }
      });
      await Promise.all(nftPromise);
      console.log("Got all listed nfts");
    } catch (err) {
      console.error("Failed to retrieve data:", err);
    }
    return allNfts;
  });
};

export const getGeojson = async (allNfts: NFTData[]) => {
  let geojson = {
    type: "FeatureCollection",
    features: allNfts.map((nft) => {
      return {
        type: "Feature",
        properties: {
          id: Number(nft.id),
        },
        geometry: {
          type: "Point",
          coordinates: nft.coordinates,
        },
      };
    }),
  };
  console.log("GeoJSON build complete");
  return geojson;
};

export async function getTokenAccount(id: number) {
  let tokenAccount;
  const contract = await getContract();
  try {
    if (contract) {
      tokenAccount = await contract.tokenAccount(id);
      console.log("Token account has been gotten");
    }
  } catch (err) {
    console.error("Couldn't get token account", err);
  }
  return tokenAccount;
}

export async function getTotalSupplyTemp(contract: ethers.Contract) {
  let totalSupply;
  try {
    if (contract) {
      totalSupply = await contract.totalSupply();
    }
  } catch (err) {
    console.error("Method Failed", err);
  }
  return totalSupply;
}

export async function safeMintNft(
  contract: ethers.Contract,
  tokenAccount: string
) {
  try {
    await contract.safeMint(tokenAccount);
  } catch (err) {
    console.error("safeMint failed:", err);
  }
}

export async function createContract(contractAddress: string, ABI: any) {
  let contractP;
  const provider = await getProviderReadOnly();
  if (provider !== undefined) {
    try {
      //const signer = await provider.getSigner();
      contractP = new Contract(contractAddress, ABI, provider);
    } catch (err) {
      console.error("Failed to create contract");
    }
  }
  return contractP;
}
