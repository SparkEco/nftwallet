"use client";

import MapboxDraw from "@mapbox/mapbox-gl-draw";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import { Formik, Form, Field, useField } from "formik";
import mapboxgl from "mapbox-gl";
import { useState, useEffect, useRef } from "react";
import NftCard from "./NftCard";
import { MultiFile, SingleFile } from "./FileUpload";

interface FormProps {
  setOpen: (value: React.SetStateAction<boolean>) => void;
}
function FormikFile({ setOpen }: FormProps) {
  const ACCESS_TOKEN = process.env.NEXT_PUBLIC_MAPBOX as string;
  mapboxgl.accessToken = ACCESS_TOKEN;
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [lat, setLat] = useState(7.1881);
  const [lng, setLng] = useState(21.0938);
  const [zoom, setZoom] = useState(1);
  const [currentTab, setCurrentTab] = useState<number>(0);

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
      map.current = new mapboxgl.Map({
        container: mapContainer.current as HTMLDivElement,
        style: "mapbox://styles/mapbox/dark-v11",
        center: [lng, lat],
        zoom: zoom,
        projection: {
          name: "mercator",
        },
      });

      //Update the map reference whenever the currentTab state changes
      // map.current.on("load", () => {
      //   if (map.current !== null) {
      //     map.current.addControl(draw, "top-right");

      //     if (meta.value !== 0) {
      //       var feature = {
      //         type: "Point",
      //         coordinates: meta.value,
      //       };
      //       //@ts-ignore
      //       draw.add(feature);
      //     }
      //   }
      // });
      // map.current.on("draw.create", function (e) {
      //   const coordi = e.features[0].geometry.coordinates;
      //   helpers.setValue(coordi);
      // });
    } else if (map.current) {
      map.current.remove();
      map.current = null;
    }
  }, [currentTab, zoom, lat, lng]);

  return (
    <Formik
      initialValues={{
        name: "",
        image: null,
        coordinates: [],
        description: "",
        nftcover: "",
        projectimages: "",
      }}
      validate={(values) => {
        let errors: any = {};
        if (!values.image) {
          errors.image = "Image can't be null";
        }
      }}
      onSubmit={(values, { setSubmitting }) => {}}
    >
      {({ values }) => (
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
              <Field
                placeholder="Name"
                name="name"
                type="text"
                className={`ps-5 block mx-auto outline-none w-[93%] h-[35px] rounded-[15px] border`}
              />
              <Field
                as="textarea"
                name="description"
                placeholder="Describe your NFT"
                className={`p-4 block mx-auto w-[93%] outline-none h-[140px] rounded-[15px] border`}
              />

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
            <div
              className={`space-y-6 ${currentTab == 2 ? "block" : "hidden"}`}
            >
              <div
                ref={mapContainer}
                className={`block w-full lg:h-[300px] h-[250px] rounded-lg`}
              />
              <p className={`text-center text-[20px] font-bold mt-8`}>
                Pick your project location
              </p>
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
            <div className={`${currentTab == 3 ? "block" : "hidden"} `}>
              <h1 className={`text-center text-[18px] font-bold`}>Preview</h1>
              <div className={`block mx-auto w-full`}>
                <NftCard name={values.name} img={extractBase64(values.image)} />
              </div>
            </div>
          </Form>
        </div>
      )}
    </Formik>
  );
}

export default FormikFile;

function extractBase64(file: any) {
  // Get the first selected file
  if (file) {
    let imageSrc: string = "";
    const reader = new FileReader();

    reader.onload = (e) => {
      imageSrc = e.target?.result as string;
    };
    reader.readAsDataURL(file);
    return imageSrc;
  }
}
