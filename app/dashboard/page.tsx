"use client";

import { getTokensByParams } from "@/actions/serverActions";
import { NFTData } from "@/redux/types";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

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
    <div className={`flex justify-center items-center w-full h-[70vh]`}>
      {data && data.length > 0 && <h1>The name is: {data[0].name}</h1>}
    </div>
  );
}

export default Page;
