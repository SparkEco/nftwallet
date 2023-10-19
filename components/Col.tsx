"use client";

import Image from "next/image";
import Link from "next/link";
import Attest from "./Attest";
import { useEffect, useState } from "react";
import { getAttributes, getTokenAccount, isOwnerOf } from "@/actions/actions";
import { useAppContext } from "@/context/AppContext";
import { getClaims } from "@/actions/hypercerts";

interface ColProps {
  name?: string;
  img?: string;
  id?: number;
  data?: any;
  ipfs?: string;
  click?: (
    e: React.MouseEvent<HTMLDivElement>,
    data: any,
    ipfs: string
  ) => void;
}

function Col({ name, img, id, ipfs, click, data }: ColProps) {
  const [isPopupOpen, setIsPopupOpen] = useState<undefined | false>(undefined);
  const [attributes, setAttributes] = useState<any>();
  const [tokenAccount, setTokenAccount] = useState<string>("");
  const [isOwner, setIsOwner] = useState(false);
  const [claims, setClaims] = useState<any>();
  const { isConnected } = useAppContext();

  useEffect(() => {
    getAttributes(id as number)
      .then((res) => {
        setAttributes(res);
        console.log("Attributes fetched");
      })
      .catch((err) => console.log("Attributes fetch failed", err));
    getTokenAccount(id as number)
      .then((res) => setTokenAccount(res))

      .catch((err) => console.error("Set token account failed", err));
  }, [id]);

  useEffect(() => {
    isConnected &&
      isOwnerOf(id as number)
        .then((res) => setIsOwner(res as boolean))
        .catch((err) => console.error("Unable to define ownership", err));
    async function getAccountClaims() {
      const tokenAccount = await getTokenAccount(id as number);
      try {
        const claims = await getClaims(tokenAccount);
        setClaims(claims);
      } catch (err) {
        console.error("failed to fetch claims", err);
      }
    }
    isConnected && getAccountClaims();
  }, [isConnected, id]);

  useEffect(() => {
    if (isPopupOpen == false) {
      window.location.reload();
      console.log("Refreshed");
      setIsPopupOpen(undefined);
    }
  }, [isPopupOpen]);
  console.log(claims);
  return (
    <div
      className={`block shadow mt-1 lg:w-[269px] mx-auto lg:h-fit md:h-[300px] md:w-[200px] w-[150px] h-[300px] lg:p-2 p-0 rounded-[20px]`}
      onClick={(e) => click && click(e, data, ipfs as string)}
    >
      <div
        suppressHydrationWarning
        style={{ backgroundImage: `url('${img}')` }}
        className="bg-cover lg:w-[250px] block mx-auto lg:h-[250px] md:w-[200px] md:h-[200px] w-[150px] h-[150px] relative rounded-[15px]"
      >
        {attributes?.map((attr: string, index: number) => (
          <Image
            key={index}
            src={attr}
            alt="face"
            width={30}
            height={30}
            className={`absolute bottom-[-15px] h-[30px] w-[30px] rounded-[50%]`}
            style={{ left: `${5 + index * 7}%` }}
          />
        ))}
      </div>
      <div className="flex items-center mt-5">
        <div className="block lg:space-y-2 space-y-1 w-full">
          <p
            className={`lg:text-[19px] text-[15px] text-black font-bold`}
            suppressHydrationWarning
          >
            {name}
          </p>
          <div className="flex w-full lg:space-x-[50%] md:space-x-[30%] lg:justify-start md:justify-start justify-between items-center px-1 lg:px-2 pb-1 lg:pb-3">
            <div className="flex space-x-2 items-center">
              <Image
                src={`/ethgreen2.png`}
                alt="eth"
                width={9}
                height={15}
                className={`w-[9px] h-[15px]`}
              />
              <p className={`text-[11px] font-[500] text-black`}>0.25 ETH</p>
            </div>
            <p className={`text-[13px] block font-medium text-black`}>
              1 of 38
            </p>
          </div>
          <hr />
          <div className="flex justify-between px-3">
            <div className={`flex items-center`}>
              <Link
                target="_blank"
                href={`https://goerli.etherscan.io/address/${tokenAccount}#nfttransfers`}
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
            {isOwner && (
              <Attest
                tokenAccount={tokenAccount}
                setIsPopupOpen={setIsPopupOpen}
              >
                <button
                  className={`h-[28px] w-fit font-medium 
                  text-black hover:bg-[#3D00B7] space-x-1 flex justify-center items-center hover:text-white active:opacity-50 lg:text-[15px] text-[10px] border bg-white rounded-[25px] px-1 lg:px-2`}
                >
                  <p>Attest</p>
                </button>
              </Attest>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Col;
