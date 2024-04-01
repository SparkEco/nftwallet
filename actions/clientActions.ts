import {
  BrowserProvider,
  Contract,
  AlchemyProvider,
  ethers,
  Transaction,
} from "ethers";
import ABI from "@/ABIs/ABI.json";
import MarketplaceABI from "@/ABIs/marketplaceAbi.json";
import AndroidABI from "@/ABIs/AndroidsLovingAbi.json";
import { NFTData } from "@/redux/types";
import toast from "react-hot-toast";
import axios from "axios";

const cache: Record<string, any> = {};
let NFT_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_NFT_CONTRACT as string;
let MARKETPLACE_CONTRACT = process.env
  .NEXT_PUBLIC_MARKETPLACE_CONTRACT as string;
const getCachedValue: any = async <T>(
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

async function getProviderReadOnly() {
  const alchemyKey = process.env.NEXT_PUBLIC_ALCHEMY;
  const key = "providerReadOnly";
  return getCachedValue(key, async () => {
    let provider;
    try {
      provider = new AlchemyProvider("sepolia", alchemyKey);
      console.log("ReadOnly provider has been set");
    } catch (err) {
      console.error("Provider failed", err);
    }
    return provider;
  });
}

export async function getContract() {
  const key = "contract";
  return getCachedValue(key, async () => {
    let contract;
    try {
      const provider = await getProviderReadOnly();

      contract = new Contract(NFT_CONTRACT_ADDRESS, ABI, provider);
      console.log("Main Contract set ");
    } catch (err) {
      console.error("Process Failed", err);
    }
    return contract;
  });
}

export async function getOwnedTokens(provider: BrowserProvider) {
  const key = "ownednfts";
  // if (!window.ethereum.isConnected()) {
  //   try {
  //     await window.ethereum.request({ method: "eth_requestAccounts" });
  //   } catch (error) {
  //     console.error("Failed to connect wallet:", error);
  //   }
  // }
  return getCachedValue(key, async () => {
    const contract = await getContract();
    const owner = (await provider.getSigner()).address;
    let ownedNfts: NFTData[] = [];
    if (owner && contract) {
      try {
        // Get the IDs of the user's NFTs
        const ids = await getTokenOfOwnerByIndex(owner, contract);
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
        console.log("User's NFTs has been fetched");
      } catch (err) {
        console.error("Failed to get user's NFT");
      }
      return ownedNfts;
    }
  });
}

export async function getTokenOfOwnerByIndex(owner: string, contract: any) {
  let tokenIds = [];
  try {
    let balance = await contract.balanceOf(owner);
    for (let i = 0; i < balance; i++) {
      let tokenId = await contract.tokenOfOwnerByIndex(owner, i);
      tokenIds.push(tokenId);
    }
    console.log("Token of Owner fetched");
  } catch (err) {
    console.error("Couldn't fetch the tokenIds", err);
  }
  return tokenIds;
}

export async function getAndContract() {
  const key = "androidContract";
  return getCachedValue(key, async () => {
    let contract;
    try {
      const contractAddress = "0xdb4d99fece09326d2cabdef29ab8be41eeab771a";
      const provider = await getProviderReadOnly();
      contract = new Contract(contractAddress, AndroidABI, provider);
    } catch (err) {
      console.error("Get contract failed", err);
    }
    return contract;
  });
}

export async function getAndContractWrite(provider: BrowserProvider) {
  const key = "androidContractWrite";
  return getCachedValue(key, async () => {
    let contract;
    try {
      const contractAddress = "0xdb4d99fece09326d2cabdef29ab8be41eeab771a";
      const signer = await provider.getSigner();
      contract = new Contract(contractAddress, AndroidABI, signer);
    } catch (err) {
      console.error("Get contract failed", err);
    }
    return contract;
  });
}

export async function isOwnerOf(
  id: number,
  provider: BrowserProvider,
  address: `0x${string}`
) {
  const contract = await getContract();
  let res;

  try {
    const ownerOf = await contract.ownerOf(id);
    if (ownerOf === address) {
      res = true;
    } else res = false;
  } catch (err) {
    res = false;
    console.error("Check isOwner failed", err);
  }
  return res;
}

export async function getAttributes(owner: any) {
  let tokens: string[] = [];
  const contract = await getAndContract();
  try {
    const ids = await getTokenOfOwnerByIndex(owner, contract as Contract);
    await Promise.all(
      ids.map(async (id) => {
        if (contract) {
          const tokenURI = await contract.tokenURI(id);
          if (typeof tokenURI === "string") {
            tokens.push(tokenURI);
          }
        }
      })
    );
    console.log("Attributes have been fetched");
  } catch (err) {
    console.error("Fetch attributes Operation failed", err);
  }
  return tokens;
}

export async function getAccount(provider: BrowserProvider) {
  const key = "account";
  return getCachedValue(key, async () => {
    let account;

    try {
      if (provider instanceof BrowserProvider) {
        const signer = await provider.getSigner();
        account = await signer.getAddress();
        console.log("Got user account");
      }
    } catch (err) {
      console.error("Process Failed", err);
    }
    return account;
  });
}

export async function mintNft(hash: string, provider: BrowserProvider) {
  try {
    const address = await getAccount(provider);
    const chainID = (await provider.getNetwork()).chainId;
    const netId = BigInt(11155111);
    if (provider) {
      // if (chainID !== netId) {
      //   try {
      //     await provider.send("wallet_switchEthereumChain", [
      //       { chainId: "0x5" },
      //     ]);
      //   } catch (switchError) {
      //     console.error("Network switch error", switchError);
      //     return null;
      //   }
      // }
      const signer = await provider.getSigner();

      const contract = new Contract(NFT_CONTRACT_ADDRESS, ABI, signer);

      if (contract) {
        await contract.safeMint(address, hash);
      }
    } else {
      console.error("Provider not set properly");
    }
  } catch (err) {
    console.error("Method Failed", err);
  }
}

export async function purchaseListing(
  amount: any,
  index: number,
  provider: BrowserProvider
) {
  try {
    if (provider) {
      const signer = await provider.getSigner();
      const contract = new Contract(
        MARKETPLACE_CONTRACT,
        MarketplaceABI,
        signer
      );
      if (contract) {
        await contract.purchaseListing(index, {
          value: amount,
        });
      } else console.error("failed to get contract");
    } else console.error("failed to get provider");
  } catch (err) {
    console.error("Purchase Failed:", err);
  }
}

export async function createListing(
  tokenId: number,
  price: any,
  provider: BrowserProvider
) {
  if (!provider) {
    console.error("Provider is undefined");
    return;
  }
  let signer = await provider.getSigner();
  let marketplaceContract = new Contract(
    MARKETPLACE_CONTRACT,
    MarketplaceABI,
    signer
  );
  let mainContract = new Contract(NFT_CONTRACT_ADDRESS, ABI, signer);
  // Approve nft
  try {
    await mainContract.approve(MARKETPLACE_CONTRACT, tokenId);
    let tx = await marketplaceContract.createListing(
      tokenId,
      ethers.parseUnits(`${price}`, "ether")
      // {
      //   value: ethers.parseUnits("10000000000", "wei"),
      // }
    );
    let receipt = await provider.waitForTransaction(tx.hash);
    if (receipt?.status === 1) {
      toast.success("ImpactCert Listed", {
        duration: 5000,
        position: "top-center",
        style: {
          width: "230px",
          height: "60px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        },
      });
      window.location.reload();
    } else {
      throw new Error("Listing tx failed");
    }
  } catch (err) {
    // console.error("Nft listing failed", err);
    toast.error("Listing Failed", {
      duration: 5000,
      position: "top-center",
      style: {
        width: "230px",
        height: "60px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
    });
  }
}

export async function updateListingPrice(
  index: number,
  price: any,
  provider: BrowserProvider
) {
  if (!provider) {
    console.error("Provider is undefined");
    return;
  }
  let signer = await provider.getSigner();
  let marketplaceContract = new Contract(
    MARKETPLACE_CONTRACT,
    MarketplaceABI,
    signer
  );
  try {
    await marketplaceContract.updateListingPrice(
      index,
      ethers.parseUnits(`${price}`, "ether")
    );
    toast.success("Listing Updated", {
      duration: 5000,
      position: "top-center",
      style: {
        width: "230px",
        height: "60px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
    });
  } catch (err) {
    console.error("Failed to update listing:", err);
    toast.error("Update Failed", {
      duration: 5000,
      position: "top-center",
      style: {
        width: "230px",
        height: "60px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
    });
  }
}

export async function delist(index: number, provider: BrowserProvider) {
  if (!provider) {
    console.error("Provider is undefined");
    return;
  }
  let signer = await provider.getSigner();
  let marketplaceContract = new Contract(
    MARKETPLACE_CONTRACT,
    MarketplaceABI,
    signer
  );
  try {
    await marketplaceContract.removeListing(index);
  } catch (err) {
    console.error("failed to delist", err);
  }
}

export async function burn(id: number, provider: BrowserProvider) {
  if (!provider) {
    console.error("Failed to get provider");
  }
  const signer = await provider.getSigner();
  let contract = new Contract(NFT_CONTRACT_ADDRESS, ABI, signer);
  try {
    await contract.burn(id);
  } catch (err) {
    console.error("Token burn failed:", err);
  }
}

export async function withdrawRevenue(provider: BrowserProvider) {
  if (!provider) {
    console.error("Provider is undefined");
    return;
  }
  let signer = await provider.getSigner();
  let marketplaceContract = new Contract(
    MARKETPLACE_CONTRACT,
    MarketplaceABI,
    signer
  );
  try {
    await marketplaceContract.withdrawRevenue();
    toast.success("Withdrawal Successful", {
      duration: 5000,
      position: "top-center",
      style: {
        width: "230px",
        height: "60px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
    });
  } catch (err) {
    console.error("Failed to withdraw tokens:", err);
    toast.error("Withdrawal Failed", {
      duration: 5000,
      position: "top-center",
      style: {
        width: "230px",
        height: "60px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
    });
  }
}

export const getTokens = async (queryData: any[]) => {
  const allNfts: NFTData[] = [];
  try {
    const promises = queryData.map(async (item) => {
      const [attributesRes, ipfsRes] = await Promise.all([
        getAttributes(item.tokenAccount),
        axios.get(item.ipfsUri),
      ]);
      const nft: NFTData = {
        id: Number(item.tokenId),
        attributes: attributesRes,
        name: ipfsRes.data.name,
        index: item.tokenId,
        coordinates: ipfsRes.data.coordinates,
        coverImage: ipfsRes.data.nftcover,
        projectImages: ipfsRes.data.projectimages,
        image: ipfsRes.data.image,
        ipfsUri: item.ipfsUri,
        tokenAccount: item.tokenAccount,
        description: ipfsRes.data.description,
        isListing: item.isListed,
        owner: item.listing.owner,
        price: item.listing.price,
      };
      allNfts.push(nft);
    });
    await Promise.all(promises);
  } catch (err) {
    console.error(err);
  }
  return allNfts;
};

export const getListed = async (queryData: any[]) => {
  const allNfts: NFTData[] = [];
  try {
    const promises = queryData.map(async (item) => {
      const [attributesRes, ipfsRes] = await Promise.all([
        getAttributes(item.tokenAccount),
        axios.get(item.ipfsUri),
      ]);
      const nft: NFTData = {
        id: Number(item.tokenId),
        attributes: attributesRes,
        name: ipfsRes.data.name,
        index: item.tokenId,
        coordinates: ipfsRes.data.coordinates,
        coverImage: ipfsRes.data.nftcover,
        projectImages: ipfsRes.data.projectimages,
        image: ipfsRes.data.image,
        ipfsUri: item.ipfsUri,
        tokenAccount: item.tokenAccount,
        description: ipfsRes.data.description,
        isListing: item.isListed,
      };
      allNfts.push(nft);
    });
    await Promise.all(promises);
  } catch (err) {
    console.error(err);
  }
  return allNfts;
};
