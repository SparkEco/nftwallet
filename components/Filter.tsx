"use client";

import { useState } from "react";
import { useAppContext } from "@/context/AppContext";
import { getAll, getGeojson, getOwnedTokens } from "@/actions/actions";
import { NFTData } from "@/context/types";

function Filter() {
  const { setAllData, setGeojson } = useAppContext();
  const [show, setShow] = useState(false);
  const [filters, setFilters] = useState({
    ownedNfts: false,
    listing: false,
  });
  const handleClick = () => {
    setShow((prevShow) => !prevShow);
  };
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setFilters({ ...filters, [name]: checked });
  };

  const applyFilter = async () => {
    let filtered = new Set<NFTData>();
    if (filters.ownedNfts) {
      const owned = await getOwnedTokens();
      owned?.forEach((nft) => filtered.add(nft));
    }
    if (filters.listing) {
      const listed = await getAll();
      listed.forEach((nft) => filtered.add(nft));
    }

    // Convert the Set back to an array.
    const uniqueFiltered = Array.from(filtered);
    const geojson = await getGeojson(uniqueFiltered);
    setAllData(uniqueFiltered);
    setGeojson(geojson);
    console.log(uniqueFiltered);
    console.log("Filtered");
    return uniqueFiltered;
  };

  return (
    <div className={`block lg:w-[80%] w-[90%] mx-auto relative`}>
      <div
        className={`flex w-full justify-start px-6 border items-center my-[20px] shadow mx-auto h-[70px] rounded-lg`}
      >
        <button
          onClick={() => handleClick()}
          type="button"
          className={`flex w-[130px] active:opacity-60 h-[35px] rounded-[10px] border justify-center items-center space-x-2`}
        >
          Filter
          <svg
            className="-mr-1 h-5 w-5 text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      <div
        className={`${
          show ? "block" : "hidden"
        } absolute top-[70px] w-[50%] z-[29] flex p-4 bg-white shadow`}
      >
        <div className={`block w-[250px] space-y-3 rounded-lg`}>
          <div className={`block w-full p-3 border rounded-lg`}>
            <h3 className={`text-center`}>Categories</h3>
            <ul className={`space-y-3`}>
              <li className={`flex space-x-3 items-center`}>
                <input
                  type="checkbox"
                  name="listing"
                  id="listing"
                  checked={filters.listing}
                  onChange={handleCheckboxChange}
                />
                <label htmlFor="listing">Listed</label>
              </li>
              <li className={`flex space-x-3 items-center`}>
                <input
                  type="checkbox"
                  name="ownedNfts"
                  id="ownedNfts"
                  onChange={handleCheckboxChange}
                  checked={filters.ownedNfts}
                />
                <label htmlFor="ownedNfts">My Nfts</label>
              </li>
              <li className={`flex space-x-3 items-center`}>
                <input type="checkbox" name="art" id="art" />
                <label htmlFor="art">Art</label>
              </li>
            </ul>
          </div>
          <button
            className={`w-[100px] h-[35px] block mx-auto rounded-[10px] active:opacity-75 bg-[#3D00B7] text-white`}
            onClick={applyFilter}
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}

export default Filter;
