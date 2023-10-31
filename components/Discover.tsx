"use client";

import { getAll, getGeojson } from "@/actions/actions";
import { useAppContext } from "@/context/AppContext";
import FilterButton from "./FilterButton";
import { useState } from "react";

function Discover() {
  const { setGeojson, setAllData } = useAppContext();
  const [selectedFilter, setSelectedFilter] = useState(0);
  const filters = [
    {
      name: "Listings",
      method: async function getListings() {
        try {
          const listings = await getAll();
          if (listings !== undefined) {
            const geo = await getGeojson(listings);
            setGeojson(geo);
            setAllData(listings);
          }
        } catch (error) {
          console.error("Error setting data:", error);
        }
      },
    },

    {
      name: "My ImpactCerts",
      method: async function getOwnedTokens() {
        try {
          const ownedNfts = await getOwnedTokens();
          if (ownedNfts !== undefined) {
            const geo = await getGeojson(ownedNfts);
            setAllData(ownedNfts);
            setGeojson(geo);
          }
        } catch (err) {
          console.error("Failed to fetch owned NFTS:", err);
        }
      },
    },
  ];

  return (
    <div className="flex gap-x-4 items-center bg-[#D9E0EC] my-[10px] py-[10px] px-3">
      <ul className={`flex gap-x-4`}>
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
      </ul>
    </div>
  );
}

export default Discover;
