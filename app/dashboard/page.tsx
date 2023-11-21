"use client";

import { getTokensByParams, revenueOf } from "@/actions/serverActions";
import { withdrawRevenue } from "@/actions/clientActions";
import { NFTData } from "@/redux/types";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { ClipLoader } from "react-spinners";
import dynamic from "next/dynamic";

const DynamicCard = dynamic(() => import("@/components/DashCard"), {
  loading: () => (
    <div
      className={`w-[200px] space-x-5 lg:h-[200px] h-[150px] flex items-center justify-center`}
    >
      <ClipLoader size={25} color={`#3D00B7`} />
    </div>
  ),
});

interface PageProps {
  setIsPopupOpen: (value: React.SetStateAction<undefined | false>) => void;
}

function Page({ setIsPopupOpen }: PageProps) {
  const { address } = useAccount();
  const [data, setData] = useState<NFTData[]>();
  const [revenue, setRevenue] = useState(0);
  const [currentTab, setCurrentTab] = useState(1);
  useEffect(() => {
    (async () => {
      const myNfts = await getTokensByParams(address as string);
      if (myNfts) {
        setData(myNfts);
      }
      const rev = await revenueOf(address as string);
      if (rev) {
        setRevenue(rev);
      }
    })();
  }, [address]);

  return (
    <div className={`block py-9 w-full h-[90vh]`}>
      <div className={`flex w-full`}>
        <div
          className={`block h-[90vh] w-[25%] border-r border-b rounded-lg border-t p-6 bg-neutral-700 text-white`}
        >
          <h1 className={`text-[20px] font-bold text-center`}>Dashboard</h1>
          <hr />
          <ul className={`text-center mt-6 space-y-3`}>
            <li
              className={`cursor-pointer hover:text-slate-500`}
              onClick={() => setCurrentTab(1)}
            >
              My ImpactCerts
            </li>
            <li
              className={`cursor-pointer hover:text-slate-500`}
              onClick={() => setCurrentTab(2)}
            >
              Withdraw Revenue
            </li>
          </ul>
        </div>
        {currentTab === 1 && (
          <div className={`block w-[75%]`}>
            <h1 className={`text-center text-[18px] font-bold`}>
              My ImpactCerts
            </h1>
            <div className="grid lg:grid-cols-4 md:grid-cols-3 md:gap-5 lg:gap-5 grid-cols-2 gap-y-5 gap-x-2 mx-auto w-full mt-[30px] px-[20px]">
              {data &&
                data.length > 0 &&
                data.map((nft) => (
                  <div className={`block space-y-2`} key={nft.id}>
                    <DynamicCard key={nft.id} data={nft} />
                  </div>
                ))}
            </div>
          </div>
        )}
        {currentTab === 2 && (
          <div className={`block w-[75%] `}>
            <h1 className={`text-center text-[18px] font-bold`}>
              Withdraw Revenue
            </h1>
            <div
              className={`flex items-center rounded-[15px] space-x-5 w-full p-[40px]`}
            >
              <p className={`text-[17px]`}>Available Revenue: {revenue}ETH</p>
              <button
                onClick={withdrawRevenue}
                disabled={revenue === 0}
                className={`w-fit border rounded-[12px] bg-[#3D00B7] disabled:bg-slate-500 text-white hover:opacity-75 active:opacity-60 h-[30px] flex justify-center items-center px-2`}
              >
                Withdraw
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Page;
