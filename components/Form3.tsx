"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { readFileAsDataURL } from "@/utils/read-images-as-data-url";
import { RenderElement } from "./FormElements";

export interface FormState {
  name: string;
  description: string;
  image: string;
  coverImage: string;
  projectImages: string[];
  country: string;
  state: string;
}

function Form3() {
  const initialState: FormState = {
    name: "",
    description: "",
    image: "",
    coverImage: "",
    country: "",
    state: "",
    projectImages: [],
  };
  const [viewImage, setViewImage] = useState(false);

  const [formData, setFormData] = useState<FormState>(initialState);

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

  const [currentView, setCurrentView] = useState(0);

  return (
    <form className={`w-full h-full`}>
      <AnimatePresence>
        <RenderElement
          setFormData={setFormData}
          formData={formData}
          viewImage={viewImage}
          setViewImage={setViewImage}
          key={currentView}
          index={currentView}
        />
      </AnimatePresence>
      <div
        className={`w-[105px] space-x-1 flex justify-between absolute bottom-[10px] right-[15px]`}
      >
        <button
          type="button"
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
          type="button"
          onClick={() => {
            setCurrentView((p) => {
              if (p + 1 === 7) {
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
    </form>
  );
}

export default Form3;
