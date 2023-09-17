"use client";

import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useRef, useState } from "react";
import mapboxgl, { MapboxGeoJSONFeature } from "mapbox-gl";
import geodata from "../../components/geolocation.json";
import Image from "next/image";
import { IoChevronBackSharp, IoChevronForwardSharp } from "react-icons/io5";
import Share from "@/components/Share";
import Discover from "@/components/Discover";
import Col from "@/components/Col";

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
  const [zoom, setZoom] = useState(3);
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

  function selectNFT(data: any) {
    const details = data.properties;
    setDetails(details);
    setImgs(details ? details.images : "");
    setcurImg(0);
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
    <div className={`relative`}>
      <div ref={mapContainer} className="block mt-7 h-[600px]" />
      {details != undefined ? (
        <div
          className={`absolute block top-[30px] opacity-70 left-3 w-[400px] space-y-5 h-[80vh] bg-zinc-900/90 rounded-[10px] backdrop-blur p-4 overflow-y-auto text-white`}
        >
          <p className={`text-white text-center text-[18px] font-semibold`}>
            {details.name}
          </p>
          <div className="block w-[320px] relative h-[200px] mx-auto">
            <button
              className={`absolute top-[40%] bg-zinc-900/40 disabled:bg-[#80808080] left-4 rounded-[50%] hover:opacity-75 p-1`}
              onClick={prevImg}
              disabled={curImage == 0}
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
              disabled={curImage == imgs.length - 1 ? true : false}
              className={`absolute top-[40%] bg-zinc-900/40 disabled:bg-[#80808080] right-4 rounded-[50%] hover:opacity-75 p-1`}
              onClick={nextImg}
            >
              <IoChevronForwardSharp size={26} color={`#ffffff`} />
            </button>
          </div>
          <Image
            src={details.nftimg}
            alt="NFT"
            width={150}
            height={150}
            className={`block mx-auto rounded-[13px] w-[150px] h-[150px] border`}
          />
          <h1 className={`text-white text-[19px] font-semibold text-left`}>
            Description
          </h1>
          <p className={`text-white text-[13px]`}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore,
            deleniti eos nihil, dolores iusto excepturi nostrum exercitationem
            mollitia, ut fugiat id! Corrupti laboriosam voluptates minima
            eveniet quibusdam enim perferendis cum!
          </p>
          <h1 className={`text-center text-[19px] font-semibold`}>Owners</h1>
          <div className={`flex justify-between px-3`}>
            <p>Address</p>
            <p>Share</p>
          </div>
          <Share
            address="0x9c277ee7ef6974c73e51421419ff973579fd1d53"
            percentage="22.40"
          />
          <Share
            address="0x9c277ee7ef6974c73e51421419ff973579fd1d53"
            percentage="0.73"
          />
          <Share
            address="0x10cb0ab131f5bb879f7b91c86c9d48f971b6ba27"
            percentage="1.44"
          />
          <Share
            address="0x9c277ee7ef6974c73e51421419ff973579fd1d53"
            percentage="2.32"
          />
          <Share
            address="0x9c277ee7ef6974c73e51421419ff973579fd1d53"
            percentage="11.00"
          />
          <Share
            address="0x9c277ee7ef6974c73e51421419ff973579fd1d53"
            percentage="7.01"
          />
          <Share
            address="0x9c277ee7ef6974c73e51421419ff973579fd1d53"
            percentage="4.33"
          />
          <Share
            address="0x9c277ee7ef6974c73e51421419ff973579fd1d53"
            percentage="5.08"
          />
          <Share
            address="0x9c277ee7ef6974c73e51421419ff973579fd1d53"
            percentage="2.99"
          />
        </div>
      ) : null}
      <div className="flex justify-center my-11">
        <div className="grid lg:grid-cols-4 lg:gap-10">
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
    </div>
  );
}

export default Main;
