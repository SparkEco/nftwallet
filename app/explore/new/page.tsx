"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import "mapbox-gl/dist/mapbox-gl.css";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import mapboxgl from "mapbox-gl";
import { IoChevronBackSharp } from "react-icons/io5";
import Col from "@/components/Col";
import UploadNft, { NftProps } from "@/actions/upload";
import Minting from "@/components/Minting";

interface FormState {
  name: string;

  coordinates: number[];
  description: string;
  nftcover: File | null;
  image: File | null;
  projectimages: File[] | null;
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
  const [nftimgData, setNftImageData] = useState("");
  const [coverimgData, setCoverData] = useState("");
  const [projectimgData, setProjectImageData] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
  const [stage, setStage] = useState(1);

  const numTabs = 4;
  const tabRefs = useRef<Array<HTMLDivElement | null>>([]);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const handleNextClick = () => {
    if (currentTab < numTabs - 1) {
      setCurrentTab(currentTab + 1);
    }
  };
  const options = [
    { value: "regen", label: "Regen" },
    { value: "depin", label: "Depin" },
    { value: "defi", label: "Defi" },
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

  const [inputValues, setInputValues] = useState<FormState>({
    name: "",
    image: null,
    nftcover: null,
    coordinates: [],
    description: "",

    projectimages: null,
  });

  useEffect(() => {
    const draw = new MapboxDraw({
      controls: {
        line_string: false,
        polygon: false,
        combine_features: false,
        uncombine_features: false,
      },
    });
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
  }, [currentTab, lng, lat, zoom, inputValues]);

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
      const result = await UploadNft(inputValues as NftProps, setStage);
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
      setIsLoading(false);
    } else console.log("Fill all your inputs");
    setIsLoading(false);
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
        onSubmit={handleSubmit}
        className={`block relative  mx-auto border rounded-xl py-4 w-[95%] lg:mt-[30px] mt-[20px] p-5 `}
      >
        <h1 className={`text-center font-semibold text-[22px]`}>Create NFT</h1>

        {currentTab == 0 && (
          <div className={`space-y-6 mt-7 lg:h-[70vh] h-[50vh]`}>
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
          <div className={`space-y-6 mt-7 lg:h-[70vh] h-[60vh]`}>
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
          <div className={`lg:h-[70vh] h-[70vh]`}>
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
          <div className={`lg:h-[80vh] h-[60vh] p-5 block`}>
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
          } bg-[#3D00B7] w-[100px] disabled:bg-slate-400 absolute bottom-10 right-6 rounded-lg h-[30px] text-white hover:opacity-60 block`}
        >
          Submit
        </button>
      </form>
      <Minting
        stage={stage}
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

export default CreateNFT;
