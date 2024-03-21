"use client";

import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
const Popup = dynamic(() => import("@/components/Popup"));
import { NFTData } from "@/redux/types";
import dynamic from "next/dynamic";

interface MapProps {
  geojson: any;
  setTabOpen: Dispatch<SetStateAction<boolean>>;
  details: NFTData;
  setDetails: Dispatch<SetStateAction<NFTData | undefined>>;
  tabOpen: boolean;
  isLoading: boolean;
  data: NFTData[];
}

function Map({
  geojson,
  setTabOpen,
  isLoading,
  details,
  tabOpen,
  setDetails,
  data,
}: MapProps) {
  const ACCESS_TOKEN = process.env.NEXT_PUBLIC_MAPBOX as string;
  mapboxgl.accessToken = ACCESS_TOKEN;
  let mapContainer = useRef<HTMLDivElement | null>(null);
  let map = useRef<mapboxgl.Map | null>(null);
  const [lat, setLat] = useState(7.1881);
  const [lng, setLng] = useState(21.0938);
  const [zoom, setZoom] = useState(2);
  useEffect(() => {
    if (!isLoading && map.current === null && mapContainer.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/dark-v11",
        center: [lng, lat],
        zoom: zoom,
        projection: {
          name: "mercator",
        },
      });

      map.current.scrollZoom.disable();
      map.current.on("touchstart", (e) => {
        if (e.points.length === 2) {
          e.preventDefault();
        }
      });
      map.current.on("load", () => {
        if (map.current) {
          map.current.addSource("mydata", {
            type: "geojson",
            data: geojson,
          });
          map.current.addLayer({
            id: "custom-layer",
            type: "circle",
            source: "mydata",
            paint: {
              "circle-radius": 6,
              "circle-stroke-width": 2,
              "circle-color": "#19c37d",
              "circle-stroke-color": "white",
            },
          });
          map.current.addControl(new mapboxgl.NavigationControl(), "top-right");
        }
      });
      map.current.on("click", "custom-layer", (e) => {
        //@ts-ignore
        const id = e.features[0].properties.id;
        //@ts-ignore
        const foundObject = data.find((nft) => nft.id == id);
        if (foundObject) {
          setDetails(foundObject);

          setTabOpen(true);
          map.current?.flyTo({
            center: [e.lngLat.lng, e.lngLat.lat],
            zoom: 7,
            essential: true,
          });
        } else {
          //Happy hallowen
        }
      });
      // if (urlSelect) {
      //   let nft = datae.find((nft) => nft.id === urlSelect);
      //   if (nft) {
      //     pickNft(nft);
      //   }
      // }
    }
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [lng, lat, zoom, isLoading, setDetails, data, setTabOpen, geojson]);
  const pickNft = (data: NFTData) => {
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
  const selectNFT = (e: React.MouseEvent<HTMLDivElement>, data: NFTData) => {
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
    <div
      ref={mapContainer}
      className="block mt-[80px] h-[500px] lg:h-[630px] relative"
    >
      {details != undefined && tabOpen ? (
        <Popup setTabOpen={setTabOpen} details={details} tabOpen={tabOpen} />
      ) : null}
    </div>
  );
}

export default Map;
