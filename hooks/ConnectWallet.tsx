"use client";

import { useEffect, useState } from "react";
import { useConnectWallet } from "@web3-onboard/react";
import { ethers } from "ethers";
import { DM_Sans } from "next/font/google";

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
});

interface ConnectWalletProps {
  children: React.ReactNode;
}

export default function ConnectWallet() {
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();
  const [ethersProvider, setProvider] =
    useState<ethers.providers.Web3Provider | null>();

  useEffect(() => {
    // If the wallet has a provider than the wallet is connected
    if (wallet?.provider) {
      setProvider(new ethers.providers.Web3Provider(wallet.provider, "any"));
      // if using ethers v6 this is:
      // ethersProvider = new ethers.BrowserProvider(wallet.provider, 'any')
    }
  }, [wallet]);

  return (
    <button
      className={`${dmSans.className} lg:h-[40px] h-[29px] 
      flex justify-center items-center hover:bg-[#3D00B7] hover:text-white
        border-2 text-[#3D00B7] border-[#3D00B7] rounded-[25px] lg:p-3 p-1`}
      disabled={connecting}
      onClick={() => connect()}
    >
      Connect Wallet
    </button>
  );
}
