import { Chain, createWalletClient, custom } from "viem";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { IoClose } from "react-icons/io5";
import { useWeb3ModalProvider } from "@web3modal/ethers/react";
import { Eip1193Provider } from "ethers";
import { useMemo } from "react";
import { sepolia } from "viem/chains";
import Image from "next/image";
interface ChainData {
  network: Chain;
  image: string;
}
interface SwitcherProps {
  children: React.ReactNode;
  data: ChainData[];
}

function Switcher({ children, data }: SwitcherProps) {
  const { walletProvider } = useWeb3ModalProvider();
  const walletClient = useMemo(() => {
    return createWalletClient({
      chain: sepolia,
      transport: custom(walletProvider as Eip1193Provider),
    });
  }, [walletProvider]);
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>{children}</AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="fixed bg-neutral-900/90 inset-0 backdrop-blur z-[25]" />
        <AlertDialog.Content
          className="fixed focus:outline-none drop-shadow-md border space-y-3 z-[26] border-neutral-700 h-[35vh] w-[25vw] translate-y-[-50%]
         translate-x-[-50%] top-[50%] left-[50%] rounded-[20px] bg-white p-[25px]"
        >
          <AlertDialog.Title className={`text-start text-[20px] font-bold`}>
            Switch Chain
          </AlertDialog.Title>
          <AlertDialog.Description className={`text-[14px]`}>
            Wrong network detected, switch or disconnect to continue.
          </AlertDialog.Description>
          <div className={`h-fit py-4 w-[80%] block`}>
            {data.map((item, index) => (
              <div
                className={`flex hover:cursor-pointer h-[35px] hover:bg-neutral-200 px-2 items-center justify-start rounded-[10px] w-full space-x-2`}
                onClick={async () => {
                  await walletClient.switchChain({ id: item.network.id });
                }}
                key={index}
              >
                <Image
                  src={item.image}
                  alt="NetIcon"
                  width={17}
                  height={22}
                  className={`w-[17px] h-[22px]`}
                />
                <p>{item.network.name}</p>
              </div>
            ))}
          </div>
          <AlertDialog.Cancel asChild>
            <button
              aria-label="close"
              className="absolute top-[10px] right-[10px] items-center flex justify-center h-[25px] w-[25px] hover:opacity-70 bg-[#3D00B7] rounded-full"
            >
              <IoClose color={`#ffffff`} />
            </button>
          </AlertDialog.Cancel>
          <AlertDialog.Action />
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
export default Switcher;
