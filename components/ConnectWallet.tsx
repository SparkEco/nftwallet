"use client";

import { useWeb3Modal, useWeb3ModalProvider } from "@web3modal/ethers/react";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import { FaWallet } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { setisConnected } from "@/redux/slices/isconnected.slice";
import { setAccount } from "@/redux/slices/account.slice";
import { getAccount, getProvider } from "@/actions/clientActions";
import { BrowserProvider } from "ethers";

interface ConnectWalletProps {
  className?: string;
}

export default function ConnectWallet({ className }: ConnectWalletProps) {
  const dispatch = useDispatch();

  const router = useRouter();
  const { open, close } = useWeb3Modal();
  const { address, isConnected } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();
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
      });
    }
  };

  const handleClick = async () => {
    if (!isConnected) {
      await open();
    }
  };

  useEffect(() => {
    if (isConnected && walletProvider) {
      getAccount(new BrowserProvider(walletProvider))
        .then(() => {})
        .catch((err) => console.error("Error setting provider", err));
      setBtnClass(ifconn);
      setCopyShow(true);
      dispatch(setAccount(`${address}`));

      dispatch(setisConnected(isConnected));
    } else return;
  }, [isConnected, address, dispatch, walletProvider]);

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
