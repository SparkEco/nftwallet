"use client";

import MapboxDraw from "@mapbox/mapbox-gl-draw";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import { useFormikContext } from "formik";
import mapboxgl from "mapbox-gl";
import { useEffect, useRef, useState } from "react";
interface FormMapProps {
  currentTab: number;
  handleNextClick: () => void;
  error: string | undefined | null;
}

function FormMap({ currentTab, handleNextClick, error }: FormMapProps) {
  const ACCESS_TOKEN = process.env.NEXT_PUBLIC_MAPBOX as string;
  mapboxgl.accessToken = ACCESS_TOKEN;
  const mapContainer = useRef<HTMLDivElement>(null);

  const map = useRef<mapboxgl.Map | null>(null);
  const [lat, setLat] = useState(7.1881);
  const [lng, setLng] = useState(21.0938);
  const [zoom, setZoom] = useState(1);
  const { values, setFieldValue } = useFormikContext<any>();

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
      map.current.on("load", () => {
        if (map.current !== null) {
          map.current.addControl(draw, "top-right");

          if (values.coordinates && values.coordinates.length !== 0) {
            var feature = {
              type: "Point",

              coordinates: values.coordinates,
            };
            //@ts-ignore
            draw.add(feature);
          }
        }
      });
      map.current.on("draw.create", function (e) {
        const coordi = e.features[0].geometry.coordinates;
        setFieldValue("coordinates", coordi);
      });
    } else if (map.current) {
      map.current.remove();
      map.current = null;
    }
  }, [currentTab, zoom, lat, lng]);
  return (
    <div className={`space-y-6 ${currentTab == 2 ? "block" : "hidden"}`}>
      <div
        ref={mapContainer}
        className={`block w-full lg:h-[300px] h-[250px] rounded-lg`}
      />
      <p className={`text-center text-[20px] font-bold mt-8`}>
        Pick your project location
      </p>
      <p
        className={`text-red-500 ${
          error ? "block" : "hidden"
        } text-center text-[13px] italic my-1`}
      >
        {error}
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
  );
}

export default FormMap;
