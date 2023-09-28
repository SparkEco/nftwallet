"use client";

import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import geodata from "@/components/geolocation.json";
import Col from "@/components/Col";
import PopupMobile from "@/components/PopupMobile";
import PopupDesktop from "@/components/PopupDesktop";
import { getName, getTokenURI } from "@/actions/actions";
import { useAppContext } from "@/context/AppContext";

function Main() {
  const { isConnected } = useAppContext();
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
  const [tokenURIs, setTokenURIs] = useState<string[]>([]);
  const [tokenName, setTokenName] = useState<string>("");
  const [nftId, setNftId] = useState<number>(0);

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
    map.current.on("touchstart", (e) => {
      if (e.points.length === 2) {
        e.preventDefault();
      }
    });
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
      setNftId(e.features?.[0].id as number);
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

  useEffect(() => {
    isConnected &&
      getTokenURI()
        .then((res) => {
          setTokenURIs(res);
          console.log("Operation Successful");
        })
        .catch((err) => {
          console.error("Operation Failed", err);
        });
    getName()
      .then((res) => {
        setTokenName(res);
        console.log("Operation Successful");
      })
      .catch((err) => {
        console.error("Operation Failed", err);
      });
  }, [isConnected]);

  function shuffleArray(array: any[]) {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  }

  const combinedArrays = [...geodata.features, ...tokenURIs];
  const shuffledArray = shuffleArray(combinedArrays);

  function selectNFT(data: any) {
    const details = data.properties;
    setNftId(data.id);
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
      <div ref={mapContainer} className="block mt-7 h-[500px] lg:h-[630px]" />
      {details != undefined ? (
        <PopupDesktop
          nftid={nftId}
          setTabOpen={setTabOpen}
          details={details}
          tabOpen={tabOpen}
          imgs={imgs as string[]}
          prevImg={prevImg}
          nextImg={nextImg}
          currimage={curImage}
        />
      ) : null}
      <div className="flex justify-center py-11 w-full">
        <div className="grid lg:grid-cols-4 md:grid-cols-3 md:gap-10 lg:gap-10 grid-cols-2 gap-4">
          {shuffledArray.map((nft) => (
            <Col
              key={nft.id || nft}
              id={nft.id}
              data={nft}
              img={nft.properties ? nft.properties.nftimg : nft}
              name={nft.properties ? nft.properties.name : tokenName}
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
