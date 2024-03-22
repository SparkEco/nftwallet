"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { custom, createWalletClient } from "viem";
import { sepolia } from "viem/chains";
import { useWeb3ModalProvider } from "@web3modal/ethers/react";
import { Eip1193Provider } from "ethers";

function NetworkChecker({ id }: { id: number }) {
  const { walletProvider } = useWeb3ModalProvider();
  const walletClient = useMemo(() => {
    createWalletClient({
      chain: sepolia,
      transport: custom(walletProvider as Eip1193Provider),
    });
  }, [walletProvider]);
  const [show, setShow] = useState("hidden");
  if (id === sepolia.id) {
    return (
      <button
        onMouseLeave={() => setShow("hidden")}
        onMouseEnter={() => setShow("block")}
        className={`flex w-fit px-[6px] py-[2px] absolute bg-green-300 shadow top-[30px] left-[20px] rounded-[12px] justify-center space-x-[2px] items-center h-[35px]`}
      >
        <Image
          src={`/icons/eth-diamond-black.a042df77.png`}
          alt="ETH logo"
          width={18}
          height={23}
          className={`w-[18px] h-[23px]`}
        />
        <p className={`text-white/90 ${show} text-[17px]`}>Sepolia</p>
      </button>
    );
  } else {
    return (
      <button
        className={`flex w-fit px-[4px] rounded-lg absolute top-[30px] left-[20px] justify-center items-center h-[35px] bg-red-600 text-white`}
      >
        Wrong Network
      </button>
    );
  }
}
export default NetworkChecker;
