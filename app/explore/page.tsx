"use client";

import { useEffect, useRef, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
import Col from "@/components/Col";
import PopupDesktop from "@/components/PopupDesktop";
import { getNftData, getGeojson } from "@/actions/actions";
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
    async function fetchData() {
      const all = await getNftData();
      setTokenURIs(all);
      const geo = await getGeojson();
      setGeojson(geo);
    }
    fetchData();
  }, []);

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
    console.log("Mounted");
    map.current.scrollZoom.disable();
    map.current.on("touchstart", (e) => {
      if (e.points.length === 2) {
        e.preventDefault();
      }
    });

    map.current.on("load", async () => {
      const json = await getGeojson();
      if (map.current) {
        map.current.addSource("mydata", {
          type: "geojson",
          data: json as any,
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

    map.current.on("click", "custom-layer", async (e) => {
      //@ts-ignore
      const id = e.features[0].properties.id;
      const all = await getNftData();
      const foundObject = all.find((nft) => nft.id == id);

      if (foundObject) {
        setDetails(foundObject);
        setImgs(foundObject.projectimages);
        setTabOpen(true);

        map.current?.flyTo({
          center: [e.lngLat.lng, e.lngLat.lat],
          zoom: 7,
          essential: true,
        });
      } else {
        console.log("Object not found.");
      }
    });

    return () => {
      if (map.current) {
        console.log("Unmounted");
        map.current.remove();
      }
    };
  }, [lng, lat, zoom]);

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
          {tokenURIs.map((nft, index) => (
            <Col
              key={index}
              id={nft.data.id}
              data={nft.data}
              img={nft.data.image}
              name={nft.data.name}
              click={selectNFT}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Main;
