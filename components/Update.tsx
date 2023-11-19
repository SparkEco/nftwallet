"use client";
import { NFTData } from "@/redux/types";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import NftCard from "./NftCard";
import { updateListingPrice } from "@/actions/clientActions";
import { ethers } from "ethers";

interface UpdateProps {
  children: React.ReactNode;
  data: NFTData;
}

function Update({ children, data }: UpdateProps) {
  const { name, ipfsUri, image, id, index } = data;
  const [open, setOpen] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [showErr, setShowErr] = useState(false);
  const [price, setPrice] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (value.includes(".")) {
      setIsDisabled(true);
      setShowErr(true);
    } else {
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
    }
  };

  const handleLClick = async () => {
    try {
      setIsLoading(true);
      await updateListingPrice(index, price);
      setIsLoading(false);
      setOpen(false);
      window.location.reload();
    } catch (err) {
      console.log("Listing failed:", err);
      setIsLoading(false);
    }
  };
  return (
    <AlertDialog.Root open={open} onOpenChange={setOpen}>
      <AlertDialog.Trigger asChild>{children}</AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="fixed bg-neutral-900/90 inset-0 backdrop-blur z-[21]" />
        <AlertDialog.Content
          autoFocus={true}
          onClick={(e) => e.stopPropagation()}
          className="fixed focus:outline-none drop-shadow-md border space-y-3 z-[22] border-neutral-700 top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%]  h-[95vh] lg:w-[45vw] w-[85vw] rounded-md bg-white p-[25px]"
        >
          <AlertDialog.Title
            className={`text-center text-[22px] font-semibold`}
          >
            Update Price
          </AlertDialog.Title>
          <NftCard name={name} img={image} ipfs={ipfsUri} id={id} data={data} />
          <div className={`w-full block space-y-3`}>
            <label
              className={`w-[70%] text-[14px] block mx-auto text-neutral-500`}
            >
              Price
              <input
                type="number"
                min={0}
                value={price}
                onChange={handleInputChange}
                name="price"
                placeholder="Price in ETH"
                className={`w-[100%] h-[40px] peer border ps-2 rounded-[12px] block mx-auto`}
              />
              <p
                className={`peer-invalid:visibl ${
                  showErr ? "visible" : "invisible"
                } invisibl mt-2 text-red-500 text-[13px]`}
              >
                Enter a valid number
              </p>
            </label>
            <button
              disabled={isDisabled}
              onClick={handleLClick}
              className={`flex mx-auto h-[35px] disabled:bg-slate-600 disabled:opacity-100 justify-center items-center rounded-lg w-[80px] text-white bg-[#3D00B7] hover:opacity-75`}
            >
              <span>Update</span>
              {isLoading && (
                <svg
                  viewBox="0 0 24 24"
                  className={`animate-spin ml-1 h-4 w-4`}
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className={``}
                    fill="#000000"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              )}
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

export default Update;
