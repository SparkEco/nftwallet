"use client";

import { useEffect, useState } from "react";
import { useConnectWallet } from "@web3-onboard/react";
import { ethers } from "ethers";
import { DM_Sans } from "next/font/google";
import { useRouter } from "next/navigation";

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
});

interface ConnectWalletProps {
  className?: string;
}

export default function ConnectWallet({ className }: ConnectWalletProps) {
  const router = useRouter();
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [ethersProvider, setProvider] =
    useState<ethers.providers.Web3Provider | null>();

  useEffect(() => {
    // If the wallet has a provider than the wallet is connected
    if (wallet?.provider) {
      setProvider(new ethers.providers.Web3Provider(wallet.provider, "any"));
      setIsWalletConnected(true);
      // if using ethers v6 this is:
      // ethersProvider = new ethers.BrowserProvider(wallet.provider, 'any')
    }
  }, [wallet]);

  useEffect(() => {
    if (isWalletConnected) {
      router.push("/main");
    }
  }, [isWalletConnected]);

  return (
    <button
      className={`${dmSans.className} ${className} lg:h-[45px] h-[35px] items-center hover:bg-[#3D00B7] hover:text-white border-2 text-[#3D00B7] lg:text-[18px] text-[13px] border-[#3D00B7] rounded-[25px] lg:w-[200px] md:w-[200px] w-[120px] px-2 text-center`}
      disabled={connecting}
      onClick={() => connect()}
      suppressHydrationWarning
    >
      Connect Wallet
    </button>
  );
}
