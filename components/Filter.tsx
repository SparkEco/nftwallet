"use client";

import { useEffect, useState } from "react";
import { getOwnedTokens } from "@/actions/clientActions";
import { getAll, getGeojson } from "@/actions/serverActions";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount } from "wagmi";
import { useDispatch } from "react-redux";
import { getData } from "@/redux/slices/nfts.slice";
import { setGeoJson } from "@/redux/slices/geojson.slice";
import FilterButton from "./FilterButton";

interface FilterProps {
  issuer?: string | null;
}

function Filter({ issuer }: FilterProps) {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  let currentFilter =
    parseInt(window.sessionStorage.getItem("filter") as string) || 0;
  const [selectedFilter, setSelectedFilter] = useState(currentFilter);
  const { isConnected } = useAccount();
  const { open } = useWeb3Modal();
  const filters = [
    {
      name: "Listings",
      method: async function getListings() {
        try {
          dispatch(getData([]));
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
          window.sessionStorage.setItem("filter", "0");
          let listings = await getAll();
          if (listings !== undefined) {
            let geo = await getGeojson(listings);
            dispatch(setGeoJson(geo));
            dispatch(getData(listings));
          }
        } catch (error) {
          console.error("Error setting data:", error);
        }
      },
    },

    {
      name: "My ImpactCerts",
      method: async function getMyImpactCerts() {
        try {
          if (!isConnected) {
            await open();
          }
          dispatch(getData([]));
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
          window.sessionStorage.setItem("filter", "1");
          let ownedNfts = await getOwnedTokens();
          if (ownedNfts !== undefined) {
            let geo = await getGeojson(ownedNfts);
            dispatch(setGeoJson(geo));
            dispatch(getData(ownedNfts));
          }
        } catch (err) {
          console.error("Failed to fetch owned NFTS:", err);
        }
      },
    },
  ];
  useEffect(() => {
    if (issuer) {
      setSelectedFilter(3);
    }
  }, [issuer]);
  const start = issuer?.slice(0, 6);
  const finish = issuer?.slice(-5);
  return (
    <div className={`block lg:w-[80%] w-[90%] mx-auto relative`}>
      <div
        className={`flex w-full justify-start px-6 border items-center my-[20px] shadow mx-auto h-[70px] rounded-lg`}
      >
        <div className={`flex space-x-2`}>
          {filters.map((item, index) => (
            <FilterButton
              key={index}
              name={item.name}
              click={() => {
                item.method();
                setSelectedFilter(index);
              }}
              isSelected={selectedFilter === index}
            />
          ))}
          {issuer && (
            <div className={`flex space-x-1 items-center`}>
              <p className={`text-[12px]`}>You are filtering by account:</p>
              <FilterButton
                name={`${start}...${finish}`}
                click={() => {}}
                isSelected
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Filter;
