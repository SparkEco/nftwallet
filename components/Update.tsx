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
  const [price, setPrice] = useState<string>(
    ethers.parseUnits(`${data.price}`, "ether").toString()
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (value.includes(".")) {
      setIsDisabled(true);
      setShowErr(true);
    } else {
      let numericValue = BigInt(value);
      if (typeof numericValue === "bigint" && numericValue > 0) {
        setIsDisabled(false);
        setShowErr(false);
        setPrice(numericValue.toString());
      } else {
        //setPrice(numericValue);
        setShowErr(true);
        console.error("Value is invalid");
        setIsDisabled(true);
      }
    }
  };

  const handleLClick = async () => {
    try {
      await updateListingPrice(index, BigInt(price));
      setOpen(false);
      window.location.reload();
    } catch (err) {
      console.log("Listing failed:", err);
    }
  };
  console.log(price);
  console.log("price in bigint", BigInt(price));
  return (
    <AlertDialog.Root open={open} onOpenChange={setOpen}>
      <AlertDialog.Trigger asChild>{children}</AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="fixed bg-neutral-900/90 inset-0 backdrop-blur z-[21]" />
        <AlertDialog.Content
          onClick={(e) => e.stopPropagation()}
          className="fixed focus:outline-none drop-shadow-md border space-y-3 z-[22] border-neutral-700 top-[50%] left-[50%] h-fit w-[560px] translate-y-[-50%] translate-x-[-50%] rounded-md bg-white p-[25px]"
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
              Price in wei
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
                className={`peer-invalid:visibl ${
                  showErr ? "visible" : "invisible"
                } invisibl mt-2 text-red-500 text-[13px]`}
              >
                Enter a valid integer
              </p>
            </label>
            <button
              disabled={isDisabled}
              onClick={handleLClick}
              className={`flex mx-auto h-[35px] disabled:bg-slate-600 disabled:opacity-100 justify-center items-center rounded-lg w-[80px] text-white bg-[#3D00B7] hover:opacity-75`}
            >
              Update
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
