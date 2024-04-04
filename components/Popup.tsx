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
        <div
          className={`w-[85%] mx-auto h-[40px] flex items-center rounded-lg`}
        >
          <p className={`text-[24px] text-white font-[500]`}>#{details.name}</p>
        </div>

        <button
          onClick={() => setTabOpen(false)}
          className={`absolute top-2 right-3 w-[25px] h-[25px] rounded-[50%] flex justify-center items-center`}
        >
          <svg viewBox="0 0 100 100">
            <line
              x1="0"
              y1="0"
              x2="50"
              y2="50"
              stroke="white"
              fill="#ffffff"
              strokeWidth="4"
            />
            <line
              x1="0"
              y1="50"
              x2="50"
              y2="0"
              fill="#ffffff"
              stroke="white"
              strokeWidth="4"
            />
          </svg>
        </button>
        <div className="block relative mx-auto lg:h-[200px] h-[190px] w-[380px] mb-10">
          <Image
            src={details.coverImage}
            alt="Cover Image"
            loading="eager"
            width={380}
            height={200}
            className="block w-[380px] rounded-[8px] h-[190px] md:h-[160px] lg:h-[190px]"
          />

          <Image
            src={details.image}
            loading="eager"
            alt="NFT"
            width={120}
            height={120}
            className={`block ring-1 ring-white/80 rounded-[50%] lg:w-[120px] lg:h-[120px] w-[70px] h-[70px] absolute left-1/2 transform -translate-x-1/2 bottom-[-2rem]`}
          />
        </div>
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
        <div className={`block mx-auto text-white w-[320px]`}>
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
