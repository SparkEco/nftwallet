import Web3 from "web3";
import ABI from "@/components/abi.json";
declare let window: any;

export const detectProvider = () => {
  if (typeof window === "undefined") {
    throw new Error("Server currently running");
  }
  let provider;
  if (window.ethereum && typeof window.ethereum === "object") {
    provider = window.ethereum;
  } else if (window.web3 && typeof window.web3.currentProvider === "object") {
    provider = window.web3.currentProvider;
  } else {
    throw new Error("No Ethereum provider found");
  }
  return provider;
};

export const getAccount = async (): Promise<string> => {
  let web3 = new Web3(detectProvider());
  const account = await web3.eth.getAccounts();
  const firstAcc = account[0];
  return firstAcc;
};

//Get contract
export const getContract = () => {
  let web3 = new Web3(detectProvider());
  const contract = new web3.eth.Contract(
    ABI as any,
    "0xEf466CBe76ce09Bb45ce7b25556E9b8BFD784001"
  );
  return contract;
};

export async function getTotalSupply(): Promise<number | undefined> {
  let TS: number | undefined;
  const contract = getContract();
  try {
    TS = await contract.methods.totalSupply().call();
  } catch (err) {
    console.error("Can't get total supply:", err);
    TS = undefined;
  }
  return TS;
}
export async function getNextId() {
  let nextid: number | undefined;
  const contract = getContract();
  try {
    nextid = await contract.methods.nextTokenId().call();
  } catch (err) {
    console.error("Can't get next id:", err);
    nextid = undefined;
  }
  return nextid;
}

export async function getBalance(): Promise<number | undefined> {
  let balance: number | undefined;
  const contract = getContract();
  const account = await getAccount();
  try {
    //@ts-ignore
    balance = await contract.methods.balanceOf(account).call();
  } catch (err) {
    console.error("Can't fetch balance", err);
    balance = undefined;
  }
  return balance;
}

export async function getName(): Promise<string> {
  let name: string;
  const contract = getContract();
  try {
    name = await contract.methods.name().call();
  } catch (err) {
    console.error("Can't fetch name", err);
    name = "";
  }
  return name;
}

export async function getTokenOfOwnerByIndex(
  owner: string,
  index: number
): Promise<number | undefined> {
  let id: number | undefined;
  const contract = getContract();
  try {
    //@ts-ignore
    id = await contract.methods.tokenOfOwnerByIndex(owner, index).call();
  } catch (err) {
    console.error("Can't fetch ID", err);
    id = undefined;
  }
  return id;
}
export async function getTokenByIndex(
  index: number
): Promise<number | undefined> {
  let id: number | undefined;
  const contract = getContract();
  try {
    //@ts-ignore
    id = await contract.methods.tokenByIndex(index).call();
  } catch (err) {
    console.error("Can't fetch ID", err);
    id = undefined;
  }
  return id;
}

export const getAllOwned = async () => {
  const ids = [];
  try {
    const owner = await getAccount();
    const balance = await getBalance();
    const tempBal = balance as number;
    for (let i = 0; i < tempBal; i++) {
      let id = await getTokenOfOwnerByIndex(owner, i);
      ids.push(id);
    }
  } catch (err) {
    console.error("Operation failed", err);
  }
  return ids as number[];
};
export const getAll = async () => {
  const ids = [];
  try {
    const owner = await getAccount();
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

export async function mintNft(hash: string) {
  let res;
  try {
    const owner = await getAccount();
    const contract = getContract();
    res = await contract.methods
      //@ts-ignore
      .safeMint(owner, hash)
      .send({ from: owner });
  } catch (err) {
    console.error("Operation failed", err);
  }
  alert(res);
  return res;
}

export async function getTokenURI() {
  let tokens: string[] = [];
  const contract = getContract();
  try {
    const ids = await getAll();

    await Promise.all(
      ids.map(async (id, index) => {
        //@ts-ignore
        const tokenURI = await contract.methods.tokenURI(id).call();
        if (typeof tokenURI === "string") {
          tokens.push(tokenURI);
        }
      })
    );
  } catch (err) {
    console.error("Operation failed", err);
  }
  return tokens;
}

export async function isEthWalletConnected() {
  if (typeof window.ethereum !== "undefined") {
    try {
      // Request access to the user's accounts
      await window.ethereum.request({ method: "eth_requestAccounts" });

      // If the user grants access, an account is connected
      return true;
    } catch (error) {
      // User denied access or there was an error
      return false;
    }
  } else {
    // No Ethereum provider detected
    return false;
  }
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
  //console.log(nfts);
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
