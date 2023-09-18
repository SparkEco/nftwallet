/* eslint-disable @typescript-eslint/no-unused-vars */
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import geodata from "../components/geolocation.json";
import { IoChevronBackSharp, IoChevronForwardSharp } from "react-icons/io5";
import Share from "../components/Share";
import Col from "../components/Col";
import { MdClose } from "react-icons/md";

function Explorer() {
  const ACCESS_TOKEN = import.meta.env.VITE_MAPBOX;
  const BASE_URL = import.meta.env.PROD
    ? import.meta.env.VITE_IMAGE_BASE_URL2
    : import.meta.env.VITE_IMAGE_BASE_URL;

  mapboxgl.accessToken = ACCESS_TOKEN;
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [details, setDetails] = useState<GeoJSON.GeoJsonProperties | undefined>(
    undefined
  );

  const [lat] = useState(39.8283);
  const [lng] = useState(-98.5795);
  const [zoom] = useState(2);
  const [curImage, setcurImg] = useState(0);
  const [imgs, setImgs] = useState<string[] | string>("");

  const [tabOpen, setTabOpen] = useState(false);
  const ANIM_DURATION = 300;
  const mountedClass = "dimo_mounted";
  const unmountingClass = "dimo_unmounting";

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
      console.log("component unmounted");
      map.current?.remove();
    };
  }, []);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
        <div
          className={`absolute dimo ${
            tabOpen ? mountedClass : unmountingClass
          } lg:block hidden lg:top-[30px] top-[30px] opacity-70 left-0 lg:w-[400px] w-[250px] space-y-5 lg:h-[80vh] h-[40vh] bg-zinc-900/90 rounded-[10px] backdrop-blur p-4 overflow-y-auto text-white`}
          style={{ animationDuration: `${ANIM_DURATION}ms` }}
        >
          <p className={`text-white text-center text-[18px] font-semibold`}>
            {details.name}
          </p>
          <div className="block lg:w-[320px] relative lg:h-[200px] h-[180px] w-[220px] mx-auto">
            <button
              className={`absolute top-[40%] bg-zinc-900/40 disabled:bg-[#80808080] left-4 rounded-[50%] hover:opacity-75 p-1`}
              onClick={prevImg}
              disabled={curImage == 0}
            >
              <IoChevronBackSharp size={26} color={`#ffffff`} />
            </button>
            <img
              loading="eager"
              src={`${BASE_URL}${imgs[curImage]}`}
              alt="Image"
              className="block mx-auto rounded-[15px] lg:w-[320px] lg:h-[200px] w-[220px] h-[160px]"
            />
            <button
              disabled={curImage == imgs.length - 1 ? true : false}
              className={`absolute top-[40%] bg-zinc-900/40 disabled:bg-[#80808080] right-4 rounded-[50%] hover:opacity-75 p-1`}
              onClick={nextImg}
            >
              <IoChevronForwardSharp size={26} color={`#ffffff`} />
            </button>
          </div>
          <img
            src={`${BASE_URL}${details.nftimg}`}
            alt="NFT"
            className={`block mx-auto rounded-[13px] w-[150px] h-[150px] border`}
          />
          <h1
            className={`text-white lg:text-[19px] text-[15px] font-semibold text-left`}
          >
            Description
          </h1>
          <p className={`text-white lg:text-[13px] text-[11px]`}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore,
            deleniti eos nihil, dolores iusto excepturi nostrum exercitationem
            mollitia, ut fugiat id! Corrupti laboriosam voluptates minima
            eveniet quibusdam enim perferendis cum!
          </p>
          <h1
            className={`text-center lg:text-[19px] text-[15px] font-semibold`}
          >
            Owners
          </h1>
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
      {details != null && tabOpen ? (
        <div
          className={`fixed dimo ${
            tabOpen ? mountedClass : unmountingClass
          } bottom-0 text-white lg:hidden md:hidden block h-[45vh] z-10 space-y-2 rounded-t-[25px] overflow-y-scroll px-2 py-4 w-full bg-neutral-800`}
          style={{ animationDuration: `${ANIM_DURATION}ms` }}
        >
          <button
            className={`p-1 rounded-[50%] bg-white lg:hidden block border absolute right-2 top-2`}
            onClick={() => setTabOpen(false)}
          >
            <MdClose size={16} color={"#000000"} />
          </button>
          <p className={`text-center text-[20px] font-semibold`}>
            {details?.name}
          </p>
          <div className="block h-[180px] w-[220px] mx-auto">
            <button
              className={`absolute top-[30%] bg-zinc-900/40 disabled:bg-[#80808080] left-4 rounded-[50%] hover:opacity-75 p-1`}
              onClick={prevImg}
              disabled={curImage == 0}
            >
              <IoChevronBackSharp size={26} color={`#ffffff`} />
            </button>
            <img
              loading="eager"
              src={`src/assets${imgs[curImage]}`}
              alt="Image"
              className="block mx-auto rounded-[15px] lg:w-[320px] lg:h-[200px] w-[220px] h-[160px]"
            />
            <button
              disabled={curImage == imgs.length - 1 ? true : false}
              className={`absolute top-[30%] bg-zinc-900/40 disabled:bg-[#80808080] right-4 rounded-[50%] hover:opacity-75 p-1`}
              onClick={nextImg}
            >
              <IoChevronForwardSharp size={26} color={`#ffffff`} />
            </button>
          </div>
          <img
            src={`src/assets${details?.nftimg}`}
            alt="NFT"
            className={`block mx-auto rounded-[13px] w-[150px] h-[150px] border`}
          />
          <h1 className={`lg:text-[19px] text-[15px] font-semibold text-left`}>
            Description
          </h1>
          <p className={`text-[12px]`}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore,
            deleniti eos nihil, dolores iusto excepturi nostrum exercitationem
            mollitia, ut fugiat id! Corrupti laboriosam voluptates minima
            eveniet quibusdam enim perferendis cum!
          </p>
          <h1
            className={`text-center lg:text-[19px] text-[15px] font-semibold`}
          >
            Owners
          </h1>
          <div className={`flex justify-between px-3`}>
            <p>Address</p>
            <p>Share</p>
          </div>
          <Share
            address="0x9c277ee7ef6974c73e51421419ff973579fd1d53"
            percentage="4.33"
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
    </div>
  );
}

export default Explorer;
