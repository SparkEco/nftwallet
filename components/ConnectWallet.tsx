"use client";

import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";
import { FaWallet } from "react-icons/fa";
import { useAppContext } from "@/context/AppContext";
import { getProvider } from "@/actions/actions";

interface ConnectWalletProps {
  className?: string;
}

export default function ConnectWallet({ className }: ConnectWalletProps) {
  const { setAccount, setIsConnected } = useAppContext();

  const router = useRouter();
  const { open, close } = useWeb3Modal();
  const { address, isConnecting, isDisconnected, isConnected, status } =
    useAccount();

  const buttonRef = useRef(null);
  const [innerText, setInnerText] = useState(
    <div className={`flex items-center space-x-1 mx-auto`}>
      <p>Connect</p>
      <FaWallet size={20} color={`#ffffff`} />
    </div>
  );
  const ifconn =
    "truncate text-white bg-[#3D00B7] lg:text-[14px] text-[13px] h-[35px] lg:w-[133px] md:w-[127px] w-[120px] px-4 lg:px-4";
  const ifnotconn =
    "lg:h-[35px] h-[35px] active:opacity-75 bg-[#3D00B7] text-white lg:text-[18px] md:text-[15px] text-[13px] border lg:w-[130px] md:w-[150px] w-[120px] px-2";
  const [btnClass, setBtnClass] = useState(ifnotconn);
  const [copyShow, setCopyShow] = useState(false);

  const handleCopyClick = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(address as string).then(() => {
        // Text successfully copied to the clipboard
        console.log("Address copied to clipboard");
      });
    }
  };

  const handleClick = async () => {
    if (!isConnected) {
      await open();
    }
  };

  useEffect(() => {
    if (isConnected) {
      getProvider()
        .then(() => {
          console.log("provider has been set");
        })
        .catch((err) => console.error("Error setting provider", err));
      setBtnClass(ifconn);
      setCopyShow(true);
      setAccount(address);

      setIsConnected(isConnected);
    } else setIsConnected(isConnected);
  }, [isConnected]);

  return (
    <div className={`relative`}>
      <button
        className={`${btnClass} rounded-[12px] justify-center items-center text-center border-2 ${className}`}
        onClick={() => handleClick()}
      >
        {innerText}
      </button>
    </div>
  );
}
