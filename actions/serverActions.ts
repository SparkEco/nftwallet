"use server";

import { ethers, Contract, AlchemyProvider } from "ethers";
import { NFTData } from "@/redux/types";
import { getAllListing } from "./marketplace";
import MAbi from "@/ABIs/marketplaceAbi.json";
import {
  getAttributes,
  getContract,
  getTokenOfOwnerByIndex,
} from "./clientActions";
import axios from "axios";

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
  const allNfts: NFTData[] = [];
  try {
    const listings = await getAllListing();
    const data = [...listings].map((item, index) => {
      return {
        index: index,
        id: item[0],
        price: item[1],
        owner: item[2],
      };
    });

    const nftPromise = data.map(async (item) => {
      const contract = await getContract();
      if (contract) {
        try {
          let tokenURI = await contract.tokenURI(item.id);
          let tokenAccount = await contract.tokenAccount(item.id);
          let attributes = await getAttributes(tokenAccount);
          let res = await fetch(tokenURI);
          let data = await res.json();
          let nft: NFTData = {
            id: Number(item.id),
            attributes: attributes,
            name: data.name,
            index: item.index,
            coordinates: data.coordinates,
            coverImage: data.nftcover,
            projectImages: data.projectimages,
            image: data.image,
            ipfsUri: tokenURI,
            tokenAccount: tokenAccount,
            description: data.description,
            isListing: true,
            owner: item.owner,
            price: Number(item.price),
          };
          allNfts.push(nft);
        } catch (err) {
          console.error("Failed to get listings:", err);
        }
      }
    });
    await Promise.all(nftPromise);
    console.log("Got all listed nfts");
  } catch (err) {
    console.error("Failed to retrieve data:", err);
  }
  return allNfts;
};

export async function getTokensByParams(issuer: string) {
  const contract = await getContract();
  let ownedNfts: NFTData[] = [];
  if (issuer && contract) {
    try {
      // Get the IDs of the user's NFTs
      const ids = await getTokenOfOwnerByIndex(issuer, contract);
      // Create a function to fetch the data for a single NFT
      const fetchNFTData = async (id: number, index: number) => {
        let tokenURI = await contract.tokenURI(id);
        let tokenAccount = await contract.tokenAccount(id);
        let attributes = await getAttributes(tokenAccount);
        let res = await fetch(tokenURI);
        let data = await res.json();
        let nft: NFTData = {
          id: Number(id),
          attributes: attributes,
          name: data.name,
          index: index,
          coordinates: data.coordinates,
          coverImage: data.nftcover,
          projectImages: data.projectimages,
          image: data.image,
          ipfsUri: tokenURI,
          tokenAccount: tokenAccount,
          description: data.description,
          isListing: false,
        };
        return nft;
      };

      // Fetch the data for all of the user's NFTs
      const ownedTokenPromises = ids.map(fetchNFTData);
      ownedNfts = await Promise.all(ownedTokenPromises);
    } catch (err) {
      console.error("Failed to get NFT's");
    }
    return ownedNfts;
  }
}

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
export const getGeojson2 = async (allNfts: any[]) => {
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

export async function revenueOf(owner: string) {
  let revenue: number;
  try {
    const provider = await getProviderReadOnly();
    if (!provider) {
      console.error("Failed to get provider");
      return undefined;
    }
    const contract = new Contract(
      "0x4b9e1520D6AD44C57d4e3B3B647ecCF46dA6e9d3",
      MAbi,
      provider
    );
    revenue = await contract.revenueOf(owner);
    return revenue;
  } catch (err) {
    console.error("Failed to fetch available revenue:", err);
    return undefined;
  }
}

export const getTokens = async (queryData: any) => {
  // console.log("queryData:", queryData);
  const allNfts: NFTData[] = [];
  try {
    await Promise.all(
      [...queryData].map(async (item) => {
        const attributes = await getAttributes(item.tokenAccount);
        const res = await axios.get(item.ipfsUri);
        const data = res.data;
        const nft: NFTData = {
          id: Number(item.tokenId),
          attributes: attributes,
          name: data.name,
          index: item.tokenId,
          coordinates: data.coordinates,
          coverImage: data.nftcover,
          projectImages: data.projectimages,
          image: data.image,
          ipfsUri: item.ipfsUri,
          tokenAccount: item.tokenAccount,
          description: data.description,
          isListing: item.isListed,
          owner: item.listing.owner,
          price: item.listing.price,
        };
        allNfts.push(nft);
      })
    );
    return allNfts;
  } catch (err) {
    console.error(err);
  }
};
