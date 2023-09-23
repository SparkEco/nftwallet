"use client";

declare let window: any;

export const detectProvider = () => {
  let provider;
  if (typeof window.ethereum !== "undefined") {
    provider = window.ethereum;
  } else if (window.web3) {
    provider = window.web3.currentProvider;
  } else alert("No ethereum provider");
  return provider;
};
