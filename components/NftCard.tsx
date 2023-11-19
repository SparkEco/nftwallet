"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { isOwnerOf } from "@/actions/clientActions";
import { getAccountClaims } from "@/actions/hypercerts";
import { NFTData } from "@/redux/types";
import { ethers } from "ethers";

interface NftCardProps {
  name?: string;
  img?: string;
  id?: number;
  data?: NFTData;
  ipfs?: string;
}

function NftCard({ id, data, name, ipfs, img }: NftCardProps) {
  const isConnected = useSelector(
    (state: RootState) => state.isConnected.value
  );
  const [isPopupOpen, setIsPopupOpen] = useState<undefined | false>(undefined);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    if (isConnected && id) {
      isOwnerOf(id as number)
        .then((res) => setIsOwner(res as boolean))
        .catch((err) => console.error("Unable to define ownership", err));
    }
  }, [isConnected, id]);

  useEffect(() => {
    if (isPopupOpen == false) {
      window.location.reload();
      setIsPopupOpen(undefined);
    }
  }, [isPopupOpen]);

  return (
    <div
      className={`block shadow mt-1 lg:w-[41%] md:w-[50%] mx-auto h-fit p-2 rounded-[20px]`}
    >
      <div
        suppressHydrationWarning
        style={{ backgroundImage: `url('${img}')` }}
        className="bg-cover w-[100%] block mx-auto lg:h-[200px] ] md:h-[200px] h-[150px] relative rounded-[15px]"
      ></div>
      <div className="flex items-center mt-5">
        <div className="block lg:space-y-2  space-y-1 w-full">
          <p
            className={`lg:text-[19px] text-[15px] text-black font-semibold`}
            suppressHydrationWarning
          >
            {name}
          </p>
          <div className="flex w-full justify-between items-center px-1 lg:px-2 pb-1 lg:pb-3">
            <div className="flex space-x-2 items-center">
              <Image
                src={`/ethgreen2.png`}
                alt="eth"
                width={9}
                height={15}
                className={`w-[9px] h-[15px]`}
              />
              {data?.price && (
                <p className={`text-[11px] font-[500] text-black`}>
                  {ethers.formatUnits(`${data.price}`, "ether").toString()} ETH
                </p>
              )}
            </div>
            <p className={`text-[13px] block font-medium text-black`}>#{id}</p>
          </div>
          <hr />
          <div className="flex justify-between px-3">
            <div className={`flex items-center`}>
              <Link
                target="_blank"
                href={`https://goerli.etherscan.io/address/${data?.tokenAccount}#nfttransfers`}
              >
                <Image
                  src={`/etherscan.png`}
                  alt="link"
                  width={20}
                  height={20}
                  className={`rounded-[50%]`}
                />
              </Link>
              <Link href={`${ipfs}`} target="_blank">
                <Image
                  src={`/ipfs.png`}
                  alt="link"
                  width={20}
                  height={20}
                  className={`rounded-[50%]`}
                />
              </Link>
              <Link
                target="_blank"
                href={`https://tokenbound.org/assets/goerli/0x4bB0a205fceD93c8834b379c461B07BBe6aAE622/${id}`}
              >
                <Image
                  src={`/tokenbound.svg`}
                  alt="link"
                  width={20}
                  height={20}
                  className={`rounded-[50%]`}
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NftCard;
