"use client";

import { useEffect, useRef, useState } from "react";
import { NFTData } from "@/redux/types";
import { apolloclient } from "@/actions/apollo";
import { ClipLoader } from "react-spinners";
import { ApolloProvider, gql, useQuery } from "@apollo/client";
import dynamic from "next/dynamic";

import Compass from "@/components/Compass";
import Filter from "@/components/Filter";
import { getTokens } from "@/actions/clientActions";
import { getGeojson } from "@/actions/serverActions";
import Map from "@/components/Map";
const DynamicCol = dynamic(() => import("@/components/Col"), {
  loading: () => (
    <div
      className={`w-[200px] space-x-5 lg:h-[200px] h-[150px] flex items-center justify-center`}
    >
      <ClipLoader size={25} color={`#3D00B7`} />
    </div>
  ),
});

function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <ApolloProvider client={apolloclient}>
      <Explorer params={params} searchParams={searchParams} />
    </ApolloProvider>
  );
}

export default Page;

function Explorer({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  let filter = searchParams.filter as string;
  let GET_TOKENS;
  if (filter) {
    GET_TOKENS = gql`
      query GetTokens($filter: String!) {
        tokens(orderBy: tokenId, where: { owner: $filter }) {
          tokenId
          tokenAccount
          ipfsUri
          owner
        }
      }
    `;
  } else {
    GET_TOKENS = gql`
      query GetTokens {
        tokens(orderBy: tokenId, where: { isListed: true }) {
          tokenId
          tokenAccount
          ipfsUri
          isListed
          listing {
            id
            price
            owner
          }
        }
      }
    `;
  }

  const { loading, error, data } = useQuery(GET_TOKENS, {
    variables: { filter: filter },
  });

  const [nftdata, setNftdata] = useState<NFTData[]>();
  const [geojson, setGeoJson] = useState<any>();
  useEffect(() => {
    if (data) {
      (async () => {
        let get = await getTokens(data.tokens);
        setNftdata(get);
      })();
    }
  }, [data]);

  const [details, setDetails] = useState<NFTData | undefined>(undefined);
  const [tabOpen, setTabOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      if (nftdata) {
        try {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
          let geo = await getGeojson(nftdata as NFTData[]);
          setGeoJson(geo);
          setIsLoading(false);
        } catch (error) {
          console.error("Error setting data:", error);
        }
      }
    })();
  }, [nftdata]);

  let map = useRef<mapboxgl.Map | null>(null);

  const selectNFT = (e: React.MouseEvent<HTMLButtonElement>, data: NFTData) => {
    if (!(e.target instanceof HTMLDivElement)) {
      return;
    }
    setDetails(data);

    setTabOpen(true);
    map.current?.flyTo({
      center: [data.coordinates[0], data.coordinates[1]],
      zoom: 7,
      essential: true,
    });
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isLoading ? (
        <Compass />
      ) : (
        <div className={`relative h-full`}>
          <Map
            details={details as NFTData}
            geojson={geojson}
            tabOpen={tabOpen}
            data={nftdata as NFTData[]}
            setTabOpen={setTabOpen}
            isLoading={isLoading}
            setDetails={setDetails}
          />
          <Filter issuer={filter} setIsloading={setIsLoading} />
          <div className="flex justify-center py-11 w-full">
            <div className="grid lg:grid-cols-4 md:grid-cols-3 md:gap-10 lg:gap-10 grid-cols-2 gap-y-5 gap-x-2">
              {nftdata &&
                nftdata.map((nft, index) => (
                  <DynamicCol key={index} data={nft} click={selectNFT} />
                ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
