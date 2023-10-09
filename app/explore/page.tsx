"use client";

import { useEffect, useRef, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
import geodata from "@/components/geolocation.json";
import Col from "@/components/Col";
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
  const [imgs, setImgs] = useState<string[] | string>("");
  const [attributes, setAttributes] = useState<string[]>([]);
  const [tabOpen, setTabOpen] = useState(false);
  const [tokenURIs, setTokenURIs] = useState<any[]>([]);
  const [coordinates, setCoordinates] = useState<any[]>([]);
  const [geojson, setGeojson] = useState<any>();
  const [tokenName, setTokenName] = useState<string>("");

  useEffect(() => {
    const initializeMap = () => {
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
        const ind = e.lngLat.lng;

        const foundObject = tokenURIs.find((nft) => nft.coordinates[0] == ind);

        if (foundObject) {
          setDetails(foundObject);
          setImgs(foundObject.projectimages);
          setTabOpen(true);

          map.current?.flyTo({
            center: [e.lngLat.lng, e.lngLat.lat],
            zoom: 10,
            essential: true,
          });
          // setZoom(17);
          // setLng(e.lngLat.lng);
          // setLat(e.lngLat.lat);

          // Use tokenURI as needed
          console.log("Token URI:");
        } else {
          console.log("Object not found.");
        }
      });
    };

    initializeMap();

    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, [lng, lat, zoom, geojson]);

  useEffect(() => {
    async function getNftData() {
      const nfts: any[] = [];
      try {
        const uris = await getTokenURI();

        // Use Promise.all to wait for all fetch operations to complete
        await Promise.all(
          uris.map(async (url) => {
            const res = await fetch(url);
            const data = await res.json();
            nfts.push(data);
          })
        );

        console.log("Operation Successful");
      } catch (err) {
        console.error("Operation Failed", err);
      }
      //console.log(nfts);
      return nfts;
    }

    const getAll = async () => {
      if (isConnected) {
        const allNfts = await getNftData();
        setTokenURIs(allNfts);
      }
    };

    const getGeojson = async () => {
      if (isConnected) {
        const allNfts = await getNftData();
        const coo = allNfts.map((nft: any) => nft.coordinates);
        const geojson = {
          type: "FeatureCollection",
          features: coo.map((coord: any, index) => {
            return {
              type: "Feature",
              properties: {
                id: index,
              },
              geometry: {
                type: "Point",
                coordinates: coord,
              },
            };
          }),
        };
        setGeojson(geojson);
      }
    };

    getAll();
    getGeojson();
  }, [isConnected]);

  function selectNFT(e: React.MouseEvent<HTMLDivElement>, data: any) {
    if (e.target instanceof HTMLDivElement) {
      setAttributes(attributes);
      setDetails(data);
      setImgs(data ? data.projectimages : "");
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
    }
  }
  //console.log(tokenURIs);

  return (
    <div className={`relative h-full bg-[]`}>
      <div
        ref={mapContainer}
        className="block mt-[80px] h-[500px] lg:h-[630px]"
      />
      {details != undefined && tabOpen ? (
        <PopupDesktop
          setTabOpen={setTabOpen}
          details={details}
          tabOpen={tabOpen}
          imgs={imgs as string[]}
        />
      ) : null}
      <div className="flex justify-center py-11 w-full">
        <div className="grid lg:grid-cols-4 md:grid-cols-3 md:gap-10 lg:gap-10 grid-cols-2 gap-y-4 gap-x-2">
          {isConnected &&
            tokenURIs.map((nft, index) => (
              <Col
                key={index}
                data={nft}
                img={nft.image}
                name={nft.name}
                click={selectNFT}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default Main;
