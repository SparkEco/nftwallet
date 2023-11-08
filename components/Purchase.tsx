"use client";

import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import Image from "next/image";
import NftCard from "./NftCard";
import { getAllListing } from "@/actions/marketplace";
import { NFTData } from "@/redux/types";
import { ethers } from "ethers";
import { purchaseListing } from "@/actions/clientActions";

interface MintProps {
  children: React.ReactNode;
  attributes: any[];
  data: NFTData;
  name: string;
  image: string;
  setIsPopupOpen?: (value: React.SetStateAction<undefined | false>) => void;
}

function Purchase({ children, data, name, image, attributes }: MintProps) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <AlertDialog.Root open={open} onOpenChange={setOpen}>
      <AlertDialog.Trigger asChild>{children}</AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay
          className="fixed bg-neutral-900/90 inset-0 backdrop-blur z-[21]"
          onClick={(e) => e.stopPropagation()}
        />
        <AlertDialog.Content
          onClick={(e) => e.stopPropagation()}
          className="fixed h-[95vh] w-[45vw] focus:outline-none drop-shadow-md border z-[22] border-neutral-700 top-7 right-0 rounded-tl-[20px] rounded-bl-[20px] bg-white p-[25px]"
        >
          <AlertDialog.Title
            className={`text-center flex items-center justify-center font-semibold text-[24px]`}
          >
            Purchase
          </AlertDialog.Title>
          <div className={`block w-full h-full space-y-4`}>
            <NftCard data={data} name={name} img={image} />
            {attributes.length !== 0 && (
              <div className={`block w-fit mx-auto`}>
                <p className={`block text-center font-semibold`}>Attributes</p>
                <div className={`grid grid-cols-4 mx-auto gap-x-3 gap-y-1`}>
                  {attributes.map((attri, index) => (
                    <Image
                      key={index}
                      alt="attribute"
                      src={attri}
                      width={55}
                      height={55}
                      className={`w-[55px] h-[55px] rounded-[5%]`}
                    />
                  ))}
                </div>
              </div>
            )}
            <button
              onClick={() =>
                purchaseListing(
                  ethers.parseUnits("500000000000", "wei"),
                  data.index
                )
              }
              className={`w-[120px] h-[30px] text-white bg-[#3D00B7] block mx-auto border rounded-[10px] active:opacity-70`}
            >
              Purchase
            </button>
          </div>

          <AlertDialog.Cancel asChild>
            <button
              className={`fixed top-3 right-3 flex items-center border shadow justify-center w-[30px] h-[30px] rounded-[50%] bg-white`}
            >
              <IoClose size={23} color={"#000000"} />
            </button>
          </AlertDialog.Cancel>
          <AlertDialog.Action />
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}

export default Purchase;
