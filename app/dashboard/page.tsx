"use client";

import { revenueOf } from "@/actions/serverActions";
import { getNotListed, withdrawRevenue } from "@/actions/clientActions";
import { NFTData } from "@/redux/types";
import { useEffect, useState } from "react";
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import { ClipLoader } from "react-spinners";
import dynamic from "next/dynamic";
import Image from "next/image";
import { IBM_Plex_Sans } from "next/font/google";
import Link from "next/link";
import Mint from "@/components/Mint";
import CardSkeleton from "@/components/CardSkeleton";
import { BrowserProvider } from "ethers";
import { ApolloProvider, gql, useQuery } from "@apollo/client";
import { apolloclient } from "@/actions/apollo";

const DashCard = dynamic(() => import("@/components/DashCard"), {
  loading: () => (
    <div
      className={`w-[200px] space-x-5 lg:h-[200px] h-[150px] flex items-center justify-center`}
    >
      <ClipLoader size={25} color={`#3D00B7`} />
    </div>
  ),
});

const myFont = IBM_Plex_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "700"],
});

function Page() {
  const { address } = useWeb3ModalAccount();

  const [revenue, setRevenue] = useState(0);
  const [currentTab, setCurrentTab] = useState(1);
  const { walletProvider } = useWeb3ModalProvider();
  const handleClick = async () => {
    if (walletProvider) {
      await withdrawRevenue(new BrowserProvider(walletProvider));
    }
  };
  // useEffect(() => {
  //   if (address) {
  //     (async () => {
  //       const rev = await revenueOf(address);
  //       if (rev) {
  //         setRevenue(rev);
  //       }
  //     })();
  //   }
  // }, [address]);

  return (
    <ApolloProvider client={apolloclient}>
      <div className={`block w-full h-[100vh] !bg-[#edf1f2]`}>
        <div className={`flex w-full lg:space-x-3 md:space-x-3 space-x-0`}>
          <div
            className={`lg:block h-[100vh] md:block hidden w-[22%] p-7 bg-[#36454F]`}
          >
            <div className={`space-y-2 block`}>
              <Image
                src={`/logo2.png`}
                alt="logo"
                width={50}
                height={50}
                className={`lg:w-[50px] lg:h-[50px] w-[30px] h-[30px] block mx-auto`}
              />
              <h1
                className={`text-[22px] font-bold text-[#3D00B7] text-center ${myFont.className}`}
              >
                Dashboard
              </h1>
            </div>

            <ul className={`space-y-3 mt-9 text-[15px]`}>
              <li
                className={`cursor-pointer text-slate-500 px-2 h-[40px] flex items-center hover:bg-slate-500 hover:!text-white hover:rounded hover:opacity-75 ${
                  currentTab === 1 &&
                  ` bg-slate-500  !text-white rounded-lg opacity-40`
                }`}
              >
                <Link href={`#impactcerts`} onClick={() => setCurrentTab(1)}>
                  My ImpactCerts
                </Link>
              </li>
              {/* <li
              className={`cursor-pointer text-slate-500 px-2 h-[40px] flex items-center hover:bg-slate-500 hover:!text-white hover:rounded hover:opacity-75 ${
                currentTab === 2 &&
                ` bg-slate-500  !text-white rounded-lg opacity-40`
              }`}
            >
              <Link href={`#withdraw`} onClick={() => setCurrentTab(2)}>
                Withdraw Revenue
              </Link>
            </li> */}
            </ul>
          </div>
          <div
            className={`block lg:w-[77%] md:w-[77%] w-full h-full space-y-2`}
          >
            <div
              className={`h-[83px] mt-2 w-full flex bg-[#ffffff] rounded-[20px] lg:px-3 md:px-3 px-1`}
            >
              <ul
                className={`flex w-full lg:space-x-7 lg:text-[15px] text-[13px] space-x-2 justify-center items-center`}
              >
                <li className="hover:text-sky-500 cursor-pointer">
                  <Link href={"/"}>Home</Link>
                </li>
                <li className="hover:text-sky-500 cursor-pointer">
                  <Link href={`/explore`}>Explore</Link>
                </li>
                <li className="hover:text-sky-500 cursor-pointer">About</li>
                <li className="hover:text-sky-500 cursor-pointer">Resources</li>
                <li className={`lg:block md:block hidden`}>
                  <w3m-button size="md" />
                </li>
                <li className={`lg:hidden md:hidden block`}>
                  <w3m-button size="sm" balance="hide" />
                </li>
                <li>
                  <Mint>
                    <button
                      className={`hover:text-white text-[#3D00B7] border lg:block hidden rounded-[25px] hover:bg-[#3D00B7] active:opacity-70 h-[35px] text-center text-[10px] lg:px-2 px-1 lg:text-[15px]`}
                    >
                      Create ImpactCert
                    </button>
                  </Mint>
                </li>
              </ul>
            </div>
            <div
              className={`block w-full h-[86vh] overflow-y-auto lg:p-6 md:p-4 p-3 rounded-[20px] bg-[#ffffff]`}
            >
              <h1
                className={`text-center text-[18px] font-bold`}
                id="impactcerts"
              >
                My ImpactCerts
              </h1>
              <div className="grid lg:grid-cols-4 md:grid-cols-3 md:gap-5 lg:gap-4 grid-cols-2 gap-y-5 gap-x-2 mx-auto w-full mt-[35px]">
                <CardState />
              </div>
              <div
                className={`block w-full h-[200px] mt-[150px]`}
                id="withdraw"
              >
                <h1 className={`text-center text-[18px] font-bold`}>
                  Withdraw Revenue
                </h1>
                <div
                  className={`flex items-center rounded-[15px] space-x-5 w-full p-[40px]`}
                >
                  <p className={`text-[17px]`}>
                    Available Revenue: {revenue}ETH
                  </p>
                  <button
                    onClick={handleClick}
                    disabled={revenue === 0}
                    className={`w-fit border rounded-[12px] bg-[#3D00B7] disabled:bg-slate-500 text-white hover:opacity-75 active:opacity-60 h-[30px] flex justify-center items-center px-2`}
                  >
                    Withdraw
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ApolloProvider>
  );
}

export default Page;

function CardState() {
  const [nftdata, setNftdata] = useState<NFTData[]>();
  let GET_TOKENS = gql`
    query GetTokens($filter: String!) {
      tokens(orderBy: tokenId, where: { isListed: false, owner: $filter }) {
        tokenId
        tokenAccount
        ipfsUri
        owner
      }
    }
  `;
  const { address } = useWeb3ModalAccount();

  const { loading, error, data } = useQuery(GET_TOKENS, {
    variables: { filter: address?.toLowerCase() },
  });
  useEffect(() => {
    if (data && address) {
      (async () => {
        console.log("Get shit");
        //console.log("data:", data, "Error:", error);
        let get = await getNotListed(data.tokens);
        //console.log("NFT data:", get);
        setNftdata(get);
      })();
    }
  }, [data, address]);
  if (nftdata && nftdata.length > 0) {
    return nftdata.map((nft) => <DashCard key={nft.id} nftdata={nft} />);
  } else if (nftdata && nftdata.length === 0) {
    return (
      <div className={`w-[100%] space-y-3 p-3`}>
        <p className={`text-center`}>You have no ImpactCerts</p>;
        <Mint>
          <button
            className={`hover:text-white text-[#3D00B7] border mx-auto lg:block hidden rounded-[25px] hover:bg-[#3D00B7] active:opacity-70 h-[35px] text-center px-2 text-[15px]`}
          >
            Create ImpactCert
          </button>
        </Mint>
      </div>
    );
  } else {
    return [1, 2, 3].map((item) => <CardSkeleton key={item} />);
  }
}
