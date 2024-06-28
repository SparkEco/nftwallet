"use client";

import { useReadContract } from "wagmi";
import Image from "next/image";
import { Address } from "viem";
import NFTABI from "@/ABIs/Proxycontract.json";
import { useEffect, useState } from "react";
interface ColMetadata {
  title: string;
  description: string;
  image: string;
}
function CollectionCard({ address }: { address: Address }) {
  const [data, setData] = useState<ColMetadata | undefined>(undefined);
  const { data: tokenURI } = useReadContract({
    address: address,
    abi: NFTABI,
    functionName: "tokenURI",
    args: [BigInt(0)],
  });
  console.log(tokenURI);
  console.log(address);
  useEffect(() => {
    (async () => {
      const res = await fetch(tokenURI as string);
      const data = await res.json();
      setData(data);
    })();
  }, [tokenURI]);
  return (
    <div className={`relative h-[350px] w-full cursor-pointer`}>
      {data && <Image alt="collection-image" src={data.image} fill />}
    </div>
  );
}

export default CollectionCard;
