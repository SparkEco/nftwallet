"use client";

import { SetStateAction, useEffect, useState } from "react";
import Image from "next/image";
import Slider from "./Slider";
import ScrollAreaComponent from "./ScrollArea";
import HoverPop from "./HoverPop";
import { IoClose } from "react-icons/io5";
import { getAttributes, getTokenAccount } from "@/actions/actions";
import Link from "next/link";

interface PopupProps {
  ipfs: string;
  tabOpen: boolean;
  imgs: string[];
  details: any;
  setTabOpen: (value: SetStateAction<boolean>) => void;
}

function Popup({ tabOpen, imgs, setTabOpen, details, ipfs }: PopupProps) {
  const [attributes, setAttributes] = useState<any[]>([]);
  const [tokenAccount, setTokenAccount] = useState<string>("");
  useEffect(() => {
    getAttributes(details.id as number)
      .then((res) => {
        setAttributes(res);
        console.log("Attributes fetched");
      })
      .catch((err) => console.log("Attributes fetch failed", err));
    getTokenAccount(details.id as number)
      .then((res) => setTokenAccount(res))

      .catch((err) => console.error("Set token account failed", err));
  }, [details]);

  return (
    <ScrollAreaComponent tabOpen={tabOpen} setTabOpen={setTabOpen}>
      <div className="block relative mx-auto lg:h-[200px] h-[190px] w-[350px] mb-10">
        <button
          onClick={() => setTabOpen(false)}
          className={`absolute top-2 right-3 w-[30px] h-[30px] rounded-[50%] flex justify-center items-center bg-white`}
        >
          <IoClose size={23} color={"#000000"} />
        </button>
        <Image
          loading="eager"
          src={details.nftcover}
          alt="Image"
          width={350}
          height={200}
          className="block w-[350px] rounded-b-[0.4rem] h-[190px] md:h-[160px] lg:h-[190px]"
        />
        <Image
          src={details.image}
          alt="NFT"
          width={100}
          height={100}
          className={`block ring-1 ring-white/80 rounded-[50%] lg:w-[100px] lg:h-[100px] w-[70px] h-[70px] absolute left-1/2 transform -translate-x-1/2 bottom-[-2rem]`}
        />
      </div>
      <p className={`text-[24px] font-semibold text-center`}>{details.name}</p>

      <div className="grid grid-cols-4 gap-x-4 gap-y-3 w-fit mx-auto my-3">
        {attributes.map((attri, index) => (
          <div
            key={index}
            className={`bg-white w-[63px] h-[63px] flex justify-center items-center rounded-[50%]`}
          >
            <HoverPop name={attri}>
              <Image
                aria-label="hhhhh"
                alt="attribute"
                src={attri}
                width={60}
                height={60}
                className={`w-[60px] h-[60px] rounded-[50%]`}
              />
            </HoverPop>
          </div>
        ))}
      </div>
      <div className={`block mx-auto w-[320px]`}>
        <h1 className={`text-[16px] font-semibold text-start`}>Description</h1>
        <p className={`lg:text-[13px] text-[11px] `}>{details.description}</p>
      </div>
      <div className={`mt-6`}>
        <Slider imgs={imgs} />
      </div>
      <div className={`flex w-full justify-around items-center p-5`}>
        <Link
          target="_blank"
          href={`https://goerli.etherscan.io/address/${tokenAccount}#nfttransfers`}
        >
          <Image
            src={`/etherscan.png`}
            alt="link"
            width={40}
            height={40}
            className={`rounded-[50%]`}
          />
        </Link>
        <Link href={`${ipfs}`} target="_blank">
          <Image
            src={`/ipfs.png`}
            alt="link"
            width={40}
            height={40}
            className={`rounded-[50%]`}
          />
        </Link>
        <Link
          target="_blank"
          href={`https://tokenbound.org/assets/goerli/0x4bB0a205fceD93c8834b379c461B07BBe6aAE622/${details.id}`}
        >
          <Image
            src={`/tokenbound.svg`}
            alt="link"
            width={40}
            height={40}
            className={`rounded-[50%]`}
          />
        </Link>
      </div>
    </ScrollAreaComponent>
  );
}

export default Popup;
