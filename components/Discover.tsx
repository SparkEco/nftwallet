"use client";

import { getAll, getGeojson, getOwnedTokens } from "@/actions/actions";
import { useAppContext } from "@/context/AppContext";
import FilterButton from "./FilterButton";
import { useEffect, useState } from "react";
import { Map } from "mapbox-gl";
import mapboxgl from "mapbox-gl";

// interface DiscoverProps {
//   map: Map | null;
//   setDetails: (value: React.SetStateAction<any>) => void;
//   setMetadataURI: (value: React.SetStateAction<any>) => void;
//   setImgs: (value: React.SetStateAction<any>) => void;
//   setTabOpen: (value: React.SetStateAction<any>) => void;
// }

function Discover() {
  const { setGeojson, setAllData, geojson, allData } = useAppContext();
  const [selectedFilter, setSelectedFilter] = useState(0);

  // useEffect(() => {
  //   map?.scrollZoom.disable();
  //   map?.on("touchstart", (e) => {
  //     if (e.points.length === 2) {
  //       e.preventDefault();
  //     }
  //   });

  //   map?.on("load", () => {
  //     if (map) {
  //       map.addSource("mydata", {
  //         type: "geojson",
  //         data: geojson,
  //       });

  //       map.addLayer({
  //         id: "custom-layer",
  //         type: "circle",
  //         source: "mydata",
  //         paint: {
  //           "circle-radius": 6,
  //           "circle-stroke-width": 2,
  //           "circle-color": "#19c37d",
  //           "circle-stroke-color": "white",
  //         },
  //       });
  //       map.addControl(new mapboxgl.NavigationControl(), "top-right");
  //     }
  //   });
  //   console.log("map Initialized");
  //   map?.on("click", "custom-layer", (e) => {
  //     //@ts-ignore
  //     const id = e.features[0].properties.id;
  //     //@ts-ignore
  //     const foundObject = allData.find((nft) => nft.id == id);
  //     if (foundObject) {
  //       setDetails(foundObject);
  //       setMetadataURI(foundObject.ipfsUri);
  //       setImgs(foundObject.projectImages);
  //       setTabOpen(true);

  //       map?.flyTo({
  //         center: [e.lngLat.lng, e.lngLat.lat],
  //         zoom: 7,
  //         essential: true,
  //       });
  //     } else {
  //       //Happy hallowen
  //     }
  //   });

  //   return () => {
  //     if (map) {
  //       map.remove();
  //     }
  //   };
  // }, [
  //   selectedFilter,
  //   allData,
  //   geojson,
  //   map,
  //   setDetails,
  //   setMetadataURI,
  //   setImgs,
  //   setTabOpen,
  // ]);
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
      method: async function getMyImpactCerts() {
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
