"use client";

import { NFTData } from "@/redux/types";
import { ethers } from "ethers";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import DynamicButtons from "./DynamicButtons";
import { gql, useQuery } from "@apollo/client";
import axios from "axios";

interface ColProps {
  name?: string;
  img?: string;
  nftdata: NFTData;
  click?: (e: React.MouseEvent<HTMLButtonElement>, data: NFTData) => void;
}

function Col({ click, nftdata }: ColProps) {
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
    variables: { filter: nftdata.tokenAccount },
  });
  const [claimsImgs, setClaimImgs] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      if (nftdata && data) {
        try {
          let claimsImgs = Array.from(data.claims).map(async (claim: any) => {
            let [ipfsRes] = await Promise.all([
              axios.get(`https://ipfs.io/ipfs/${claim.uri}`),
            ]);
            return ipfsRes.data.image;
          });
          let images = await Promise.all(claimsImgs);
          setClaimImgs(images);
        } catch (err) {
          console.error("Error setting claims images", err);
        }
      }
    })();
  }, [nftdata, data]);

  return (
    <div
      className={`block shadow mt-1 lg:w-[269px] mx-auto lg:h-fit md:h-[300px] md:w-[200px] w-[170px] h-[280px] p-2 rounded-[20px]`}
    >
      <div
        suppressHydrationWarning
        style={{ backgroundImage: `url('${nftdata.image}')` }}
        className="bg-cover lg:w-[250px] block mx-auto lg:h-[250px] md:w-[200px] md:h-[200px] w-full h-[150px] relative rounded-[15px]"
      >
        <button
          type="button"
          onClick={(e) => {
            click && click(e, nftdata);
          }}
          className={`absolute z-10 w-fit px-2 text-[13px] h-[30px] top-1 right-1 opacity-0 hover:opacity-100 rounded-[6px] text-white bg-neutral-800`}
        >
          View Details
        </button>
      </div>
      <div className="flex items-center mt-5">
        <div className="block lg:space-y-2  space-y-1 w-full">
          <p
            className={`lg:text-[19px] text-[12px] text-black font-semibold`}
            suppressHydrationWarning
          >
            {nftdata.name}
          </p>
          <div className="flex w-full justify-between items-center px-1 lg:px-2 pb-1 lg:pb-3">
            {nftdata.price && (
              <div className="flex space-x-2 items-center">
                <Image
                  src={`/ethgreen2.png`}
                  alt="eth"
                  width={9}
                  height={15}
                  className={`w-[9px] h-[15px]`}
                />
                <p className={`text-[11px] font-[500] text-black`}>
                  {ethers.formatUnits(`${nftdata.price}`, "ether").toString()}{" "}
                  ETH
                </p>
              </div>
            )}
            <p className={`text-[13px] block font-medium text-black`}>
              #{nftdata.id}
            </p>
          </div>
          <hr />
          <div className="flex justify-between px-3">
            <div className={`flex items-center`}>
              <Link
                target="_blank"
                href={`https://goerli.etherscan.io/address/${nftdata.tokenAccount}#nfttransfers`}
              >
                <Image
                  src={`/etherscan.png`}
                  alt="link"
                  width={20}
                  height={20}
                  className={`rounded-[50%]`}
                />
              </Link>
              <Link href={`${nftdata.ipfsUri}`} target="_blank">
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
                href={`https://tokenbound.org/assets/goerli/0x4bB0a205fceD93c8834b379c461B07BBe6aAE622/${nftdata.id}`}
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
            <DynamicButtons claimsImgs={claimsImgs} data={nftdata} />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Col;
