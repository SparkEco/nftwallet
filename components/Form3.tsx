"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { RenderElement } from "./FormElements";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";

export interface FormState {
  name: string;
  description: string;
  image: string;
  country: string;
  state: string;
}

const PreviewText = ({ value }: { value: string }) => {
  return (
    <div
      className={`w-[80%] bg-neutral-200 h-fit lg:p-[20px] md:p-[20px] xl:p-[20px] p-[10px] items-center justify-center rounded-lg text-center ${
        value ? "flex" : "hidden"
      } mx-auto`}
    >
      <p>{value}</p>
    </div>
  );
};

function Form3() {
  const initialState: FormState = {
    name: "",
    description: "",
    image: "",
    country: "",
    state: "",
  };
  const [viewImage, setViewImage] = useState({
    image: false,
  });

  const [formData, setFormData] = useState<FormState>(initialState);

  const [currentView, setCurrentView] = useState(0);
  const { name, description, image, country, state } = formData;
  return (
    <div
      className={`lg:flex md:flex xl:flex block items-center space-y-2 w-full form-body justify-between`}
    >
      <div
        className={`lg:h-[100%] md:h-[100%] xl:h-[100%] h-[49.8%] lg:w-[49.8%] md:w-[49.8%] xl:w-[49.8%] w-full mx-auto space-y-3 block bg-white p-[20px]`}
      >
        <PreviewText value={name} />
        <PreviewText value={description} />
        {image && (
          <Image
            src={image}
            width={500}
            height={500}
            alt="Nft Image"
            className={`w-[76%] xl:h-[400px] lg:h-[400px] md:h-[400px] h-[200px] rounded-[10px] block mx-auto`}
          />
        )}
        <PreviewText value={country} />
        <PreviewText value={state} />
      </div>
      <form
        className={`lg:w-[49.8%] md:w-[49.8%] xl:w-[49.8%] w-full relative bg-white lg:h-full md:h-full xl:h-full h-[49.8%]`}
      >
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
          className={`w-[105px] space-x-1 flex absolute bottom-[10px] right-[15px]`}
        >
          <motion.button
            type="button"
            whileHover={{ scale: 1.1, transition: { duration: 0.3 } }}
            whileTap={{ scale: 0.9 }}
            disabled={currentView === 0}
            onClick={() => {
              setCurrentView((p) => {
                if (p > 0) {
                  return p - 1;
                }
                return p;
              });
            }}
            className={`rounded-full bg-black disabled:opacity-[0.2] shadow flex justify-center items-center w-[35px] h-[35px]`}
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
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1, transition: { duration: 0.3 } }}
            whileTap={{ scale: 0.9 }}
            disabled={currentView === 4}
            type="button"
            onClick={() => {
              setCurrentView((p) => {
                if (p + 1 === 5) {
                  return p;
                }
                return p + 1;
              });
            }}
            className={`rounded-full bg-black disabled:opacity-[0.2] shadow flex justify-center items-center h-[35px] w-[35px]`}
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
          </motion.button>
        </div>
      </form>
    </div>
  );
}

export default Form3;
