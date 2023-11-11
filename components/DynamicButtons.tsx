"use client";

import { NFTData } from "@/redux/types";
import { useAccount } from "wagmi";
import List from "./List";
import Attest from "./Attest2";
import Purchase from "./Purchase";
import Update from "./Update";

interface DynamicButtonsProps {
  data: NFTData;
  isOwner: boolean;
  isConnected: boolean;
  setIsPopupOpen?: (value: React.SetStateAction<undefined | false>) => void;
  claimsImgs: string[];
}

function DynamicButtons({
  data,
  isOwner,
  isConnected,
  setIsPopupOpen,
  claimsImgs,
}: DynamicButtonsProps) {
  const { address } = useAccount();
  if (isConnected) {
    if (isOwner) {
      return (
        <div className={`flex items-center space-x-2`}>
          <List data={data}>
            <button
              onClick={(e) => e.stopPropagation()}
              className={`lg:h-[28px] h-[24px] w-fit font-medium 
               text-black hover:bg-[#3D00B7] flex justify-center items-center hover:text-white active:opacity-50 lg:text-[15px] text-[10px] border bg-white rounded-[12px] px-1 lg:px-2`}
            >
              List
            </button>
          </List>
          <Attest
            tokenAccount={data.tokenAccount}
            setIsPopupOpen={setIsPopupOpen}
          >
            <button
              onClick={(e) => e.stopPropagation()}
              className={`lg:h-[28px] h-[24px] w-fit font-medium 
               text-black hover:bg-[#8d859e] flex justify-center items-center hover:text-white active:opacity-50 lg:text-[15px] text-[10px] border bg-white rounded-[12px] px-1 lg:px-2`}
            >
              <p>Attest</p>
            </button>
          </Attest>
        </div>
      );
    } else if (!isOwner && data.isListing && data.owner !== address) {
      return (
        <Purchase
          attributes={[...data.attributes, ...claimsImgs]}
          data={data}
          name={data.name}
          image={data.image}
        >
          <button
            onClick={(e) => e.stopPropagation()}
            className={`lg:h-[28px] h-[24px] w-fit font-medium 
                  text-black hover:bg-[#3D00B7] space-x-1 flex justify-center items-center hover:text-white active:opacity-50 lg:text-[15px] text-[10px] border bg-white rounded-[15px] px-1 lg:px-2`}
          >
            Purchase
          </button>
        </Purchase>
      );
    } else if (!isOwner && data.isListing && data.owner === address) {
      return (
        <Update data={data}>
          <button
            onClick={(e) => e.stopPropagation()}
            className={`lg:h-[28px] h-[24px] w-fit font-medium 
                    text-black hover:bg-[#3D00B7] flex justify-center items-center hover:text-white active:opacity-50 lg:text-[15px] text-[10px] border bg-white rounded-[12px] px-1 lg:px-2`}
          >
            Update
          </button>
        </Update>
      );
    }
  }
}

export default DynamicButtons;