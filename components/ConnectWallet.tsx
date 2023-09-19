import { useWeb3Modal } from "@web3modal/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface ConnectWalletProps {
  className?: string;
}

export default function ConnectWallet({ className }: ConnectWalletProps) {
  const router = useRouter();
  const { open } = useWeb3Modal();
  const [isconnected, setIsConnected] = useState(false);
  const handleClick = () => {
    open();
    setIsConnected(true);
  };

  useEffect(() => {
    if (isconnected) {
      router.push("/main");
    }
    return;
  }, [isconnected]);
  return (
    <button
      className={`${className} lg:h-[45px] h-[35px] items-center hover:bg-[#3D00B7] hover:text-white border-2 text-[#3D00B7] lg:text-[18px] text-[13px] border-[#3D00B7] rounded-[25px] lg:w-[200px] md:w-[200px] w-[120px] px-2 text-center`}
      onClick={() => handleClick()}
    >
      Connect Wallet
    </button>
  );
}
