"use client";

import { Web3OnboardProvider, init } from "@web3-onboard/react";
import injectedModule from "@web3-onboard/injected-wallets";
import trezorModule from "@web3-onboard/trezor";
import walletConnectModule from "@web3-onboard/walletconnect";
import coinbaseModule from "@web3-onboard/coinbase";
import trustModule from "@web3-onboard/trust";
import Navbar from "@/components/Navbar";
import ledgerModule from "@web3-onboard/ledger";

const INFURA_KEY = "";
const wcV2InitOptions = {
  /**
   * Project ID associated with [WalletConnect account](https://cloud.walletconnect.com)
   */
  projectId: "abc123...",
  /**
   * Chains required to be supported by all wallets connecting to your DApp
   */
  requiredChains: [1, 56],
  /**
   * Defaults to `appMetadata.explore` that is supplied to the web3-onboard init
   * Strongly recommended to provide atleast one URL as it is required by some wallets (i.e. MetaMask)
   * To connect with WalletConnect
   */
  dappUrl: "http://YourAwesomeDapp.com",
};

const trezorOptions = {
  email: "test@test.com",
  appUrl: "https://www.blocknative.com",
};

const injected = injectedModule();
const coinbase = coinbaseModule();
const walletConnect = walletConnectModule(wcV2InitOptions);
const trust = trustModule();
const trezor = trezorModule(trezorOptions);
//const ledger = ledgerModule();

const wallets = [
  injected,
  walletConnect,
  trust,
  coinbase,
  //ledger,
  trezor,
];
const chains = [
  {
    id: "0xA",
    token: "OETH",
    label: "Optimism",
    rpcUrl: "https://mainnet.optimism.io",
  },
];

const appMetadata = {
  name: "Connect Wallet Example",
  icon: "<svg>My App Icon</svg>",
  description: "Example showcasing how to connect a wallet.",
  recommendedInjectedWallets: [
    { name: "MetaMask", url: "https://metamask.io" },
    { name: "Coinbase", url: "https://wallet.coinbase.com/" },
  ],
};

const web3Onboard = init({
  wallets,
  chains,
  appMetadata,
});

function WalletWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Web3OnboardProvider web3Onboard={web3Onboard}>
      <Navbar />
      <div className="mt-[40px]">{children}</div>
    </Web3OnboardProvider>
  );
}

export default WalletWrapper;
