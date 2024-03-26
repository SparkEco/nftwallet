"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import { useEffect, useRef, useState } from "react";
import NftCard from "./NftCard";
import { MultiFile, SingleFile } from "./FileUpload";
import { useWeb3ModalProvider } from "@web3modal/ethers/react";
import FormMap from "./FormMap";

import Minting from "./Minting";
import UploadNft, { NftProps } from "@/actions/upload";
import { BrowserProvider } from "ethers";

interface ImageWrapperProps {
  image: any;
  name: string;
}
const ImageWrapper = ({ name, image }: ImageWrapperProps) => {
  const [imgSrc, setImgsrc] = useState("");
  useEffect(() => {
    (async () => {
      let src = await extractBase64(image);
      if (src) {
        setImgsrc(src);
      }
    })();
  }, [image]);
  return <NftCard name={name} img={imgSrc} />;
};

async function extractBase64(file: any) {
  if (file) {
    const reader = new FileReader();

    const loadImage = () => {
      return new Promise<string>((resolve, reject) => {
        reader.onload = () => {
          resolve(reader.result as string);
        };
        reader.onerror = reject;
      });
    };

    reader.readAsDataURL(file);

    try {
      const base64Data = await loadImage();
      return base64Data;
    } catch (error) {
      console.error("Error loading image:", error);
      return undefined;
    }
  }
}

interface FormProps {
  setOpen: (value: React.SetStateAction<boolean>) => void;
}

function FormikForm({ setOpen }: FormProps) {
  const [currentTab, setCurrentTab] = useState<number>(0);
  const [showProgress, setShowProgress] = useState(false);
  const [stage, setStage] = useState(0);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const { walletProvider } = useWeb3ModalProvider();
  const numTabs = 4;
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
          onClick={() => setCurrentTab(i)}
        ></div>
      );
    }
    return tabs;
  };

  return (
    <Formik
      initialValues={{
        name: "",
        description: "",
        image: null,
        projectimages: null,
        nftcover: null,
        coordinates: null,
      }}
      validate={(values) => {
        let errors: any = {};
        if (!values.name) {
          errors.name = "Name is required";
        } else if (!values.description) {
          errors.description = "Description is required";
        } else if (!values.image) {
          errors.image = "Image is required";
        } else if (!values.projectimages) {
          errors.projectimages = "Project images is required";
        } else if (!values.nftcover) {
          errors.nftcover = "Cover image is required";
        } else if (!values.coordinates) {
          errors.coordinates = "Coordinates is required";
        }
        return errors;
      }}
      onSubmit={async (values, { setSubmitting }) => {
        if (walletProvider && buttonRef.current) {
          buttonRef.current.click();
          // console.log(values);
          await UploadNft(
            values,
            setStage,
            new BrowserProvider(walletProvider)
          );
          setShowProgress(false);
          setOpen(false);
        }
      }}
    >
      {({ values, isSubmitting, errors, handleChange, handleBlur }) => (
        <div className={`block w-[42vw] p-6 relative`}>
          <div className="flex justify-center items-center">{renderTabs()}</div>
          <Form
            className={`block relative mx-auto border rounded-xl py-2 w-[90%] p-5 lg:h-[71vh] h-[71vh]`}
          >
            <div
              className={`space-y-6 mt-7 ${
                currentTab === 0 ? "block" : "hidden"
              }`}
            >
              <fieldset className={`block space-y-3`}>
                <Field
                  placeholder="Name"
                  name="name"
                  type="text"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                  className={`ps-5 block mx-auto outline-none w-[93%] h-[35px] rounded-[15px] border`}
                />
                <ErrorMessage
                  name="name"
                  className={`text-red-500 ps-[20px] text-[13px] italic`}
                  component={"p"}
                />
              </fieldset>
              <fieldset className={`block space-y-3`}>
                <Field
                  as="textarea"
                  name="description"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.description}
                  placeholder="Describe your NFT"
                  className={`p-4 block mx-auto w-[93%] outline-none h-[140px] rounded-[15px] border`}
                />
                <ErrorMessage
                  name="description"
                  className={`text-red-500 text-[13px] ps-[20px] italic`}
                  component={"p"}
                />
              </fieldset>
              <button
                type="button"
                className={`${
                  currentTab <= 2 ? "block" : "hidden"
                } bg-[#3D00B7] w-[100px] absolute bottom-10 disabled:bg-slate-600 disabled:hover:opacity-100 right-6 rounded-lg h-[30px] text-white hover:opacity-60 block`}
                onClick={() => handleNextClick()}
              >
                Next
              </button>
            </div>
            <div className={`${currentTab === 1 ? "block" : "hidden"}`}>
              <fieldset className={`w-full block outline-none`}>
                <label
                  className={`ps-5 block font-[500] outline-none`}
                  htmlFor="image"
                >
                  NFT Image
                </label>
                <SingleFile
                  id="image"
                  name="image"
                  type="file"
                  accept="image/*"
                />
                <ErrorMessage
                  name="image"
                  className={`text-red-500 text-[13px] ps-[20px] italic`}
                  component={"p"}
                />
              </fieldset>
              <fieldset className={`w-full block outline-none`}>
                <label
                  className={`ps-5 block font-[500] outline-none`}
                  htmlFor="projectimages"
                >
                  Project Images
                </label>
                <MultiFile
                  id="projectimages"
                  name="projectimages"
                  type="file"
                  accept="image/*"
                  multiple
                />
                <ErrorMessage
                  name="projectimages"
                  className={`text-red-500 text-[13px] ps-[20px] italic`}
                  component={"p"}
                />
              </fieldset>
              <fieldset>
                <label
                  htmlFor="nftcover"
                  className={`ps-5 outline-none block my-2 text-[17px]`}
                >
                  Cover Image
                </label>
                <SingleFile
                  name="nftcover"
                  type="file"
                  id="nftcover"
                  accept="image/*"
                />
                <ErrorMessage
                  name="nftcover"
                  className={`text-red-500 text-[13px] ps-[20px] italic`}
                  component={"p"}
                />
              </fieldset>
              <button
                type="button"
                className={`${
                  currentTab <= 2 ? "block" : "hidden"
                } bg-[#3D00B7] w-[100px] absolute bottom-10 disabled:bg-slate-600 disabled:hover:opacity-100 right-6 rounded-lg h-[30px] text-white hover:opacity-60 block`}
                onClick={() => handleNextClick()}
              >
                Next
              </button>
            </div>
            <FormMap
              currentTab={currentTab}
              handleNextClick={handleNextClick}
              error={errors.coordinates}
            />
            <div className={`${currentTab == 3 ? "block" : "hidden"} `}>
              <h1 className={`text-center text-[18px] font-bold`}>Preview</h1>
              <div className={`block mx-auto w-full`}>
                <ImageWrapper name={values.name} image={values.image} />
                <div
                  className={`${
                    Object.values(errors).length !== 0 ? "flex" : "hidden"
                  } rounded-[20px] bg-red-100 border border-red-400 mt-[15px] text-red-400 w-[60%] italic mx-auto justify-center items-center h-[25px] text-[12px]`}
                >
                  <p>Please Complete form</p>
                </div>
              </div>
            </div>
            <button
              disabled={isSubmitting}
              type="submit"
              className={`${
                currentTab === 3 ? "block" : "hidden"
              } bg-[#3D00B7] w-[100px] disabled:bg-slate-400 absolute bottom-2 right-6 rounded-lg h-[30px] text-white hover:opacity-60 flex justify-center items-center`}
            >
              <span>Submit</span>
              {isSubmitting && (
                <svg
                  viewBox="0 0 24 24"
                  className={`animate-spin ml-1 h-4 w-4`}
                >
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
          </Form>
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
      )}
    </Formik>
  );
}

export default FormikForm;
