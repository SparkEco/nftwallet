import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { IoClose } from "react-icons/io5"

interface MintProps {
    children: React.ReactNode
}

function Attest({ children }: MintProps) {
    return (
        <AlertDialog.Root>
            <AlertDialog.Trigger asChild>{children}</AlertDialog.Trigger>
            <AlertDialog.Portal>
                <AlertDialog.Overlay className="fixed bg-neutral-900/90 inset-0 backdrop-blur z-[21]" />
                <AlertDialog.Content className="fixed focus:outline-none drop-shadow-md border z-[22] border-neutral-700 top-7 right-0 rounded-tl-[20px] rounded-bl-[20px] bg-white p-[25px]">
                    <AlertDialog.Title className={`text-center font-semibold text-[22px]`}>Attest</AlertDialog.Title>
                    <form className={`w-[40vw] h-[65vh] space-y-6`}>
                        <fieldset className={`w-full block`}>
                            <label
                                htmlFor="nfcover"
                                className={`ps-5  block my-2 text-[17px]`}
                            >
                                NFT Cover Image
                            </label>
                            <input
                                type="file"
                                // onChange={(event) => handleFileChange2(event, "nftcover")}
                                name="nftcover"
                                id="nftimage"
                                className={`rounded-[15px] block text-[14px] mx-auto mt-2 h-[30px] py-[2px] w-[93%] border ps-3`}
                            />
                        </fieldset>
                        <textarea
                            name="description"
                            placeholder="Describe your NFT"
                            className={`p-4 block mx-auto w-[93%] h-[140px] rounded-[15px] border`}
                        />
                    </form>
                    <AlertDialog.Cancel asChild>
                        <button className={`fixed top-3 right-3 flex items-center border shadow justify-center w-[30px] h-[30px] rounded-[50%] bg-white`}>
                            <IoClose size={23} color={"#000000"} />
                        </button>
                    </AlertDialog.Cancel>
                    <AlertDialog.Action />
                </AlertDialog.Content>
            </AlertDialog.Portal>
        </AlertDialog.Root>
    );
}

export default Attest;