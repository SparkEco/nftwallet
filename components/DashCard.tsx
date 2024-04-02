"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { isOwnerOf } from "@/actions/clientActions";
import { NFTData } from "@/redux/types";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";

import { ethers } from "ethers";
import DynamicButtons from "./DynamicButtons";
import List from "./List";
import AttestPDF from "./AttestPDF";
import Burn from "./Burn";
import { gql, useQuery } from "@apollo/client";
import axios from "axios";

interface ColProps {
  name?: string;
  img?: string;
  nftdata: NFTData;
  click?: (e: React.MouseEvent<HTMLDivElement>, data: any) => void;
}

function Col({ click, nftdata }: ColProps) {
  const { address } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();
  const isConnected = useSelector(
    (state: RootState) => state.isConnected.value
  );

  const [isOwner, setIsOwner] = useState(false);
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

  useEffect(() => {
    if (nftdata.owner && address) {
      if (nftdata.owner.toLowerCase() === address.toLowerCase()) {
        setIsOwner(true);
      } else {
        setIsOwner(false);
      }
    }
  }, [nftdata, address]);

  return (
    <div
      className={`block shadow mt-1 lg:w-[100%] mx-auto h-fit p-2 rounded-[20px]`}
      onClick={(e) => click && click(e, nftdata)}
    >
      <div
        suppressHydrationWarning
        style={{ backgroundImage: `url('${nftdata.image}')` }}
        className="bg-cover w-[100%] block mx-auto lg:h-[200px] ] md:h-[200px] h-[150px] relative rounded-[15px]"
      ></div>
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
          <div className="flex justify-between lg:px-1 px-0">
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
                  className={`rounded-[50%] lg:w-[20px] lg:h-[20px] w-[15px] h-[15px]`}
                />
              </Link>
              <Link href={`${nftdata.ipfsUri}`} target="_blank">
                <Image
                  src={`/ipfs.png`}
                  alt="link"
                  width={20}
                  height={20}
                  className={`rounded-[50%] lg:w-[20px] lg:h-[20px] w-[15px] h-[15px]`}
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
                  className={`rounded-[50%] lg:w-[20px] lg:h-[20px] w-[15px] h-[15px]`}
                />
              </Link>
            </div>
            <div className={`flex space-x-1 justify-center items-center`}>
              <List data={nftdata}>
                <button
                  onClick={(e) => e.stopPropagation()}
                  className={`lg:h-[28px] h-[24px] w-fit font-medium text-black hover:bg-[#3D00B7] flex justify-center items-center hover:text-white active:opacity-50 lg:text-[14px] text-[10px] border bg-white rounded-[9px] lg:rounded-[12px]] lg:px-[6px] px-[3px]`}
                >
                  List
                </button>
              </List>
              <AttestPDF tokenAccount={nftdata.tokenAccount}>
                <button
                  onClick={(e) => e.stopPropagation()}
                  className={`lg:h-[28px] h-[24px] w-fit font-medium text-black hover:bg-[#3D00B7] flex justify-center items-center hover:text-white active:opacity-50 lg:text-[14px] text-[10px] border bg-white rounded-[9px] lg:rounded-[12px] lg:px-[6px] px-[3px]`}
                >
                  <p>Attest</p>
                </button>
              </AttestPDF>
              <Burn data={nftdata} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Col;
