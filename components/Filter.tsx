"use client";

import { useState } from "react";
import { getOwnedTokens } from "@/actions/clientActions";
import { getAll, getGeojson } from "@/actions/serverActions";

import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount } from "wagmi";
import { useDispatch } from "react-redux";
import { getData } from "@/redux/slices/nfts.slice";
import { setGeoJson } from "@/redux/slices/geojson.slice";
import FilterButton from "./FilterButton";

function Filter() {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(0);
  const { isConnected } = useAccount();
  const { open } = useWeb3Modal();
  const filters = [
    {
      name: "Listings",
      method: async function getListings() {
        try {
          let listings = await getAll();
          if (listings !== undefined) {
            dispatch(getData([]));
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
          let ownedNfts = await getOwnedTokens();
          if (ownedNfts !== undefined) {
            dispatch(getData([]));
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
  const handleClick = () => {
    setShow((prevShow) => !prevShow);
  };
  const applyFilter = () => {
    filters[selectedFilter].method();
    setShow(false);
  };

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
        </div>
      </div>
    </div>
  );
}

export default Filter;
