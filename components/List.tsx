"use client";
import { NFTData } from "@/redux/types";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import NftCard from "./NftCard";
import { createListing } from "@/actions/clientActions";
import { useAccount } from "wagmi";

interface PopupProps {
  children: React.ReactNode;
  data: NFTData;
}

function List({ children, data }: PopupProps) {
  const { address } = useAccount();
  const { name, ipfsUri, image, id } = data;
  const [open, setOpen] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [price, setPrice] = useState<number>(0);
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const numericValue = parseFloat(value);
    if (
      !isNaN(numericValue) &&
      Number.isInteger(numericValue) &&
      numericValue > 0
    ) {
      setIsDisabled(false);
      setPrice(numericValue);
    } else {
      setPrice(numericValue);
      console.error("Value is invalid");
      setIsDisabled(true);
    }
  };
  const handleLClick = async () => {
    try {
      await createListing(id, price);
      setOpen(false);
    } catch (err) {
      console.log("Listing failed:", err);
    }
  };
  return (
    <AlertDialog.Root open={open} onOpenChange={setOpen}>
      <AlertDialog.Trigger asChild>{children}</AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="fixed bg-neutral-900/90 inset-0 backdrop-blur z-[21]" />
        <AlertDialog.Content
          onClick={(e) => e.stopPropagation()}
          className="fixed focus:outline-none drop-shadow-md border space-y-3 z-[22] border-neutral-700 top-[50%] left-[50%]  h-[95vh] lg:w-[45vw] w-[85vw] translate-y-[-50%] translate-x-[-50%] rounded-md bg-white p-[25px]"
        >
          <AlertDialog.Title
            className={`text-center text-[22px] font-semibold`}
          >
            List Nft
          </AlertDialog.Title>
          <NftCard name={name} img={image} ipfs={ipfsUri} id={id} data={data} />
          <div className={`w-full block space-y-3`}>
            <label className={`w-[70%] text-[14px] block mx-auto`}>
              Price
              <input
                type="number"
                step={1}
                min={0}
                value={price}
                onChange={handleInputChange}
                name="price"
                placeholder="Price in wei"
                className={`w-[100%] h-[40px] peer border ps-2 rounded-[12px] block mx-auto`}
              />
              <p
                className={`peer-invalid:visible invisible mt-2 text-red-500 text-[13px]`}
              >
                Enter a valid integer
              </p>
            </label>
            <button
              disabled={isDisabled}
              onClick={handleLClick}
              className={`flex mx-auto h-[35px] disabled:bg-slate-600 disabled:opacity-100 justify-center items-center rounded-lg w-[80px] text-white bg-[#3D00B7] hover:opacity-75`}
            >
              List
            </button>
          </div>

          <AlertDialog.Cancel asChild>
            <button
              aria-label="close"
              className="absolute top-[10px] right-[10px] items-center flex justify-center h-[25px] w-[25px] hover:opacity-70 bg-[#3D00B7] rounded-full"
            >
              <IoClose color={`#ffffff`} />
            </button>
          </AlertDialog.Cancel>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}

export default List;
