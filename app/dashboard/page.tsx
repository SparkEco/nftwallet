"use client";

import { getTokensByParams } from "@/actions/serverActions";
import { NFTData } from "@/redux/types";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { ClipLoader } from "react-spinners";
import dynamic from "next/dynamic";
const DynamicCol = dynamic(() => import("@/components/Col"), {
  loading: () => (
    <div
      className={`w-[200px] space-x-5 lg:h-[200px] h-[150px] flex items-center justify-center`}
    >
      <ClipLoader size={25} color={`#3D00B7`} />
    </div>
  ),
});

function Page() {
  const { address } = useAccount();
  const [data, setData] = useState<NFTData[]>();
  useEffect(() => {
    (async () => {
      const myNfts = await getTokensByParams(address as string);
      if (myNfts) {
        setData(myNfts);
      }
    })();
  }, [address]);

  return (
    <div className={`block py-9 w-full h-fit`}>
      <h1 className={`text-center text-[20px] font-bold`}>My ImpactCerts</h1>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 md:gap-5 lg:gap-5 grid-cols-2 gap-y-5 gap-x-2 mx-auto w-[80%] mt-[50px]">
        {data &&
          data.length > 0 &&
          data.map((nft) => <DynamicCol key={nft.id} data={nft} />)}
      </div>
    </div>
  );
}

export default Page;
