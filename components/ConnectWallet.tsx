import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";
import { BiSolidCopy } from "react-icons/bi";

interface ConnectWalletProps {
  className?: string;
}

export default function ConnectWallet({ className }: ConnectWalletProps) {
  const router = useRouter();
  const { open } = useWeb3Modal();
  const { address, isConnecting, isDisconnected, isConnected, status } =
    useAccount();

  const buttonRef = useRef(null);

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
      open();
    }

    return;
  };

  useEffect(() => {
    if (isConnected) {
      router.push("/main");
      console.log("Redirecting");
    }
    return;
  }, [isConnected]);
  return (
    <button
      className={`${className} ${
        isConnected
          ? "truncate text-white bg-[#3D00B7] relative text-[14px] h-[35px] lg:w-[133px] md:w-[127px] w-[120px] px-4"
          : "lg:h-[45px] h-[35px] active:bg-slate-500  hover:bg-[#3D00B7] hover:text-white  text-[#3D00B7] lg:text-[18px] text-[13px] border-[#3D00B7] lg:w-[200px] md:w-[200px] w-[120px] px-2"
      }  rounded-[25px]  text-center items-center border-2`}
      onClick={() => handleClick()}
    >
      {!isConnected ? "Connect Wallet" : address}
      {isConnected && (
        <div
          className="absolute right-0 top-1 z-10 px-2"
          ref={buttonRef}
          onClick={handleCopyClick}
        >
          <BiSolidCopy color={"#ffffff"} size={21} />
        </div>
      )}
    </button>
  );
}
