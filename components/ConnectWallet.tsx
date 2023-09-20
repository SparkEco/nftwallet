import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";

interface ConnectWalletProps {
  className?: string;
}

export default function ConnectWallet({ className }: ConnectWalletProps) {
  const router = useRouter();
  const { open } = useWeb3Modal();
  const { address, isConnecting, isDisconnected, isConnected, status } =
    useAccount();

  const handleClick = () => {
    if (!isConnected) {
      open();
      console.log(status);
    }
    console.log(status);
    return;
  };

  useEffect(() => {
    if (isConnected) {
      router.push("/main");
      console.log("Redirecting");
    }
    return;
  }, []);
  return (
    <button
      className={`${className} lg:h-[45px] h-[35px] active:bg-slate-500 items-center hover:bg-[#3D00B7] hover:text-white border-2 text-[#3D00B7] lg:text-[18px] text-[13px] border-[#3D00B7] rounded-[25px] lg:w-[200px] md:w-[200px] w-[120px] px-2 text-center`}
      onClick={() => handleClick()}
    >
      Connect Wallet
    </button>
  );
}
