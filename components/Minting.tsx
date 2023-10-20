import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { IoClose } from "react-icons/io5";
import { HiCheck } from "react-icons/hi";
import { BarLoader } from "react-spinners";
interface MintingProps {
  children: React.ReactNode;
  stage: number;
  showProgess: boolean;
  setShowProgress: (value: React.SetStateAction<boolean>) => void;
}

function Minting({
  children,
  stage,
  showProgess,
  setShowProgress,
}: MintingProps) {
  return (
    <AlertDialog.Root open={showProgess} onOpenChange={setShowProgress}>
      <AlertDialog.Trigger asChild>{children}</AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="fixed bg-neutral-900/90 inset-0 backdrop-blur z-[30]" />
        <AlertDialog.Content className="fixed focus:outline-none drop-shadow-md border z-[31] border-neutral-700 top-[50%] left-[50%] h-[54%] lg:w-[50%] md:w-[50%] w-[91%] translate-y-[-50%] translate-x-[-50%] rounded-md bg-white p-[35px]">
          <AlertDialog.Title className={`text-[19px] font-semibold`}>
            Processing Impact Certificate
          </AlertDialog.Title>
          <AlertDialog.Description className={`text-neutral-400 text-[15px]`}>
            Please keep this tab open until completion
          </AlertDialog.Description>
          <div className={`block w-full mt-3 space-y-3`}>
            <div className={`block w-full`}>
              <div className={`flex items-center space-x-4`}>
                <div
                  className={`rounded-[50%] ${
                    stage >= 1 ? "bg-blue-600" : "bg-slate-500"
                  } w-[30px] h-[30px] flex justify-center items-center text-white`}
                >
                  {stage > 1 ? <HiCheck color={`#ffffff`} /> : <p>1</p>}
                </div>
                <p>Storing image files on IPFS and Bundling project metadata</p>
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

              {stage == 1 && (
                <BarLoader color="#3D00B7" className={`!w-full`} />
              )}
            </div>
            <div className={`block`}>
              <div className={`flex items-center space-x-4`}>
                <div
                  className={`rounded-[50%] ${
                    stage >= 2 ? "bg-blue-600" : "bg-slate-500"
                  } w-[30px] h-[30px] flex justify-center items-center text-white`}
                >
                  {stage > 2 ? <HiCheck color={`#ffffff`} /> : <p>2</p>}
                </div>
                <p>Publishing Impact Certificate onchain</p>
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
              {stage == 2 && (
                <BarLoader color="#3D00B7" className={`!w-full`} />
              )}
            </div>
            <div className={`block`}>
              <div className={`flex items-center space-x-4`}>
                <div
                  className={`${
                    stage >= 3 ? "bg-blue-600" : "bg-slate-500"
                  } rounded-[50%] w-[30px] h-[30px] flex justify-center items-center text-white`}
                >
                  {stage > 3 ? <HiCheck color={`#ffffff`} /> : <p>3</p>}
                </div>
                <p>Fetching transaction status</p>
              </div>
            </div>
          </div>
          {/* <AlertDialog.Cancel asChild>
            <button
              className={`fixed top-3 right-3 flex items-center border shadow justify-center w-[30px] h-[30px] rounded-[50%] bg-white`}
            >
              <IoClose size={23} color={"#000000"} />
            </button>
          </AlertDialog.Cancel> */}
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}

export default Minting;
