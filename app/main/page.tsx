"use client";

import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import geodata from "../../components/geolocation.json";
import Col from "@/components/Col";
import PopupMobile from "@/components/PopupMobile";
import PopupDesktop from "@/components/PopupDesktop";

function Main() {
  const ACCESS_TOKEN = process.env.NEXT_PUBLIC_MAPBOX as string;

  mapboxgl.accessToken = ACCESS_TOKEN;
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [details, setDetails] = useState<GeoJSON.GeoJsonProperties | undefined>(
    undefined
  );
  const [lat, setLat] = useState(39.8283);
  const [lng, setLng] = useState(-98.5795);
  const [zoom, setZoom] = useState(2);
  const [curImage, setcurImg] = useState(0);
  const [imgs, setImgs] = useState<string[] | string>("");
  const [tabOpen, setTabOpen] = useState(false);

  const nextImg = () => {
    setcurImg((prevInd) => (prevInd != 2 ? prevInd + 1 : prevInd));
  };

  const prevImg = () => {
    setcurImg((prevInd) => (prevInd != 0 ? prevInd - 1 : prevInd));
  };

  useEffect(() => {
    map.current = new mapboxgl.Map({
      container: mapContainer.current as HTMLDivElement,
      style: "mapbox://styles/mapbox/dark-v11",
      center: [lng, lat],
      zoom: zoom,
      projection: {
        name: "mercator",
      },
    });
    map.current.scrollZoom.disable();
    map.current.on("load", () => {
      const data = geodata.features;
      if (map.current) {
        map.current.addSource("mydata", {
          type: "geojson",
          data: geodata as GeoJSON.FeatureCollection,
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
      setTabOpen(true);

      map.current?.flyTo({
        center: [e.lngLat.lng, e.lngLat.lat],
        zoom: 7,
        essential: true,
      });
    });
    return () => {
      map.current?.remove();
    };
  }, []);

  function selectNFT(data: any) {
    const details = data.properties;
    setDetails(details);
    setImgs(details ? details.images : "");
    setcurImg(0);
    setTabOpen(true);
    map.current?.flyTo({
      center: [data.geometry.coordinates[0], data.geometry.coordinates[1]],
      zoom: 7,
      essential: true,
    });
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <div className={`relative h-full`}>
      <div ref={mapContainer} className="block mt-7 h-[600px]" />
      {details != undefined ? (
        <PopupDesktop
          setTabOpen={setTabOpen}
          details={details}
          tabOpen={tabOpen}
          imgs={imgs as string[]}
          prevImg={prevImg}
          nextImg={nextImg}
          currimage={curImage}
        />
      ) : null}
      <div className="flex justify-center my-11 w-full">
        <div className="grid lg:grid-cols-4 lg:gap-10 grid-cols-1 ">
          {geodata.features.map((nft) => (
            <Col
              key={nft.id}
              id={nft.id}
              data={nft}
              img={nft.properties.nftimg}
              name={nft.properties.name}
              click={selectNFT}
            />
          ))}
        </div>
      </div>
      {details != null && tabOpen ? (
        <PopupMobile
          setTabOpen={setTabOpen}
          details={details}
          tabOpen={tabOpen}
          imgs={imgs as string[]}
          prevImg={prevImg}
          nextImg={nextImg}
          currimage={curImage}
        />
      ) : null}
    </div>
  );
}

export default Main;
