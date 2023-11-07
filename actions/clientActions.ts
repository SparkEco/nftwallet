import { BrowserProvider, Contract, AlchemyProvider } from "ethers";
import ABI from "@/ABIs/ABI.json";
import MarketplaceABI from "@/ABIs/marketplaceAbi.json";
import AndroidABI from "@/ABIs/AndroidsLovingAbi.json";
import { NFTData } from "@/redux/types";

declare let window: any;

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

export async function getProvider() {
  const key = "provider";
  return getCachedValue(key, async () => {
    let provider;
    let chainID;
    try {
      if (window.ethereum !== undefined && window.ethereum.isConnected()) {
        provider = new BrowserProvider(window.ethereum);
        chainID = (await provider.getNetwork()).chainId;
        console.log("Provider has been set");
        const goerliID = BigInt("0x5");
        if (chainID !== goerliID) {
          await provider.send("wallet_switchEthereumChain", [
            { chainId: "0x5" },
          ]);
        }
      }
    } catch (err) {
      console.error("Provider failed", err);
    }
    return { provider, chainID };
  });
}

async function getProviderReadOnly() {
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

export async function getContract() {
  const key = "contract";
  return getCachedValue(key, async () => {
    let contract;
    try {
      const provider = await getProviderReadOnly();
      const contractAddress = "0x4bB0a205fceD93c8834b379c461B07BBe6aAE622";
      contract = new Contract(contractAddress, ABI, provider);
      console.log("Main Contract set ");
    } catch (err) {
      console.error("Process Failed", err);
    }
    return contract;
  });
}

export async function getOwnedTokens() {
  const key = "ownednfts";
  if (!window.ethereum.isConnected()) {
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
    } catch (error) {
      console.error("Failed to connect wallet:", error);
    }
  }
  return getCachedValue(key, async () => {
    const contract = await getContract();
    const owner = await getAccount();
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

export async function getAndContractWrite() {
  const key = "androidContractWrite";
  return getCachedValue(key, async () => {
    let contract;
    try {
      const contractAddress = "0xdb4d99fece09326d2cabdef29ab8be41eeab771a";
      const { provider } = await getProvider();
      const signer = await provider?.getSigner();
      contract = new Contract(contractAddress, AndroidABI, signer);
    } catch (err) {
      console.error("Get contract failed", err);
    }
    return contract;
  });
}

export async function isOwnerOf(id: number) {
  const contract = await getContract();
  const account = await getAccount();
  try {
    const ownerOf = await contract?.ownerOf(id);
    if (ownerOf == account) return true;
    else return false;
  } catch (err) {
    console.error("Check isOwner failed", err);
  }
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

export async function getAccount() {
  const key = "account";
  return getCachedValue(key, async () => {
    let account;
    const { provider } = await getProvider();
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

export async function mintNft(hash: string) {
  try {
    const address = await getAccount();
    const { provider, chainID } = await getProvider();
    const goerliID = BigInt("0x5");
    if (provider) {
      if (chainID !== goerliID) {
        try {
          await provider.send("wallet_switchEthereumChain", [
            { chainId: "0x5" },
          ]);
        } catch (switchError) {
          console.error("Network switch error", switchError);
          return null;
        }
      }
      const signer = await provider.getSigner();
      const contractAddress = "0x4bB0a205fceD93c8834b379c461B07BBe6aAE622";
      const contract = new Contract(contractAddress, ABI, signer);

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

export async function purchaseListing(amount: any, index: number) {
  let contractAddress = "0xB594Cdeb1b46254A11Fc69d25D1a726aEbf9642c";
  try {
    const { provider } = await getProvider();
    if (provider) {
      const signer = await provider.getSigner();
      const contract = new Contract(contractAddress, MarketplaceABI, signer);
      if (contract) {
        await contract.purchaseListing(amount, index);
      } else console.error("failed to get contract");
    } else console.error("failed to get provider");
  } catch (err) {
    console.error("Purchase Failed:", err);
  }
}


