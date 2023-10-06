"use client";

import { useEffect, useRef, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
import geodata from "@/components/geolocation.json";
import Col from "@/components/Col";
import PopupDesktop from "@/components/PopupDesktop";
import { getName, getTokenURI } from "@/actions/actions";
import { useAppContext } from "@/context/AppContext";
import Link from "next/link";
import { SearchBox } from "@mapbox/search-js-react";

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
  const [attributes, setAttributes] = useState<string[]>([]);
  const [tabOpen, setTabOpen] = useState(false);
  const [tokenURIs, setTokenURIs] = useState<string[]>([]);
  const [tokenName, setTokenName] = useState<string>("");
  const [nftId, setNftId] = useState<number>(0);

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
        map.current.addControl(new mapboxgl.NavigationControl(), "top-right");
      }
    });
    map.current.on("click", "custom-layer", (e) => {
      const specs = e.features?.[0].properties;
      setDetails(specs);
      setNftId(e.features?.[0].id as number);
      setImgs(specs ? JSON.parse(specs.images) : "");
      setAttributes(specs ? JSON.parse(specs.attributes) : []);
      setcurImg(0);
      setTabOpen(true);

      map.current?.flyTo({
        center: [e.lngLat.lng, e.lngLat.lat],
        zoom: 12,
        essential: true,
      });
      setZoom(17);
      setLng(e.lngLat.lng);
      setLat(e.lngLat.lat);
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

  function selectNFT(data: any, attributes: string[]) {
    const details = data.properties;
    setAttributes(attributes);
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
    <div className={`relative h-full bg-[]`}>
      <div
        ref={mapContainer}
        className="block mt-[80px] h-[500px] lg:h-[630px]"
      />
      {details != undefined && tabOpen ? (
        <PopupDesktop
          attributes={attributes}
          nftid={nftId}
          setTabOpen={setTabOpen}
          details={details}
          tabOpen={tabOpen}
          imgs={imgs as string[]}
          currimage={curImage}
        />
      ) : null}
      <div className="flex justify-center py-11 w-full">
        <div className="grid lg:grid-cols-4 md:grid-cols-3 md:gap-10 lg:gap-10 grid-cols-2 gap-y-4 gap-x-2">
          {geodata.features.map((nft, index) => (
            <Col
              key={nft.id}
              id={nft.id}
              attributes={nft.properties.attributes}
              data={nft}
              img={nft.properties && nft.properties.nftimg}
              name={nft.properties ? nft.properties.name : tokenName}
              click={selectNFT}
            />
          ))}
          {isConnected &&
            tokenURIs.map((nft, index) => (
              <Col
                key={nft}
                data={nft}
                img={nft}
                name={tokenName}
                click={selectNFT}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default Main;