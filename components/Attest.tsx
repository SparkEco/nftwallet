"use client";

import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import Image from "next/image";
import { getTotalSupplyTemp, safeMintNft } from "@/actions/serverActions";
import { getAndContract, getAndContractWrite } from "@/actions/clientActions";
import { ethers } from "ethers";

interface MintProps {
  children: React.ReactNode;
  tokenAccount: string;
  setIsPopupOpen: (value: React.SetStateAction<undefined | false>) => void;
}

function Attest({ children, tokenAccount, setIsPopupOpen }: MintProps) {
  const [open, setOpen] = useState(false);
  const [nextId, setNextId] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  async function getTotalsupplyF() {
    const contract = await getAndContract();
    try {
      const ts = await getTotalSupplyTemp(contract as ethers.Contract);
      setNextId(Number(ts) + 2);
    } catch (err) {
      console.error("Failed to get totalSupply for collectible", err);
    }
  }

  const mint = async () => {
    setIsLoading(true);
    let res;
    const contract = await getAndContractWrite();
    try {
      res = await safeMintNft(contract as ethers.Contract, tokenAccount);
      setIsLoading(false);
      setIsPopupOpen(false);
      setOpen(false);
    } catch (err) {
      console.error("Mint failed", err);
      setIsLoading(false);
    }
    return res;
  };
  return (
    <AlertDialog.Root open={open} onOpenChange={setOpen}>
      <AlertDialog.Trigger asChild onClick={() => getTotalsupplyF()}>
        {children}
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="fixed bg-neutral-900/90 inset-0 backdrop-blur z-[21]" />
        <AlertDialog.Content className="fixed h-[88vh] w-[40vw] focus:outline-none drop-shadow-md border z-[22] border-neutral-700 top-7 right-0 rounded-tl-[20px] rounded-bl-[20px] bg-white p-[25px]">
          <AlertDialog.Title
            className={`text-center flex items-center justify-center font-semibold text-[24px]`}
          >
            <Image
              src={`/attest.png`}
              alt="link"
              width={26}
              height={26}
              className={`rounded-[50%]`}
            />
            <p>DeReSy</p>
          </AlertDialog.Title>
          <AlertDialog.Description
            className={`text-center text-[13px] text-[#727272]`}
          >
            DEcentralized REview SYstem powered by Momus.eth
          </AlertDialog.Description>
          <div className={`w-full p-3 block h-full`}>
            <Image
              src={`https://robohash.org/bgset_bg2/${nextId}`}
              alt="collectible"
              width={280}
              height={200}
              className={`block mx-auto rounded-lg w-[280px] h-[200px]`}
            />
            <button
              type="button"
              disabled={isLoading}
              onClick={() => mint()}
              className={`w-[100px] disabled:bg-slate-400 mt-[60px] rounded-[10px] text-white h-[30px] active:opacity-70 bg-[#3D00B7] flex items-center justify-center mx-auto space-x-1`}
            >
              <span>Mint</span>
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

export default Attest;
