import { ethers } from "ethers";
import { Contract, BrowserProvider } from "ethers";
import ABI from "@/components/ABI.json";
declare let window: any;

export async function getProvider() {
  let provider;
  provider = new ethers.BrowserProvider(window.ethereum);
  const chainID = (await provider.getNetwork()).chainId;
  const goerliID = BigInt("0x5");
  if (chainID !== goerliID) {
    await provider.send("wallet_switchEthereumChain", [{ chainId: "0x5" }]);
  }
  return provider;
}

export async function getAccount() {
  let account;
  const provider = await getProvider();
  try {
    if (provider instanceof BrowserProvider) {
      const signer = await provider.getSigner();
      account = await signer.getAddress();
    }
  } catch (err) {
    console.log("Process Failed", err);
  }
  return account;
}

export async function getContract() {
  let contract;
  try {
    const provider = await getProvider();
    const contractAddress = "0xEf466CBe76ce09Bb45ce7b25556E9b8BFD784001";
    contract = new Contract(contractAddress, ABI, provider);
  } catch (err) {
    console.log("Process Failed", err);
  }
  return contract;
}

export async function getTotalSupply() {
  let totalSupply;
  try {
    const provider = await getProvider();
    const contract = await getContract();
    if (contract) {
      totalSupply = await contract.totalSupply();
    }
  } catch (err) {
    console.error("Method Failed", err);
  }
  return totalSupply;
}

export async function mintNft(hash: string) {
  let response;
  try {
    const address = await getAccount();
    const provider = await getProvider();
    //@ts-ignore
    const signer = await provider.getSigner();
    const contractAddress = "0xEf466CBe76ce09Bb45ce7b25556E9b8BFD784001";
    const contract = new Contract(contractAddress, ABI, signer);
    if (contract) {
      response = await contract.safeMint(address, hash);
    }
  } catch (err) {
    console.error("Method Failed", err);
  }

  return response;
}

export async function getNextId() {
  let nextId;
  try {
    const contract = await getContract();
    if (contract) {
      nextId = await contract.nextTokenId();
    }
  } catch (err) {
    console.error("Operatipn Failed", err);
  }
  return nextId;
}

export async function getTokenByIndex(index: number) {
  let id;
  try {
    const contract = await getContract();
    if (contract) {
      id = await contract.tokenByIndex(index);
    }
  } catch (err) {
    console.error("Can't fetch ID", err);
  }
  return id;
}

export const getAll = async () => {
  const ids = [];
  try {
    const totalSupply = await getTotalSupply();
    const supply = totalSupply as number;
    for (let i = 0; i < supply; i++) {
      let id = await getTokenByIndex(i);
      ids.push(id);
    }
  } catch (err) {
    console.error("Operation failed", err);
  }
  return ids as number[];
};

export async function getTokenURI() {
  let tokens: string[] = [];
  const contract = await getContract();
  try {
    const ids = await getAll();

    await Promise.all(
      ids.map(async (id, index) => {
        if (contract) {
          const tokenURI = await contract.tokenURI(id);
          if (typeof tokenURI === "string") {
            tokens.push(tokenURI);
          }
        }
      })
    );
  } catch (err) {
    console.error("Operation failed", err);
  }
  return tokens;
}

export async function getNftData() {
  const nfts: any[] = [];
  try {
    const uris = await getTokenURI();
    await Promise.all(
      uris.map(async (url) => {
        const res = await fetch(url);
        const data = await res.json();
        nfts.push(data);
      })
    );

    console.log("Operation Successful");
  } catch (err) {
    console.error("Operation Failed", err);
  }

  return nfts;
}

export const getGeojson = async () => {
  const allNfts = await getNftData();

  const geojson = {
    type: "FeatureCollection",
    features: allNfts.map((nft) => {
      return {
        type: "Feature",
        properties: {
          id: nft.id,
        },
        geometry: {
          type: "Point",
          coordinates: nft.coordinates,
        },
      };
    }),
  };

  return geojson;
};
