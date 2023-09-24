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
export const getContract = () => {
  let web3 = new Web3(detectProvider());
  const contract = new web3.eth.Contract(
    ABI,
    "0xAF7FF053dF6a38F004DCfB964fAE4Bef6f479E6a"
  );
  return contract;
};
