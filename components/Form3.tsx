"use client";

import { AllImageData } from "@/app/create/page";
import { Input } from "./ui/input";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { Label } from "./ui/label";

function Form3() {
  const [viewImage, setViewImage] = useState(false);
  const [dataUrl, setDataUrl] = useState<AllImageData>({
    image: "",
  });
  const Field = ({
    label,
    children,
  }: {
    label: string;
    children: React.ReactNode;
  }) => {
    return (
      <fieldset className={`w-full`}>
        <Label className={`font-semibold text-[17px]`}>
          {label}
          {children}
        </Label>
      </fieldset>
    );
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = event.currentTarget;
    if (files) {
      const file = files[0]; // Get the first selected file
      //   setInputs((prev) => ({
      //     ...prev,
      //     [name]: file,
      //   }));
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageSrc = e.target?.result as string;
        setDataUrl((prev) => ({
          ...prev,
          [name]: imageSrc,
        }));
      };
      reader.readAsDataURL(file);
    }
    if (name === "image") {
      setViewImage(true);
    }
  };

  const [currentView, setCurrentView] = useState(0);
  const FormElements = [
    <div className={`w-full flex justify-center items-center h-[100vh]`}>
      <div className={`w-[700px] space-y-3`}>
        <Field label={`1-> What is the name of your NFT?`}>
          <input
            className={`!border-b-[2px] border-black border-0 w-full outline-none h-[50px]`}
            name="name"
          />
        </Field>
      </div>
    </div>,
    <div className={`w-full flex justify-center items-center h-[100vh]`}>
      <div className={`w-[700px] space-y-3`}>
        <Field label={`Describe your NFT project`}>
          <Input
            className={`!border-b border-0 w-full h-[50px]`}
            name="description"
          />
        </Field>
      </div>
    </div>,
    <div className={`w-full flex justify-center`}>
      <div
        className={`border relative lg:w-[600px] flex items-center justify-center md:w-[550px] lg:md:mx-0 mx-auto w-[300px] h-[500px] rounded-[10px]`}
      >
        <button
          type="button"
          onClick={() => {
            setViewImage(false);
          }}
          className={`w-[25px] ${
            viewImage ? "block" : "hidden"
          } z-10 h-[25px] flex justify-center items-center text-[20px] rounded-full bg-black text-white absolute top-3 right-3`}
        >
          ×
        </button>
        <Image
          src={dataUrl.image}
          alt="Nft Image"
          width={600}
          height={500}
          className={`lg:w-[600px] absolute ${
            viewImage ? "block" : "hidden"
          } top-0 right-0 md:w-[550px] w-[300px] h-[500px] rounded-[10px]`}
        />

        <fieldset className={`w-[200px] mx-auto`}>
          <Input
            type="file"
            name="image"
            onChange={handleFileChange}
            accept="image/*"
            id="image"
            className={`file:bg-purple-200 ${
              !viewImage ? "block" : "hidden"
            } file:text-purple-700 border-0 w-[200px] mx-auto file:h-[20px] file:rounded-[5px] file:border-0`}
          />
          <label htmlFor="image" className={"italic font-semibold"}>
            Select an image for the NFT
          </label>
        </fieldset>
        <button
          type="button"
          onClick={() => {
            setViewImage(true);
          }}
          className={`absolute text-[12px] top-3 ${
            !viewImage && dataUrl.image ? "block" : "hidden"
          }`}
        >
          Preview
          <svg
            fill="#000000"
            version="1.1"
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            height={30}
            width={30}
            className="block mx-auto"
            viewBox="0 0 442.04 442.04"
            xmlSpace="preserve"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <g>
                <g>
                  <path d="M221.02,341.304c-49.708,0-103.206-19.44-154.71-56.22C27.808,257.59,4.044,230.351,3.051,229.203 c-4.068-4.697-4.068-11.669,0-16.367c0.993-1.146,24.756-28.387,63.259-55.881c51.505-36.777,105.003-56.219,154.71-56.219 c49.708,0,103.207,19.441,154.71,56.219c38.502,27.494,62.266,54.734,63.259,55.881c4.068,4.697,4.068,11.669,0,16.367 c-0.993,1.146-24.756,28.387-63.259,55.881C324.227,321.863,270.729,341.304,221.02,341.304z M29.638,221.021 c9.61,9.799,27.747,27.03,51.694,44.071c32.83,23.361,83.714,51.212,139.688,51.212s106.859-27.851,139.688-51.212 c23.944-17.038,42.082-34.271,51.694-44.071c-9.609-9.799-27.747-27.03-51.694-44.071 c-32.829-23.362-83.714-51.212-139.688-51.212s-106.858,27.85-139.688,51.212C57.388,193.988,39.25,211.219,29.638,221.021z"></path>
                </g>
                <g>
                  <path d="M221.02,298.521c-42.734,0-77.5-34.767-77.5-77.5c0-42.733,34.766-77.5,77.5-77.5c18.794,0,36.924,6.814,51.048,19.188 c5.193,4.549,5.715,12.446,1.166,17.639c-4.549,5.193-12.447,5.714-17.639,1.166c-9.564-8.379-21.844-12.993-34.576-12.993 c-28.949,0-52.5,23.552-52.5,52.5s23.551,52.5,52.5,52.5c28.95,0,52.5-23.552,52.5-52.5c0-6.903,5.597-12.5,12.5-12.5 s12.5,5.597,12.5,12.5C298.521,263.754,263.754,298.521,221.02,298.521z"></path>
                </g>
                <g>
                  <path d="M221.02,246.021c-13.785,0-25-11.215-25-25s11.215-25,25-25c13.786,0,25,11.215,25,25S234.806,246.021,221.02,246.021z"></path>
                </g>
              </g>
            </g>
          </svg>
        </button>
      </div>
    </div>,
    <div className={`w-full flex justify-center`}>
      <div
        className={`border relative lg:w-[600px] flex items-center justify-center md:w-[550px] lg:md:mx-0 mx-auto w-[300px] h-[500px] rounded-[10px]`}
      >
        <button
          type="button"
          onClick={() => {
            setViewImage(false);
          }}
          className={`w-[25px] ${
            viewImage ? "block" : "hidden"
          } z-10 h-[25px] flex justify-center items-center text-[20px] rounded-full bg-black text-white absolute top-3 right-3`}
        >
          ×
        </button>
        <Image
          src={dataUrl.image}
          alt="Nft Image"
          width={600}
          height={500}
          className={`lg:w-[600px] absolute ${
            viewImage ? "block" : "hidden"
          } top-0 right-0 md:w-[550px] w-[300px] h-[500px] rounded-[10px]`}
        />

        <fieldset className={`w-[250px] mx-auto`}>
          <Input
            type="file"
            name="coverimage"
            onChange={handleFileChange}
            accept="coverimage/*"
            id="coverimage"
            className={`file:bg-purple-200 ${
              !viewImage ? "block" : "hidden"
            } file:text-purple-700 border-0 w-[200px] mx-auto file:h-[20px] file:rounded-[5px] file:border-0`}
          />
          <label htmlFor="coverimage" className={"italic font-semibold"}>
            Select a cover image for the NFT
          </label>
        </fieldset>
        <button
          type="button"
          onClick={() => {
            setViewImage(true);
          }}
          className={`absolute text-[12px] top-3 ${
            !viewImage && dataUrl.image ? "block" : "hidden"
          }`}
        >
          Preview
          <svg
            fill="#000000"
            version="1.1"
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            height={30}
            width={30}
            className="block mx-auto"
            viewBox="0 0 442.04 442.04"
            xmlSpace="preserve"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <g>
                <g>
                  <path d="M221.02,341.304c-49.708,0-103.206-19.44-154.71-56.22C27.808,257.59,4.044,230.351,3.051,229.203 c-4.068-4.697-4.068-11.669,0-16.367c0.993-1.146,24.756-28.387,63.259-55.881c51.505-36.777,105.003-56.219,154.71-56.219 c49.708,0,103.207,19.441,154.71,56.219c38.502,27.494,62.266,54.734,63.259,55.881c4.068,4.697,4.068,11.669,0,16.367 c-0.993,1.146-24.756,28.387-63.259,55.881C324.227,321.863,270.729,341.304,221.02,341.304z M29.638,221.021 c9.61,9.799,27.747,27.03,51.694,44.071c32.83,23.361,83.714,51.212,139.688,51.212s106.859-27.851,139.688-51.212 c23.944-17.038,42.082-34.271,51.694-44.071c-9.609-9.799-27.747-27.03-51.694-44.071 c-32.829-23.362-83.714-51.212-139.688-51.212s-106.858,27.85-139.688,51.212C57.388,193.988,39.25,211.219,29.638,221.021z"></path>
                </g>
                <g>
                  <path d="M221.02,298.521c-42.734,0-77.5-34.767-77.5-77.5c0-42.733,34.766-77.5,77.5-77.5c18.794,0,36.924,6.814,51.048,19.188 c5.193,4.549,5.715,12.446,1.166,17.639c-4.549,5.193-12.447,5.714-17.639,1.166c-9.564-8.379-21.844-12.993-34.576-12.993 c-28.949,0-52.5,23.552-52.5,52.5s23.551,52.5,52.5,52.5c28.95,0,52.5-23.552,52.5-52.5c0-6.903,5.597-12.5,12.5-12.5 s12.5,5.597,12.5,12.5C298.521,263.754,263.754,298.521,221.02,298.521z"></path>
                </g>
                <g>
                  <path d="M221.02,246.021c-13.785,0-25-11.215-25-25s11.215-25,25-25c13.786,0,25,11.215,25,25S234.806,246.021,221.02,246.021z"></path>
                </g>
              </g>
            </g>
          </svg>
        </button>
      </div>
    </div>,
    <div className={`w-full flex justify-center`}>
      <div
        className={`border relative lg:w-[600px] flex items-center justify-center md:w-[550px] lg:md:mx-0 mx-auto w-[300px] h-[500px] rounded-[10px]`}
      >
        <button
          type="button"
          onClick={() => {
            setViewImage(false);
          }}
          className={`w-[25px] ${
            viewImage ? "block" : "hidden"
          } z-10 h-[25px] flex justify-center items-center text-[20px] rounded-full bg-black text-white absolute top-3 right-3`}
        >
          ×
        </button>
        <Image
          src={dataUrl.image}
          alt="Nft Image"
          width={600}
          height={500}
          className={`lg:w-[600px] absolute ${
            viewImage ? "block" : "hidden"
          } top-0 right-0 md:w-[550px] w-[300px] h-[500px] rounded-[10px]`}
        />

        <fieldset className={`w-[250px] mx-auto`}>
          <Input
            type="file"
            name="image"
            multiple
            onChange={handleFileChange}
            accept="image/*"
            id="image"
            className={`file:bg-purple-200 ${
              !viewImage ? "block" : "hidden"
            } file:text-purple-700 border-0 w-[200px] mx-auto file:h-[20px] file:rounded-[5px] file:border-0`}
          />
          <label htmlFor="image" className={"italic text-center font-semibold"}>
            Select project images for the NFT
          </label>
        </fieldset>
        <button
          type="button"
          onClick={() => {
            setViewImage(true);
          }}
          className={`absolute text-[12px] top-3 ${
            !viewImage && dataUrl.image ? "block" : "hidden"
          }`}
        >
          Preview
          <svg
            fill="#000000"
            version="1.1"
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            height={30}
            width={30}
            className="block mx-auto"
            viewBox="0 0 442.04 442.04"
            xmlSpace="preserve"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <g>
                <g>
                  <path d="M221.02,341.304c-49.708,0-103.206-19.44-154.71-56.22C27.808,257.59,4.044,230.351,3.051,229.203 c-4.068-4.697-4.068-11.669,0-16.367c0.993-1.146,24.756-28.387,63.259-55.881c51.505-36.777,105.003-56.219,154.71-56.219 c49.708,0,103.207,19.441,154.71,56.219c38.502,27.494,62.266,54.734,63.259,55.881c4.068,4.697,4.068,11.669,0,16.367 c-0.993,1.146-24.756,28.387-63.259,55.881C324.227,321.863,270.729,341.304,221.02,341.304z M29.638,221.021 c9.61,9.799,27.747,27.03,51.694,44.071c32.83,23.361,83.714,51.212,139.688,51.212s106.859-27.851,139.688-51.212 c23.944-17.038,42.082-34.271,51.694-44.071c-9.609-9.799-27.747-27.03-51.694-44.071 c-32.829-23.362-83.714-51.212-139.688-51.212s-106.858,27.85-139.688,51.212C57.388,193.988,39.25,211.219,29.638,221.021z"></path>
                </g>
                <g>
                  <path d="M221.02,298.521c-42.734,0-77.5-34.767-77.5-77.5c0-42.733,34.766-77.5,77.5-77.5c18.794,0,36.924,6.814,51.048,19.188 c5.193,4.549,5.715,12.446,1.166,17.639c-4.549,5.193-12.447,5.714-17.639,1.166c-9.564-8.379-21.844-12.993-34.576-12.993 c-28.949,0-52.5,23.552-52.5,52.5s23.551,52.5,52.5,52.5c28.95,0,52.5-23.552,52.5-52.5c0-6.903,5.597-12.5,12.5-12.5 s12.5,5.597,12.5,12.5C298.521,263.754,263.754,298.521,221.02,298.521z"></path>
                </g>
                <g>
                  <path d="M221.02,246.021c-13.785,0-25-11.215-25-25s11.215-25,25-25c13.786,0,25,11.215,25,25S234.806,246.021,221.02,246.021z"></path>
                </g>
              </g>
            </g>
          </svg>
        </button>
      </div>
    </div>,
  ];

  return (
    <div
      className={`w-full h-[100vh] flex justify-between items-center relative`}
    >
      <AnimatePresence mode={`wait`}>
        {FormElements[currentView]}
      </AnimatePresence>
      <div
        className={`w-[105px] space-x-1 flex justify-between absolute bottom-[10px] right-[15px]`}
      >
        <button
          onClick={() => {
            setCurrentView((p) => {
              if (p > 0) {
                return p - 1;
              }
              return p;
            });
          }}
          className={`rounded bg-neutral-600 shadow flex justify-center w-[50px]`}
        >
          <svg
            fill="#ffffff"
            height="20px"
            width="15px"
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 330 330"
            xmlSpace="preserve"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path
                id="XMLID_224_"
                d="M325.606,229.393l-150.004-150C172.79,76.58,168.974,75,164.996,75c-3.979,0-7.794,1.581-10.607,4.394 l-149.996,150c-5.858,5.858-5.858,15.355,0,21.213c5.857,5.857,15.355,5.858,21.213,0l139.39-139.393l139.397,139.393 C307.322,253.536,311.161,255,315,255c3.839,0,7.678-1.464,10.607-4.394C331.464,244.748,331.464,235.251,325.606,229.393z"
              ></path>
            </g>
          </svg>
        </button>
        <button
          onClick={() => {
            setCurrentView((p) => {
              if (p === FormElements.length) {
                return p;
              }
              return p + 1;
            });
          }}
          className={`rounded bg-neutral-600 shadow flex justify-center w-[50px]`}
        >
          <svg
            fill="#ffffff"
            height="20px"
            width="15px"
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 330 330"
            xmlSpace="preserve"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path
                id="XMLID_225_"
                d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393 c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393 s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z"
              ></path>
            </g>
          </svg>
        </button>
      </div>
    </div>
  );
}

export default Form3;
