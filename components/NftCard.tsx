import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAppContext } from "@/context/AppContext";
import { getAttributes, getTokenAccount, isOwnerOf } from "@/actions/actions";
import { getAccountClaims } from "@/actions/hypercerts";

interface NftCardProps {
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

function NftCard({ id, data, name, ipfs, img }: NftCardProps) {
  const [isPopupOpen, setIsPopupOpen] = useState<undefined | false>(undefined);
  const [attestData, setAttestData] = useState<any[]>([]);
  const [attributes, setAttributes] = useState<any[]>([]);
  const [tokenAccount, setTokenAccount] = useState<string>("");
  const [isOwner, setIsOwner] = useState(false);
  const [claimsImgs, setClaimsImgs] = useState<any[]>([]);
  const { isConnected } = useAppContext();

  useEffect(() => {
    async function getClaimsImgSrc() {
      let imgSrcs = [];
      let attestData = [];
      try {
        if (id != undefined) {
          const claims = await getAccountClaims(id as number);
          if (claims && claims.length > 0) {
            //setClaims(claims);
            const promises = claims.map(async (claim) => {
              const res = await fetch(
                `https://ipfs.io/ipfs/${claim.claim.uri}`
              );
              if (res.ok) {
                const data = await res.json();
                const img = data.image;
                return img; // Return the image URL
              } else {
                return null;
              }
            });
            const hypercertIDs = claims.map((claim) => claim.tokenID);

            const derseyPromises = hypercertIDs.map(async (id) => {
              const res = await fetch(
                `https://us-central1-deresy-dev.cloudfunctions.net/api/search_reviews?hypercertID=${id}`
              );
              if (res.ok) {
                const data = await res.json();
                return data;
              } else {
                return null;
              }
            });
            imgSrcs = await Promise.all(promises);
            attestData = await Promise.all(derseyPromises);
          } else {
            imgSrcs = [];
            attestData = [];
          }
        } else imgSrcs = [];
      } catch (err) {
        console.error(err);
      }
      setClaimsImgs(imgSrcs);
      setAttestData(attestData);
      return imgSrcs;
    }
    if (id != undefined) {
      getAttributes(id as number)
        .then((res) => {
          setAttributes(res);
        })
        .catch((err) => console.error("Attributes fetch failed", err));
      getTokenAccount(id as number)
        .then((res) => setTokenAccount(res))
        .catch((err) => console.error("Set token account failed", err));
    }
    getClaimsImgSrc();
  }, [id]);

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
      className={`block shadow mt-1 w-[41%] mx-auto lg:h-fit md:h-[300px] p-2  rounded-[20px]`}
    >
      <div
        suppressHydrationWarning
        style={{ backgroundImage: `url('${img}')` }}
        className="bg-cover lg:w-[200px] block mx-auto lg:h-[200px] md:w-[200px] md:h-[200px] w-full h-[150px] relative rounded-[15px]"
      >
        {data &&
          Array(...claimsImgs, ...attributes)?.map(
            (attr: string, index: number) => (
              <Image
                key={index}
                src={attr}
                alt="face"
                width={30}
                height={30}
                className={`absolute bottom-[-15px] h-[30px] w-[30px] rounded-[50%]`}
                style={{ left: `${5 + index * 7}%` }}
              />
            )
          )}
      </div>
      <div className="flex items-center mt-5">
        <div className="block lg:space-y-2  space-y-1 w-full">
          <p
            className={`lg:text-[19px] text-[15px] text-black font-semibold`}
            suppressHydrationWarning
          >
            {name}
          </p>
          <div className="flex w-full lg:space-x-[45%] md:space-x-[30%] lg:justify-start md:justify-start justify-between items-center px-1 lg:px-2 pb-1 lg:pb-3">
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default NftCard;