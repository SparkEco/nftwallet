"use client";

import StickyFooter from "@/components/StickyFooter";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import geodata from "../../components/geolocation.json";
import Image from "next/image";
import { IoChevronBackSharp, IoChevronForwardSharp } from "react-icons/io5";

function Main() {
  const ACCESS_TOKEN =
    "pk.eyJ1IjoibWljaGFlbGNocmlzdHdpbiIsImEiOiJjbG1odXpzYjIwMTUwM2RrMHoza2R4cnIwIn0.wgeAoyvnaxTExAedlr683Q";
  mapboxgl.accessToken = ACCESS_TOKEN;
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [details, setDetails] = useState<GeoJSON.GeoJsonProperties | undefined>(
    undefined
  );
  const [lat, setLat] = useState(39.8283);
  const [lng, setLng] = useState(-98.5795);
  const [zoom, setZoom] = useState(2.5);
  const [curImage, setcurImg] = useState(0);
  const [imgs, setImgs] = useState<string[] | string>("");

  const nextImg = () => {
    setcurImg((prevInd) => (prevInd != 2 ? prevInd + 1 : prevInd));
  };

  const prevImg = () => {
    setcurImg((prevInd) => (prevInd != 0 ? prevInd - 1 : prevInd));
  };

  useEffect(() => {
    // initialize map only once
    console.log("component mounted");
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
          data: geodata as any,
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
      setImgs(specs ? JSON.parse(specs.images) : "");
      setcurImg(0);

      map.current?.flyTo({
        center: [e.lngLat.lng, e.lngLat.lat],
        zoom: 7,
        essential: true,
      });
    });
    return () => {
      console.log("component unmounted");
      map.current?.remove();
    };
  }, []);
  console.log(imgs);

  return (
    <div className={`text-center relative`}>
      <div ref={mapContainer} className="map-container h-[600px]" />
      {details != undefined ? (
        <div
          className={`fixed block top-[80px] opacity-70 left-3 w-[350px] h-[80vh] bg-zinc-900/90 rounded-[30px] backdrop-blur py-4`}
        >
          <p className={`text-white text-[18px] font-semibold`}>
            {details.name}
          </p>
          <div className="block w-[320px] relative h-[200px] mx-auto">
            <button
              className={`absolute top-[40%] bg-[#80808080] left-4 rounded-[50%] hover:opacity-75 p-1`}
              onClick={prevImg}
            >
              <IoChevronBackSharp size={26} color={`#ffffff`} />
            </button>
            <Image
              loading="eager"
              src={imgs[curImage]}
              alt="Image"
              width={320}
              height={200}
              className="block mx-auto rounded-[15px] lg:w-[320px] lg:h-[200px]"
            />
            <button
              className={`absolute top-[40%] bg-[#80808080] right-4 rounded-[50%] hover:opacity-75 p-1`}
              onClick={nextImg}
            >
              <IoChevronForwardSharp size={26} color={`#ffffff`} />
            </button>
          </div>
        </div>
      ) : null}
      {/* <StickyFooter /> */}
    </div>
  );
}

export default Main;
