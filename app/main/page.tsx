"use client";

import StickyFooter from "@/components/StickyFooter";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import Image from "next/image";

const ACCESS_TOKEN =
  "pk.eyJ1IjoibWljaGFlbGNocmlzdHdpbiIsImEiOiJjbG1odXpzYjIwMTUwM2RrMHoza2R4cnIwIn0.wgeAoyvnaxTExAedlr683Q";
mapboxgl.accessToken = ACCESS_TOKEN;

function Main() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [details, setDetails] = useState<GeoJSON.GeoJsonProperties | undefined>(
    undefined
  );
  const [lat, setLat] = useState(39.8283);
  const [lng, setLng] = useState(-98.5795);
  const [zoom, setZoom] = useState(2.5);
  const [curImage, setcurImg] = useState(0);

  const nextImg = () => {
    setcurImg((prevInd) => (prevInd != 3 ? prevInd + 1 : prevInd));
  };

  const prevImg = () => {
    setcurImg((prevInd) => (prevInd != 0 ? prevInd - 1 : prevInd));
  };

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current as HTMLDivElement,
      style: "mapbox://styles/mapbox/dark-v11",
      center: [lng, lat],
      zoom: zoom,
      projection: {
        name: "mercator",
      },
    });
    map.current.on("load", () => {
      if (map.current) {
        map.current.addSource("mydata", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [
              {
                type: "Feature",
                properties: {
                  name: "Switch Maxwell",
                  owner: "Switch Inc",
                  type: "Solar ",
                  images:
                    '["/solar1.jpg", "/solar2.jpg", "/solar3.webp", "/solar4.jpg",]',
                },
                geometry: {
                  coordinates: [-108.38447773065425, 43.03475014915264],
                  type: "Point",
                },
                id: 0,
              },
              {
                type: "Feature",
                properties: {
                  name: "Switch Notus",
                  type: "Wind Turbine",
                  owner: "IChristwin",
                  images:
                    '["/solar1.jpg", "/solar2.jpg", "/solar3.webp", "/solar4.jpg",]',
                },
                geometry: {
                  coordinates: [-122.15465267738443, 37.441447001272465],
                  type: "Point",
                },
                id: 1,
              },
              {
                type: "Feature",
                properties: {
                  name: "Helios",
                  type: "Solar",
                  owner: "Switch Inc",
                  images:
                    '["/solar1.jpg", "/solar2.jpg", "/solar3.webp", "/solar4.jpg",]',
                },
                geometry: {
                  coordinates: [-99.24679723418578, 31.667566476038303],
                  type: "Point",
                },
                id: 2,
              },
              {
                type: "Feature",
                properties: {
                  name: "Switch 3",
                  type: "Solar",
                  owner: "Switch Inc",
                  images:
                    '["/solar1.jpg", "/solar2.jpg", "/solar3.webp", "/solar4.jpg",]',
                },
                geometry: {
                  coordinates: [-83.64897039156826, 33.18099360305541],
                  type: "Point",
                },
                id: 3,
              },
              {
                type: "Feature",
                properties: {
                  name: "Switch 4",
                  type: "Solar",
                  owner: "Switch Inc",
                  images:
                    '["/solar1.jpg", "/solar2.jpg", "/solar3.webp", "/solar4.jpg",]',
                },
                geometry: {
                  coordinates: [-89.57370309613208, 44.76427534751903],
                  type: "Point",
                },
                id: 4,
              },
            ],
          },
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
      }
    });
    map.current.on("click", "custom-layer", (e) => {
      const specs = e.features?.[0].properties;
      setDetails(specs);
      map.current?.flyTo({
        center: [e.lngLat.lng, e.lngLat.lat],
        zoom: 8,
        essential: true,
      });

      console.log("Event Fired");
    });
  });
  // const imagePaths = details?.images.split(",");

  // // Now 'imagePaths' should be an array of image paths
  // console.log(imagePaths);

  return (
    <div className={`text-center relative`}>
      <div ref={mapContainer} className="map-container h-[600px]" />
      {details != undefined ? (
        <div
          className={`fixed top-[80px] opacity-70 left-3 w-[350px] h-[80vh] bg-zinc-900/90 rounded-[30px] backdrop-blur py-4`}
        >
          <p className={`text-white text-[18px] font-semibold`}>
            {details.name}
          </p>
          <div className="block w-[320]">
            {/* <Image
              src={details.images[curImage]}
              alt="Image"
              width={320}
              height={200}
              className="block mx-auto"
            /> */}
          </div>
        </div>
      ) : null}
      {/* <StickyFooter /> */}
    </div>
  );
}

export default Main;
