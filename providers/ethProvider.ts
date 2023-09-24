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
