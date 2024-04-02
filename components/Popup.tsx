"use client";

import { SetStateAction, useEffect, useState } from "react";
import Image from "next/image";
import { IoClose } from "react-icons/io5";
import Link from "next/link";
import { ApolloProvider, gql, useQuery } from "@apollo/client";
import axios from "axios";
import dynamic from "next/dynamic";

import ClipLoader from "react-spinners/ClipLoader";
import { hypercertsGraph } from "@/actions/apollo";
import { NFTData } from "@/context/types";
import HoverPop from "./HoverPop";
import ScrollAreaComponent from "./ScrollArea";
const Slider = dynamic(() => import("@/components/Slider"), {
  loading: () => (
    <div
      className={`w-[200px] space-x-5 lg:h-[200px] h-[150px] flex items-center justify-center`}
    >
      <ClipLoader size={25} color={`#3D00B7`} />
    </div>
  ),
});

interface PopupProps {
  tabOpen: boolean;
  details: NFTData;
  setTabOpen: (value: SetStateAction<boolean>) => void;
}

function Popup({ tabOpen, setTabOpen, details }: PopupProps) {
  let GET_HYPERCERT = gql`
    query GetHypercerts($filter: String!) {
      claims(where: { owner: $filter }) {
        id
        uri
        tokenID
      }
    }
  `;
  const { loading, error, data } = useQuery(GET_HYPERCERT, {
    variables: { filter: details.tokenAccount },
  });
  const [claimsImgs, setClaimImgs] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      if (details && data) {
        try {
          let claimsImgs = Array.from(data.claims).map(async (claim: any) => {
            let [ipfsRes] = await Promise.all([axios.get(`${claim.uri}`)]);
            return ipfsRes.data.image;
          });
          let images = await Promise.all(claimsImgs);
          setClaimImgs(images);
        } catch (err) {
          console.error("Error setting claims images", err);
        }
      }
    })();
  }, [details, data]);

  return (
    <ApolloProvider client={hypercertsGraph}>
      <ScrollAreaComponent tabOpen={tabOpen} setTabOpen={setTabOpen}>
        <div className="block relative mx-auto lg:h-[200px] h-[190px] w-[370px] mb-10">
          <button
            onClick={() => setTabOpen(false)}
            className={`absolute top-2 right-2 w-[30px] h-[30px] rounded-[50%] flex justify-center items-center bg-white`}
          >
            <IoClose size={23} color={"#000000"} />
          </button>
          <Image
            src={details.coverImage}
            alt="Image"
            loading="lazy"
            width={370}
            height={200}
            className="block w-[370px] rounded-b-[0.4rem] h-[190px] md:h-[160px] lg:h-[190px]"
          />

          <Image
            src={details.image}
            loading="lazy"
            alt="NFT"
            width={100}
            height={100}
            className={`block ring-1 ring-white/80 rounded-[50%] lg:w-[100px] lg:h-[100px] w-[70px] h-[70px] absolute left-1/2 transform -translate-x-1/2 bottom-[-2rem]`}
          />
        </div>
        <p className={`text-[24px] font-semibold text-center`}>
          {details.name}
        </p>

        <div className="grid grid-cols-4 gap-x-4 gap-y-3 w-fit mx-auto my-3">
          {Array(...claimsImgs, ...details.attributes).map((attri, index) => (
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
          <h1 className={`text-[16px] font-semibold text-start`}>
            Description
          </h1>
          <p className={`lg:text-[13px] text-[11px] `}>{details.description}</p>
        </div>
        <div className={`mt-6`}>
          <Slider imgs={details.projectImages} />
        </div>
        {/* <div className={`flex w-full justify-around items-center`}>
          <Link
            target="_blank"
            href={`https://goerli.etherscan.io/address/${details.tokenAccount}#nfttransfers`}
          >
            <Image
              src={`/etherscan.png`}
              alt="link"
              width={40}
              height={40}
              className={`rounded-[50%]`}
            />
          </Link>
          <Link href={`${details.ipfsUri}`} target="_blank">
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
        </div> */}
      </ScrollAreaComponent>
    </ApolloProvider>
  );
}

export default Popup;
