import { ethers } from "ethers";
import { BrowserProvider, Contract } from "ethers";
import ABI from "@/components/ABI.json";
declare let window: any;

export async function getProvider() {
  let signer = null;
  let provider;
  if (window.ethereum == null) {
    console.log("MetaMask not installed; using read-only defaults");
    provider = ethers.getDefaultProvider("goerli");
  } else {
    provider = new ethers.BrowserProvider(window.ethereum);
  }
  return provider;
}

export async function getAccount() {
  let account;
  try {
    const provider = await getProvider();
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
    const provider = await getProvider();
    const address = await getAccount();
    //@ts-ignore
    const signer = await provider.getSigner();
    const contractAddress = "0xEf466CBe76ce09Bb45ce7b25556E9b8BFD784001";
    const contract = new Contract(contractAddress, ABI, signer);
    if (contract) {
      response = await contract.safeMint(address, hash);
    }
    alert(response);
  } catch (err) {
    console.error("Method Failed", err);
  }

  return response;
}
