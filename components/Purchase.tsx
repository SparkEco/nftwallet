"use client";

import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import Image from "next/image";
import {
  getAndContract,
  getTotalSupplyTemp,
  safeMintNft,
  getAndContractWrite,
} from "@/actions/actions";
import { ethers } from "ethers";
import Col from "./Col";

interface MintProps {
  children: React.ReactNode;
  attributes: any[];
  data: any;
  name: string;
  image: string;
  setIsPopupOpen?: (value: React.SetStateAction<undefined | false>) => void;
}

function Purchase({ children, data, name, image, attributes }: MintProps) {
  const [open, setOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  return (
    <AlertDialog.Root open={open} onOpenChange={setOpen}>
      <AlertDialog.Trigger asChild>{children}</AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="fixed bg-neutral-900/90 inset-0 backdrop-blur z-[21]" />
        <AlertDialog.Content className="fixed h-[92vh] w-[40vw] focus:outline-none drop-shadow-md border z-[22] border-neutral-700 top-7 right-0 rounded-tl-[20px] rounded-bl-[20px] bg-white p-[25px]">
          <AlertDialog.Title
            className={`text-center flex items-center justify-center font-semibold text-[24px]`}
          >
            Purchase
          </AlertDialog.Title>
          <AlertDialog.Content>
            <div className={`block w-full h-full space-y-4`}>
              <Col data={data} name={name} img={image} />
              {attributes.length !== 0 && (
                <div className={`block w-fit mx-auto`}>
                  <p className={`block text-center font-semibold`}>
                    Attributes
                  </p>
                  <div className={`grid grid-cols-4 mx-auto space-x-3`}>
                    {attributes.map((attri, index) => (
                      <Image
                        key={index}
                        alt="attribute"
                        src={attri}
                        width={60}
                        height={60}
                        className={`w-[60px] h-[60px] rounded-[5%]`}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </AlertDialog.Content>

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
