import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { IoClose } from "react-icons/io5";
import { BarLoader } from "react-spinners";
interface MintingProps {
  children: React.ReactNode;
}

function Minting({ children }: MintingProps) {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>{children}</AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="fixed bg-neutral-900/90 inset-0 backdrop-blur z-[30]" />
        <AlertDialog.Content className="fixed focus:outline-none drop-shadow-md border z-[31] border-neutral-700 top-[50%] left-[50%] h-[60%] w-[50%] translate-y-[-50%] translate-x-[-50%] rounded-md bg-white p-[35px]">
          <AlertDialog.Title className={`text-[19px] font-semibold`}>
            Contract Interaction
          </AlertDialog.Title>
          <AlertDialog.Description className={`text-neutral-400 text-[15px]`}>
            Please keep this tab open until completion
          </AlertDialog.Description>
          <div className={`block w-full mt-3 space-y-3`}>
            <div className={`block`}>
              <div className={`flex items-center space-x-4`}>
                <div
                  className={`rounded-[50%] w-[30px] h-[30px] bg-slate-500 flex justify-center items-center text-white`}
                >
                  1
                </div>
                <p>Preparing to mint NFT</p>
              </div>
              <svg width="4" height="30" className={`ms-[13px]`}>
                <line
                  x1="2"
                  y1="0"
                  x2="2"
                  y2="30"
                  stroke="#ccc"
                  strokeWidth="1"
                />
              </svg>
              <BarLoader color="#3D00B7" className={`!w-full`} />
            </div>
            <div className={`block`}>
              <div className={`flex items-center space-x-4`}>
                <div
                  className={`rounded-[50%] w-[30px] h-[30px] bg-slate-500 flex justify-center items-center text-white`}
                >
                  2
                </div>
                <p>Minting NFT on-chain</p>
              </div>
              <svg width="4" height="30" className={`ms-[13px]`}>
                <line
                  x1="2"
                  y1="0"
                  x2="2"
                  y2="30"
                  stroke="#ccc"
                  strokeWidth="1"
                />
              </svg>
              <BarLoader color="#3D00B7" className={`!w-full`} />
            </div>
            <div className={`block`}>
              <div className={`flex items-center space-x-4`}>
                <div
                  className={`rounded-[50%] w-[30px] h-[30px] bg-slate-500 flex justify-center items-center text-white`}
                >
                  3
                </div>
                <p>Awating Confirmation</p>
              </div>
              <svg width="4" height="30" className={`ms-[13px]`}>
                <line
                  x1="2"
                  y1="0"
                  x2="2"
                  y2="30"
                  stroke="#ccc"
                  strokeWidth="1"
                />
              </svg>
              <BarLoader color="#3D00B7" className={`!w-full`} />
            </div>
            <div className={`block`}>
              <div className={`flex items-center space-x-4`}>
                <div
                  className={`rounded-[50%] w-[30px] h-[30px] bg-slate-500 flex justify-center items-center text-white`}
                >
                  4
                </div>
                <p>Done minting</p>
              </div>
            </div>
          </div>
          <AlertDialog.Cancel asChild>
            <button
              className={`fixed top-3 right-3 flex items-center border shadow justify-center w-[30px] h-[30px] rounded-[50%] bg-white`}
            >
              <IoClose size={23} color={"#000000"} />
            </button>
          </AlertDialog.Cancel>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}

export default Minting;
