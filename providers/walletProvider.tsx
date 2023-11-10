"use client";

import { createWeb3Modal } from "@web3modal/wagmi/react";
import { walletConnectProvider, EIP6963Connector } from "@web3modal/wagmi";
import { WagmiConfig, configureChains, createConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { goerli } from "viem/chains";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { InjectedConnector } from "wagmi/connectors/injected";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

// 1. Get projectId
const projectId = process.env.NEXT_PUBLIC_PROJECT_ID as string;

// 2. Create wagmiConfig
const { chains, publicClient } = configureChains(
  [goerli],
  [walletConnectProvider({ projectId }), publicProvider()]
);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: [
    new WalletConnectConnector({
      chains,
      options: { projectId, showQrModal: false },
    }),
    new EIP6963Connector({ chains }),
    new InjectedConnector({ chains, options: { shimDisconnect: true } }),
    new CoinbaseWalletConnector({
      chains,
      options: { appName: "Impact Explorer" },
    }),
  ],
  publicClient,
});

// 3. Create modal
createWeb3Modal({ wagmiConfig, projectId, chains });

function WalletProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <WagmiConfig config={wagmiConfig}>
        <Provider store={store}>
          <div className="mt-[40px]">{children}</div>
        </Provider>
      </WagmiConfig>
    </>
  );
}
export default WalletProvider;
