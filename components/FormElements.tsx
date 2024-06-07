"use client";

import { motion } from "framer-motion";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import Image from "next/image";
import { readFileAsDataURL } from "@/utils/read-images-as-data-url";
import React, { SetStateAction, Dispatch } from "react";
import { Input } from "./ui/input";
import { FormState } from "./Form3";
import CountrySelect from "./CountrySelect";
import StateSelect from "./StateSelect";

interface RenderElementProps {
  index: number;
  setFormData: Dispatch<SetStateAction<FormState>>;
  formData: FormState;
  setViewImage: Dispatch<SetStateAction<boolean>>;
  viewImage: boolean;
}

export const RenderElement = React.memo(
  ({
    index,
    setFormData,
    formData,
    setViewImage,
    viewImage,
  }: RenderElementProps) => {
    const handleFileChange = async (
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      const { name, files } = event.currentTarget;
      try {
        if (files) {
          if (event.target.multiple) {
            const sourcePromises = Array.from(files).map(readFileAsDataURL);
            const sourceArray = await Promise.all(sourcePromises);
            setFormData((p) => ({
              ...p,
              projectImages: sourceArray,
            }));
          }
          const file = files[0];
          const srcPromise = readFileAsDataURL(file);
          const imageSrc = await Promise.resolve(srcPromise);
          setFormData((p) => ({
            ...p,
            [name]: imageSrc,
          }));
        }
        if (name === "image") {
          setViewImage(true);
        }
      } catch (e) {
        console.error(e);
      }
    };

    const FormElements = [
      <fieldset className={`w-full space-y-2`} key={1}>
        <Label className={`flex items-center space-x-1`}>
          <span className={`text-[17px]`}>1</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
            fill="#000000"
            viewBox="0 0 16 16"
            className="shouldFlipIfRtl"
          >
            <path d="M8.47 1.97a.75.75 0 0 1 1.06 0l4.897 4.896a1.25 1.25 0 0 1 0 1.768L9.53 13.53a.75.75 0 0 1-1.06-1.06l3.97-3.97H1.75a.75.75 0 1 1 0-1.5h10.69L8.47 3.03a.75.75 0 0 1 0-1.06"></path>
          </svg>
          <span className={`text-[17px]`}>
            What is the <b>name</b> of your NFT?
          </span>
        </Label>
        <motion.input
          initial={{ borderBottomWidth: "0.3px" }}
          animate={{ borderBottomWidth: "3px" }}
          transition={{ delay: 0.8, duration: 0.6, ease: "easeInOut" }}
          className={` border-neutral-700 border-0 w-full text-[17px] outline-none h-[45px]`}
          name="name"
        />
      </fieldset>,
      <fieldset className={`w-full space-y-2`} key={2}>
        <Label className={`flex items-center space-x-1`}>
          <span className={`text-[17px]`}>2</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
            fill="#000000"
            viewBox="0 0 16 16"
            className="shouldFlipIfRtl"
          >
            <path d="M8.47 1.97a.75.75 0 0 1 1.06 0l4.897 4.896a1.25 1.25 0 0 1 0 1.768L9.53 13.53a.75.75 0 0 1-1.06-1.06l3.97-3.97H1.75a.75.75 0 1 1 0-1.5h10.69L8.47 3.03a.75.75 0 0 1 0-1.06"></path>
          </svg>
          <span className={`text-[17px]`}>Describe your NFT</span>
        </Label>
        <Textarea
          className={`border w-full h-[300px] rounded-[10px]`}
          name="description"
        />
      </fieldset>,
      <div className={`block space-y-2 w-full`} key={3}>
        <p className={`flex space-x-2 items-center`}>
          <span>3</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
            fill="#000000"
            viewBox="0 0 16 16"
            className="shouldFlipIfRtl"
          >
            <path d="M8.47 1.97a.75.75 0 0 1 1.06 0l4.897 4.896a1.25 1.25 0 0 1 0 1.768L9.53 13.53a.75.75 0 0 1-1.06-1.06l3.97-3.97H1.75a.75.75 0 1 1 0-1.5h10.69L8.47 3.03a.75.75 0 0 1 0-1.06"></path>
          </svg>
          <span className={`text-[17px]`}>Select an Image</span>
        </p>
        <div
          className={`border relative lg:w-[600px] flex items-center justify-center md:w-[550px] lg:md:mx-0 mx-auto w-[300px] h-[400px] rounded-[10px]`}
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
            src={formData.image}
            alt="Nft Image"
            width={600}
            height={400}
            className={`lg:w-[600px] absolute ${
              viewImage ? "block" : "hidden"
            } top-0 right-0 md:w-[550px] w-[300px] h-full rounded-[10px]`}
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
              !viewImage && formData.image ? "block" : "hidden"
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
      <div className={`block space-y-2 w-full`} key={4}>
        <p className={`flex space-x-2 items-center`}>
          <span>4</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
            fill="#000000"
            viewBox="0 0 16 16"
            className="shouldFlipIfRtl"
          >
            <path d="M8.47 1.97a.75.75 0 0 1 1.06 0l4.897 4.896a1.25 1.25 0 0 1 0 1.768L9.53 13.53a.75.75 0 0 1-1.06-1.06l3.97-3.97H1.75a.75.75 0 1 1 0-1.5h10.69L8.47 3.03a.75.75 0 0 1 0-1.06"></path>
          </svg>
          <span className={`text-[17px]`}>Select a cover Image</span>
        </p>
        <div
          className={`border relative lg:w-[600px] flex items-center justify-center md:w-[550px] lg:md:mx-0 mx-auto w-[300px] h-[400px] rounded-[10px]`}
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
            src={formData.coverImage}
            alt="Nft Image"
            width={600}
            height={400}
            className={`lg:w-[600px] absolute ${
              viewImage ? "block" : "hidden"
            } top-0 right-0 md:w-[550px] w-[300px] h-full rounded-[10px]`}
          />

          <fieldset className={`w-[250px] mx-auto`}>
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
              Select a cover image for the NFT
            </label>
          </fieldset>
          <button
            type="button"
            onClick={() => {
              setViewImage(true);
            }}
            className={`absolute text-[12px] top-3 ${
              !viewImage && formData.image ? "block" : "hidden"
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
      <div className={`block space-y-2 w-full`} key={5}>
        <p className={`flex space-x-2 items-center`}>
          <span>5</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
            fill="#000000"
            viewBox="0 0 16 16"
            className="shouldFlipIfRtl"
          >
            <path d="M8.47 1.97a.75.75 0 0 1 1.06 0l4.897 4.896a1.25 1.25 0 0 1 0 1.768L9.53 13.53a.75.75 0 0 1-1.06-1.06l3.97-3.97H1.75a.75.75 0 1 1 0-1.5h10.69L8.47 3.03a.75.75 0 0 1 0-1.06"></path>
          </svg>
          <span className={`text-[17px]`}>Select project Images</span>
        </p>
        <div
          className={`border relative lg:w-[600px] flex items-center justify-center md:w-[550px] lg:md:mx-0 mx-auto w-[300px] h-[400px] rounded-[10px]`}
        >
          <fieldset className={`w-[250px] mx-auto`}>
            <Input
              type="file"
              name="image"
              onChange={handleFileChange}
              accept="image/*"
              id="image"
              multiple
              className={`file:bg-purple-200 ${
                !viewImage ? "block" : "hidden"
              } file:text-purple-700 border-0 w-[200px] mx-auto file:h-[20px] file:rounded-[5px] file:border-0`}
            />
            <label htmlFor="image" className={"italic font-semibold"}>
              Select project images for the NFT
            </label>
          </fieldset>
        </div>
      </div>,
      <CountrySelect setState={setFormData} key={6} />,
      <StateSelect country={formData.country} setState={setFormData} key={7} />,
    ];

    return (
      <div className={`w-full h-[100vh] relative justify-center`}>
        <motion.div
          initial={{
            top: "0%",
            left: "50%",
            translateX: "-50%",
            translateY: "0%",
            opacity: 0,
          }}
          animate={{
            top: "50%",
            left: "50%",
            translateX: "-50%",
            translateY: "-50%",
            opacity: 1,
          }}
          exit={{ y: "100vh", opacity: 0 }}
          transition={{ ease: "easeInOut", duration: 0.5 }}
          className={`lg:w-[550px] md:w-[500px] absolute flex justify-center w-[300px] mx-auto`}
        >
          {FormElements[index]}
        </motion.div>
      </div>
    );
  }
);