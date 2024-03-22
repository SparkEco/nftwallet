"use client";

import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { createWeb3Modal, defaultConfig } from "@web3modal/ethers/react";
import { mainnet, optimism, sepolia, polygon } from "viem/chains";

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID as string;
const metadata = {
  name: "Impact Explorer",
  description: "An Impactscribe product",
  url: "https://impact-explorer.vercel.app",
  icons: ["https://avatars.mywebsite.com/"],
};

createWeb3Modal({
  ethersConfig: defaultConfig({
    metadata,
    defaultChainId: sepolia.id,
    enableEIP6963: true,
    enableInjected: true,
    enableCoinbase: true,
    rpcUrl: sepolia.rpcUrls.default as any,
  }),
  chains: [
    {
      ...sepolia,
      rpcUrl: sepolia.rpcUrls.default.http[0],
      explorerUrl: sepolia.blockExplorers.default.url,
      chainId: sepolia.id,
      currency: sepolia.nativeCurrency.symbol,
    },
    {
      ...optimism,
      rpcUrl: optimism.rpcUrls.default.http[0],
      explorerUrl: optimism.blockExplorers.default.url,
      chainId: optimism.id,
      currency: optimism.nativeCurrency.symbol,
    },

    {
      ...mainnet,
      rpcUrl: mainnet.rpcUrls.default.http[0],
      explorerUrl: mainnet.blockExplorers.default.url,
      chainId: mainnet.id,
      currency: mainnet.nativeCurrency.symbol,
    },
    {
      ...polygon,
      rpcUrl: polygon.rpcUrls.default.http[0],
      explorerUrl: polygon.blockExplorers.default.url,
      chainId: polygon.id,
      currency: polygon.nativeCurrency.symbol,
    },
  ],
  projectId,
  themeMode: "dark",

  themeVariables: {
    "--w3m-accent": "#3D00B7",
    "--w3m-font-size-master": "18",
  },
});

function WalletProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <div>{children}</div>
    </Provider>
  );
}

export default WalletProvider;
