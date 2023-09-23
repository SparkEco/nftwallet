declare let window: any;
import ABI from "@/components/abi.json";
import Web3 from "web3";

export const detectProvider = () => {
  let provider;
  if (typeof window.ethereum !== "undefined") {
    provider = window.ethereum;
  } else if (window.web3) {
    provider = window.web3.currentProvider;
  } else alert("No ethereum provider");
  return provider;
};

export async function readFromSmartContract() {
  const currentProvider = detectProvider();
  let web3: Web3;
  web3 = new Web3(currentProvider);
  const contract = new web3.eth.Contract(
    ABI,
    "0xAF7FF053dF6a38F004DCfB964fAE4Bef6f479E6a"
  );
  const cc = await contract.methods.name().call();
  console.log(cc);
}
// let tokenName, tokenSymbol, tokenTotalSupply;
//   tokenName = await contract.methods.name().call();
//   console.log("Name: ", tokenName);

//   tokenSymbol = await contract.methods.symbol().call();
//   console.log("Symbol: ", tokenSymbol);

//   tokenTotalSupply = await contract.methods.totalSupply().call();
//   console.log("Total supply: ", tokenTotalSupply);
