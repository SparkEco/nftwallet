"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import "mapbox-gl/dist/mapbox-gl.css";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import mapboxgl from "mapbox-gl";
import Col from "@/components/Col";
import toast from "react-hot-toast";
import UploadNft, { NftProps, OnstageProps } from "@/actions/upload";
import Minting from "./Minting";

interface FormState {
  name: string;
  coordinates: number[];
  description: string;
  nftcover: File | null;
  image: File | null;
  projectimages: File[] | null;
}

function Form() {
  const router = useRouter();
  const ACCESS_TOKEN = process.env.NEXT_PUBLIC_MAPBOX as string;
  mapboxgl.accessToken = ACCESS_TOKEN;
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [lat, setLat] = useState(7.1881);
  const [lng, setLng] = useState(21.0938);
  const [zoom, setZoom] = useState(1);
  const [currentTab, setCurrentTab] = useState<number>(0);
  const [nftimgData, setNftImageData] = useState("");
  const [coverimgData, setCoverData] = useState("");
  const [projectimgData, setProjectImageData] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const numTabs = 4;
  const tabRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [stage, setStage] = useState(0);
  const [onStage, setOnstage] = useState<OnstageProps>({
    stage1: false,
    stage2: false,
    stage3: false,
    stage4: false,
  });
  const [showProgress, setShowProgress] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const handleNextClick = () => {
    if (currentTab < numTabs - 1) {
      setCurrentTab(currentTab + 1);
    }
  };

  const renderTabs = () => {
    const tabs = [];
    for (let i = 0; i < numTabs; i++) {
      tabs.push(
        <div
          key={i}
          className={`mx-1 mt-1 mb-4 rounded-lg cursor-pointer hover:h-[6px] ${
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

  const [inputValues, setInputValues] = useState<FormState>({
    name: "",
    image: null,
    nftcover: null,
    coordinates: [],
    description: "",

    projectimages: null,
  });

  useEffect(() => {
    if (currentTab === 2) {
      // Initialize the map
      map.current = new mapboxgl.Map({
        container: mapContainer.current as HTMLDivElement,
        style: "mapbox://styles/mapbox/dark-v11",
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
          if (inputValues.coordinates.length !== 0) {
            var feature = {
              type: "Point",
              coordinates: inputValues.coordinates,
            };
            //@ts-ignore
            draw.add(feature);
          }
        }
      });
      map.current.on("draw.create", function (e) {
        const coordi = e.features[0].geometry.coordinates;
        setInputValues({
          ...inputValues,
          coordinates: coordi,
        });
      });
    } else if (map.current) {
      // If the tab is switched away from the map, remove the map instance
      map.current.remove();
      map.current = null;
    }
  }, [currentTab]);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setInputValues({
      ...inputValues,
      [name]: value,
    });
  };

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    inputName: string
  ) => {
    const files = event.target.files; // Access the selected files from event

    if (files != null && files.length > 0) {
      if (event.target.multiple) {
        // Handle multiple files
        let imageArray: string[] = [];
        const fileArray = Array.from(files);
        fileArray.forEach((file, index) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            const imageSrc = e.target?.result as string;
            imageArray[index] = imageSrc;
          };
          reader.readAsDataURL(file);
          if (imageArray.length === fileArray.length) {
            setProjectImageData(imageArray);
          }
        });
        setInputValues({
          ...inputValues,
          [inputName]: fileArray, // Store the selected files in an array
        });
      } else {
        // Handle single file
        const file = files[0]; // Get the first selected file
        const reader = new FileReader();
        setInputValues({
          ...inputValues,
          [inputName]: file || null, // Handle null if no file is selected
        });
        reader.onload = (e) => {
          const imageSrc = e.target?.result as string;
          setNftImageData(imageSrc);
        };
        reader.readAsDataURL(file);
      }
    }
  };
  const handleFileChange2 = (
    event: React.ChangeEvent<HTMLInputElement>,
    inputName: string
  ) => {
    const files = event.target.files; // Access the selected files from event

    if (files != null && files.length > 0) {
      const file = files[0]; // Get the first selected file
      const reader = new FileReader();
      setInputValues({
        ...inputValues,
        [inputName]: file, // Handle null if no file is selected
      });
      reader.onload = (e) => {
        const imageSrc = e.target?.result as string;
        setCoverData(imageSrc);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    function isFormFilled(inputValues: FormState): boolean {
      return (
        inputValues.name !== "" &&
        inputValues.image !== null &&
        inputValues.nftcover !== null &&
        inputValues.coordinates.length > 0 &&
        inputValues.description !== "" &&
        inputValues.projectimages !== null
      );
    }

    if (isFormFilled(inputValues)) {
      console.log(isFormFilled(inputValues));
      if (buttonRef.current) {
        buttonRef.current.click();
      }
      setStage(1);
      const result = await UploadNft(
        inputValues as NftProps,
        setStage,
        setOnstage,
        onStage
      );
      setIsLoading(false);
      setInputValues({
        name: "",
        image: null,
        nftcover: null,
        coordinates: [],
        description: "",
        projectimages: null,
      });
      setNftImageData("");
      setShowProgress(false);
      toast.success("NFT Minted", {
        duration: 5000,
        position: "bottom-right",
      });
    }
    console.log("Fill all your inputs");
    setIsLoading(false);
  };
  return (
    <div className={`block w-[40vw] p-6 relative`}>
      <div className="flex justify-center items-center">{renderTabs()}</div>
      <form
        onSubmit={handleSubmit}
        className={`block relative mx-auto border rounded-xl py-2 w-[85%] p-5 lg:h-[71vh] h-[71vh]`}
      >
        {currentTab == 0 && (
          <div className={`space-y-6 mt-7`}>
            <input
              type="text"
              name="name"
              onChange={handleInputChange}
              placeholder="Name"
              value={inputValues.name}
              className={`ps-5 block mx-auto w-[93%] h-[35px] rounded-[15px] border`}
            />

            <textarea
              name="description"
              onChange={handleInputChange}
              value={inputValues.description}
              placeholder="Describe your NFT"
              className={`p-4 block mx-auto w-[93%] h-[140px] rounded-[15px] border`}
            />
          </div>
        )}
        {currentTab == 1 && (
          <div className={`space-y-6 mt-7`}>
            <fieldset className={`w-full block`}>
              <label
                htmlFor="nftimage"
                className={`ps-5  block my-2 text-[17px]`}
              >
                NFT Image
              </label>
              <input
                type="file"
                onChange={(event) => handleFileChange(event, "image")}
                name="image"
                id="image"
                className={`rounded-[15px] block text-[14px] mx-auto mt-2 h-[30px] py-[2px] w-[93%] border ps-3`}
              />
            </fieldset>

            <fieldset className="block w-full">
              <label
                htmlFor="projectimages"
                className={`ps-5 block font-[500]`}
              >
                Project Images
              </label>
              <input
                type="file"
                onChange={(event) => handleFileChange(event, "projectimages")}
                multiple
                name="image"
                id="projectimages"
                className={`rounded-[15px] text-[14px] block mx-auto mt-2 h-[30px] py-[2px] w-[93%] border ps-3`}
              />
            </fieldset>
            <fieldset className={`w-full block`}>
              <label
                htmlFor="nfcover"
                className={`ps-5  block my-2 text-[17px]`}
              >
                NFT Cover Image
              </label>
              <input
                type="file"
                onChange={(event) => handleFileChange2(event, "nftcover")}
                name="nftcover"
                id="nftimage"
                className={`rounded-[15px] block text-[14px] mx-auto mt-2 h-[30px] py-[2px] w-[93%] border ps-3`}
              />
            </fieldset>
          </div>
        )}
        {currentTab == 2 && (
          <div className={``}>
            <div
              ref={mapContainer}
              className={`block w-full lg:h-[300px] h-[250px] rounded-lg`}
            />
            <p className={`text-center text-[20px] font-bold mt-8`}>
              Pick your project location
            </p>
          </div>
        )}
        {currentTab == 3 && (
          <div className={` block`}>
            <h1 className={`text-center text-[18px] font-bold`}>Preview</h1>
            <div className={`block mx-auto`}>
              <Col name={inputValues.name} img={nftimgData} />
            </div>
          </div>
        )}
        <button
          type="button"
          className={`${
            currentTab <= 2 ? "block" : "hidden"
          } bg-[#3D00B7] w-[100px] absolute bottom-10 right-6 rounded-lg h-[30px] text-white hover:opacity-60 block`}
          onClick={() => handleNextClick()}
        >
          Next
        </button>
        <button
          disabled={isLoading}
          type="submit"
          className={`${
            currentTab == 3 ? "block" : "hidden"
          } bg-[#3D00B7] w-[100px] disabled:bg-slate-400 absolute bottom-2 right-6 rounded-lg h-[30px] text-white hover:opacity-60 flex justify-center items-center`}
        >
          <span>Submit</span>
          {isLoading && (
            <svg viewBox="0 0 24 24" className={`animate-spin ml-1 h-4 w-4`}>
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className={``}
                fill="#000000"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          )}
        </button>
      </form>
      <Minting
        stage={stage}
        onStage={onStage}
        showProgess={showProgress}
        setShowProgress={setShowProgress}
      >
        <button ref={buttonRef} className={`hidden`}>
          LOL
        </button>
      </Minting>
    </div>
  );
}

export default Form;
