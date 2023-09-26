"use client";

import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";
import { BiSolidCopy } from "react-icons/bi";
import { useAppContext } from "@/context/AppContext";

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
  const [innerText, setInnerText] = useState("Connect Wallet");
  const ifconn =
    "truncate text-white bg-[#3D00B7] lg:text-[14px] text-[13px] h-[35px] lg:w-[133px] md:w-[127px] w-[120px] px-4 lg:px-4";
  const ifnotconn =
    "lg:h-[45px] h-[35px] active:opacity-75 hover:bg-[#3D00B7] hover:text-white text-[#3D00B7] lg:text-[18px] md:text-[15px] text-[13px] border-[#3D00B7] lg:w-[200px] md:w-[150px] w-[120px] px-2";
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

  const handleClick = () => {
    if (!isConnected) {
      open()
        .then(() => {
          router.push("/main");
          console.log("Redirecting");
        })
        .catch((err) => {
          console.error(err);
        });
    }

    return;
  };

  useEffect(() => {
    if (isConnected) {
      setInnerText(address as string);
      setBtnClass(ifconn);
      setCopyShow(true);
      setAccount(address);
      setIsConnected(isConnected);
    } else setIsConnected(isConnected);
    return;
  }, [isConnected]);

  return (
    <div className={`relative`}>
      <button
        className={`${btnClass} rounded-[25px] text-center border-2 ${className}`}
        onClick={() => handleClick()}
      >
        {innerText}
      </button>
      {copyShow && (
        <button
          className="absolute lg:right-0 right-[-4px] top-1 z-[7] px-2"
          ref={buttonRef}
          onClick={handleCopyClick}
        >
          <BiSolidCopy color={"#ffffff"} size={20} />
        </button>
      )}
    </div>
  );
}
