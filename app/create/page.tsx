"use client";

import { useRef, useEffect, useState, memo, RefObject } from "react";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import mapboxgl from "mapbox-gl";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
interface Props {
  mapContainerRef: RefObject<HTMLDivElement>;
}
interface AllImageData {
  image: string;
  projectImages: string[] | undefined;
  coverImage: string;
}
interface Inputs {
  name: string;
  description: string;
  image: File | undefined;
  coverImage: File | undefined;
  projectImages: FileList | undefined;
  coordinates: number[];
}
const Field = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => {
  return (
    <fieldset className={`w-full`}>
      <Label>
        {label}
        {children}
      </Label>
    </fieldset>
  );
};
const FormMap: React.FC<Props> = memo(({ mapContainerRef }) => {
  return (
    <>
      <div
        ref={mapContainerRef}
        className={`block w-full lg:h-[300px] h-[250px] rounded-lg`}
      />
      <p className={`text-center text-[18px] font-semibold mt-8`}>
        Pick your project location
      </p>
    </>
  );
});
function Page() {
  const [inputs, setInputs] = useState<Inputs>({
    name: "",
    projectImages: undefined,
    coverImage: undefined,
    image: undefined,
    description: "",
    coordinates: [],
  });
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    setInputs((p) => ({
      ...p,
      [name]: value,
    }));
  };

  const ACCESS_TOKEN = process.env.NEXT_PUBLIC_MAPBOX as string;
  mapboxgl.accessToken = ACCESS_TOKEN;
  const mapContainer = useRef<HTMLDivElement>(null);
  const [_dataUrl, setDataUrl] = useState<AllImageData>({
    projectImages: undefined,
    image: "",
    coverImage: "",
  });

  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    const draw = new MapboxDraw({
      controls: {
        line_string: false,
        polygon: false,
        combine_features: false,
        uncombine_features: false,
      },
    });

    map.current = new mapboxgl.Map({
      container: mapContainer.current as HTMLDivElement,
      style: "mapbox://styles/mapbox/dark-v11",
      center: [21.0938, 7.1881],
      zoom: 1,
      projection: {
        name: "mercator",
      },
    });
    map.current.scrollZoom.disable();
    map.current.on("load", () => {
      if (map.current !== null) {
        map.current.addControl(draw, "top-right");
        if (inputs.coordinates.length !== 0) {
          let feature = {
            type: "Point",
            coordinates: inputs.coordinates,
          };
          //@ts-ignore]
          draw.add(feature);
        }
      }
    });
    map.current.on("draw.create", function (e) {
      const coordi = e.features[0].geometry.coordinates;
      setInputs((p) => ({
        ...p,
        coordinates: coordi,
      }));
    });

    // Cleanup function
    return () => {
      if (map.current !== null) {
        map.current.remove();
      }
    };
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = event.currentTarget;
    console.log("ran", name);
    if (files) {
      if (event.target.multiple) {
        let imageArray: string[] = [];
        setInputs((p) => ({
          ...p,
          [name]: files,
        }));
        const fileArray = Array.from(files);
        let filesProcessed = 0;
        fileArray.forEach((file, index) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            const imageSrc = e.target?.result as string;
            imageArray.push(imageSrc);
            filesProcessed++;

            // Check if all files have been processed
            if (filesProcessed === fileArray.length) {
              console.log(imageArray);
            }
          };
          reader.readAsDataURL(file);
        });
      } else {
        const file = files[0]; // Get the first selected file
        setInputs((prev) => ({
          ...prev,
          [name]: file,
        }));
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
    }
  };

  return (
    <form
      onSubmit={() => {}}
      className={`lg:md:flex block w-full h-[100vh] justify-center items-center md:space-x-[80px] lg:space-x-[5%]`}
    >
      <div
        className={`border lg:w-[600px] flex items-center justify-center md:w-[550px] lg:md:mx-0 mx-auto w-[300px] h-[500px] rounded-[10px]`}
      >
        <Input
          type="file"
          name="image"
          onChange={handleFileChange}
          accept="image/*"
          id="image"
          className={`file:bg-purple-200 file:text-purple-700 border-0 w-[200px] file:h-[20px] file:rounded-[5px] file:border-0`}
        />
      </div>
      <ScrollArea.Root className="w-[500px] h-[500px] rounded overflow-hidden shadow-blackA4 bg-white">
        <ScrollArea.Viewport className="w-full h-full rounded">
          <div className="py-[20px] px-5 space-y-[30px]">
            <div className="text-violet11 text-[20px] font-[600] leading-[18px]">
              Create
            </div>
            <Field label="Collection">
              <Select>
                <SelectTrigger className="w-full h-[50px]">
                  <SelectValue placeholder={`collection`} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </Field>

            <div className={`w-full flex relative`}>
              <Field label="Price">
                <Input
                  placeholder="0"
                  type="number"
                  pattern="[0-9]"
                  name="price"
                  className={`h-[50px] w-full`}
                  onKeyDown={(e) => {
                    if (
                      !/[0-9]/.test(e.key) &&
                      e.key !== "Backspace" &&
                      e.key !== "Delete" &&
                      e.key !== "ArrowLeft" &&
                      e.key !== "ArrowRight" &&
                      e.key !== "Tab" &&
                      e.key !== "."
                    ) {
                      e.preventDefault();
                    }
                    // Ensure only one period is allowed
                    if (e.key === "." && e.currentTarget.value.includes(".")) {
                      e.preventDefault();
                    }
                  }}
                  onChange={handleChange}
                />
              </Field>

              <Select disabled>
                <SelectTrigger className="w-[60px] absolute top-[25px] right-[7px] h-[40px]">
                  <SelectValue placeholder={`ETH`} />
                </SelectTrigger>
              </Select>
            </div>
            <Field label="Description">
              <Textarea
                name="description"
                onChange={handleChange}
                className={`w-full h-[130px] p-2`}
                id="desc"
              ></Textarea>
            </Field>

            <Field label="Cover Image">
              <Input
                type="file"
                name="coverImage"
                accept="image/*"
                onChange={handleFileChange}
                id="coverImage"
                className={`file:bg-purple-200 file:text-purple-700 file:h-[20px] file:rounded-[5px]`}
              />
            </Field>
            <Field label="Project Images">
              <Input
                type="file"
                name="projectImages"
                onChange={handleFileChange}
                multiple={true}
                accept="image/*"
                id="projectImages"
                className={`file:bg-purple-200 file:text-purple-700 file:h-[20px] file:rounded-[5px]`}
              />
            </Field>
            <FormMap mapContainerRef={mapContainer} />
            <button
              type="submit"
              className={`w-[200px] h-[40px] font-bold flex mx-auto items-center justify-center text-center rounded-[20px] text-white bg-black`}
            >
              Create
            </button>
          </div>
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar
          className="flex select-none touch-none p-0.5 bg-blackA3 transition-colors duration-[160ms] ease-out hover:bg-blackA5 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
          orientation="vertical"
        >
          <ScrollArea.Thumb className="flex-1 bg-mauve10 rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
        </ScrollArea.Scrollbar>
        <ScrollArea.Scrollbar
          className="flex select-none touch-none p-0.5 bg-blackA3 transition-colors duration-[160ms] ease-out hover:bg-blackA5 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
          orientation="horizontal"
        >
          <ScrollArea.Thumb className="flex-1 bg-mauve10 rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
        </ScrollArea.Scrollbar>
        <ScrollArea.Corner className="bg-blackA5" />
      </ScrollArea.Root>
    </form>
  );
}

export default Page;
