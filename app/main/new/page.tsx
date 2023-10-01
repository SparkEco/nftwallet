"use client";
import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
const Select = dynamic(() => import("react-select"), { ssr: false });
import { useRouter } from "next/navigation";
import "mapbox-gl/dist/mapbox-gl.css";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import mapboxgl from "mapbox-gl";
import { IoChevronBackSharp } from "react-icons/io5";

interface FormState {
  name: string;
  attributes: string | string[];
  owner: string;
  type: string;
  nftimageuri: string;
  nftimagefile: File | null;
  projectimages: File | File[] | null;
}

function CreateNFT() {
  const router = useRouter();
  const ACCESS_TOKEN = process.env.NEXT_PUBLIC_MAPBOX as string;
  mapboxgl.accessToken = ACCESS_TOKEN;
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [lat, setLat] = useState(39.8283);
  const [lng, setLng] = useState(-98.5795);
  const [zoom, setZoom] = useState(2);
  const [currentTab, setCurrentTab] = useState<number>(0);
  const numTabs = 4;
  const tabRefs = useRef<Array<HTMLDivElement | null>>([]);

  const handleNextClick = () => {
    if (currentTab < numTabs - 1) {
      setCurrentTab(currentTab + 1);
    }
  };
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];
  const renderTabs = () => {
    const tabs = [];
    for (let i = 0; i < numTabs; i++) {
      tabs.push(
        <div
          key={i}
          className={`mx-1 mt-6 rounded-lg cursor-pointer hover:h-[6px] ${
            currentTab === i
              ? "bg-[#3D00B7] h-[6px] w-[25px] lg:w-[35px]"
              : "bg-gray-400 h-[5px] lg:w-[28px] w-[20px]"
          }`}
          ref={(ref) => (tabRefs.current[i] = ref)}
          onClick={() => setCurrentTab(i)}
        ></div>
      );
    }
    return tabs;
  };
  const draw = new MapboxDraw({
    controls: {
      line_string: false,
      polygon: false,
      combine_features: false,
      uncombine_features: false,
    },
  });
  useEffect(() => {
    if (currentTab === 2) {
      // Initialize the map
      map.current = new mapboxgl.Map({
        container: mapContainer.current as HTMLDivElement,
        style: "mapbox://styles/mapbox/light-v11",
        center: [lng, lat],
        zoom: zoom,
        projection: {
          name: "mercator",
        },
      });

      // Update the map reference whenever the currentTab state changes
      map.current.on("load", () => {
        if (map.current !== null) {
          map.current.addControl(draw, "top-right");
        }
      });
    } else if (map.current) {
      // If the tab is switched away from the map, remove the map instance
      map.current.remove();
      map.current = null;
    }
  }, [currentTab]);

  const [inputValues, setInputValues] = useState<FormState>({
    name: "",
    nftimagefile: null,
    nftimageuri: "",
    owner: "",
    type: "",
    attributes: "",
    projectimages: null,
  });
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputValues({
      ...inputValues,
      [name]: value,
    });
  };
  const handleChange = (selectedOption: any) => {
    setInputValues({
      ...inputValues,
      attributes: selectedOption,
    });
  };
  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    inputName: string
  ) => {
    const file = event.target.files?.[0]; // Access the file from event
    setInputValues({
      ...inputValues,
      [inputName]: file || null, // Handle null if no file is selected
    });
  };

  return (
    <div className={`block w-full p-6 relative`}>
      <button
        onClick={() => router.back()}
        className={`absolute lg:top-[10%] lg:left-[10%] top-[4%] left-[7%] rounded-[50%] active:opacity-75 lg:w-[40px] w-[30px] lg:h-[40px] h-[30px] flex justify-center items-center bg-neutral-800/50`}
      >
        <IoChevronBackSharp size={25} color={`#ffffff`} />
      </button>
      <div className="flex justify-center items-center">{renderTabs()}</div>
      <form
        className={`block relative  mx-auto border rounded-xl py-4 lg:w-[40%] w-[300px] lg:mt-[30px] mt-[20px] p-5 `}
      >
        <h1 className={`text-center font-semibold text-[22px]`}>Create NFT</h1>
        {/* <div
          className={`absolute top-3 right-6 rounded-[50%] w-[30px] font-semibold flex justify-center items-center h-[30px] text-white bg-[#3D00B7]`}
        >
          {currentTab + 1}
        </div> */}
        {currentTab == 0 && (
          <div className={`space-y-6 mt-7 lg:h-[70vh] h-[50vh]`}>
            <input
              type="text"
              onChange={handleInputChange}
              placeholder="Name"
              value={inputValues.name}
              className={`ps-5 block mx-auto w-[93%] h-[35px] rounded-[15px] border`}
            />
            <input
              type="text"
              onChange={handleInputChange}
              value={inputValues.owner}
              placeholder="Owner"
              className={`ps-5 block mx-auto w-[93%] h-[35px] rounded-[15px] border`}
            />
            <input
              type="text"
              onChange={handleInputChange}
              value={inputValues.type}
              placeholder="Type"
              className={`ps-5 block mx-auto w-[93%] h-[35px] rounded-[15px] border`}
            />
            <Select
              options={options}
              className={`w-[93%] block mx-auto rounded-[15px]`}
              placeholder={`Attributes`}
              isMulti
              onChange={handleChange}
              closeMenuOnSelect={false}
            />
          </div>
        )}
        {currentTab == 1 && (
          <div className={`space-y-6 mt-7 lg:h-[70vh] h-[60vh]`}>
            <fieldset>
              <input
                type="text"
                onChange={handleInputChange}
                value={inputValues.nftimageuri}
                placeholder="NFT Image URI"
                className={`ps-5 block mx-auto w-[93%] h-[35px] rounded-[15px] border`}
              />
              <p className={`text-center my-2 text-[17px]`}>Or</p>
              <input
                type="file"
                onChange={(event) => handleFileChange(event, "nftimagefile")}
                name="nftimage"
                id="image"
                className={`rounded-[15px] block mx-auto mt-2 h-[30px] py-[2px] w-[93%] border ps-3`}
              />
            </fieldset>

            <input
              type="text"
              placeholder="Project Location"
              className={`ps-5 block mx-auto w-[93%] h-[35px] rounded-[15px] border`}
            />
            <fieldset className="block space-y-6 w-full">
              <label
                htmlFor="projectimages"
                className={`text-center block font-[500]`}
              >
                Project Images
              </label>
              <input
                type="file"
                onChange={(event) => handleFileChange(event, "projectimages")}
                multiple
                name="image"
                id="projectimages"
                className={`rounded-[15px] block mx-auto mt-2 h-[30px] py-[2px] w-[93%] border ps-3`}
              />
            </fieldset>
          </div>
        )}
        {currentTab == 2 && (
          <div className={`lg:h-[100vh] h-[70vh]`}>
            <div
              ref={mapContainer}
              className={`block w-full lg:h-[300px] h-[250px] rounded-lg`}
            />
          </div>
        )}
        <button
          type="button"
          className={`bg-[#3D00B7] w-[100px] absolute bottom-10 right-6 rounded-lg h-[30px] text-white hover:opacity-60 block`}
          onClick={() => handleNextClick()}
        >
          Next
        </button>
      </form>
    </div>
  );
}

export default CreateNFT;
