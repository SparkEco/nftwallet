"use client";
import { createWeb3Modal, defaultConfig } from "@web3modal/ethers/react";
const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT as string;
const metadata = {
  name: "Impact Explorer",
  description: "An Impactscribe product",
  url: "https://impact-explorer.vercel.app",
  icons: ["https://avatars.mywebsite.com/"],
};
const base = {
  name: "Base Mainnet",
  rpcUrl: "https://mainnet.base.org/",
  explorerUrl: "https://basescan.org/",
  chainId: 8453,
  currency: "ETH",
};
const sepolia = {
  name: "Sepolia",
  rpcUrl: "https://eth-sepolia.g.alchemy.com/v2/demo",
  explorerUrl: "https://sepolia.etherscan.io",
  chainId: 11155111,
  currency: "ETH",
};
const ethersConfig = defaultConfig({
  /*Required*/
  metadata,
  /*Optional*/
  enableEIP6963: true, // true by default
  enableInjected: true, // true by default
  enableCoinbase: true, // true by default
  rpcUrl: "...", // used for the Coinbase SDK
  defaultChainId: 1, // used for the Coinbase SDK
});

createWeb3Modal({
  ethersConfig,
  chains: [base, sepolia],
  projectId,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
  enableOnramp: true, // Optional - false as default
  themeVariables: {
    "--w3m-font-size-master": "15",
  },
});

function Web3Modal({ children }: { children: React.ReactNode }) {
  return children;
}

export default Web3Modal;
