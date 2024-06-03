"use client";

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
//import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import mapboxgl from "mapbox-gl";

import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";

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
      <Label className={`font-semibold`}>
        {label}
        {children}
      </Label>
    </fieldset>
  );
};

function Page() {
  const [inputs, setInputs] = useState<Inputs>({
    name: "",
    projectImages: undefined,
    coverImage: undefined,
    image: undefined,
    description: "",
    coordinates: [],
  });
  const circleRadius = 30;
  const circleCircumference = 2 * Math.PI * circleRadius;
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
  const [viewAdvanced, setViewAdvanced] = useState(false);
  const [_dataUrl, setDataUrl] = useState<AllImageData>({
    projectImages: undefined,
    image: "",
    coverImage: "",
  });
  const toggleAdvanced = () => {
    setViewAdvanced((p) => !p);
  };

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
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
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
  };
  return (
    <form
      onSubmit={() => {}}
      className={`lg:md:flex block w-full h-[100vh] justify-center pt-[110px] md:space-x-[80px] lg:space-x-[5%]`}
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
      <div className="w-[450px] h-[500px] py-[20px] px-5 space-y-[30px]">
        <div className="text-violet11 text-[23px] font-[600] leading-[18px]">
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
              onKeyDown={handleKeyDown}
              className={`h-[50px] w-full`}
              onChange={handleChange}
            />
          </Field>

          <Select disabled>
            <SelectTrigger className="w-[60px] absolute top-[25px] right-[7px] h-[40px]">
              <SelectValue placeholder={`ETH`} />
            </SelectTrigger>
          </Select>
        </div>
        <p
          onClick={toggleAdvanced}
          className={`underline text-[13px] hover:no-underline cursor-pointer text-neutral-500 text-center`}
        >
          {viewAdvanced ? "Hide" : "View"} advanced options
        </p>
        <div
          className={`${
            viewAdvanced ? "block" : "hidden"
          } toggle-content w-full px-1 space-y-4`}
        >
          <Field label="Mint duration">
            <Select>
              <SelectTrigger className="w-full h-[50px]">
                <SelectValue placeholder={`4 Hours`} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1 hour">1 Hour</SelectItem>
                <SelectItem value="4 hours">4 Hours</SelectItem>
                <SelectItem value="24 hours">24 Hours</SelectItem>
                <SelectItem value="3 days">3 Days</SelectItem>
                <SelectItem value="1 week">1 Week</SelectItem>
                <SelectItem value="1 month">1 Month</SelectItem>
                <SelectItem value="3 months">3 Months</SelectItem>
                <SelectItem value="6 months">6 Months</SelectItem>
                <SelectItem value="open">Open</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <div className={`block py-4 px-5 bg-neutral-100 h-[70px] rounded-lg`}>
            <fieldset className={`flex space-x-3 items-center`}>
              <Checkbox id="first" className={``} disabled />
              <label
                htmlFor="first"
                className={`text-neutral-600 font-semibold`}
              >
                Mint first edition
              </label>
            </fieldset>
          </div>
          <Tabs defaultValue="account" className="w-full">
            <TabsList className="grid w-full grid-cols-3 h-[60px]">
              <TabsTrigger value="account" className={`h-[50px]`}>
                Me
              </TabsTrigger>
              <TabsTrigger value="password" className={`h-[50px]`}>
                Split
              </TabsTrigger>
              <TabsTrigger value="else" className={`h-[50px] `}>
                Else
              </TabsTrigger>
            </TabsList>

            <TabsContent value="password">
              <Card>
                <CardContent className="space-y-3 !px-0 py-4">
                  <div className="space-y-1 px-4">
                    <Input
                      id="address"
                      type="text"
                      className={`placeholder:text-neutral-400 h-[50px]`}
                      placeholder={`Enter address or ENS...`}
                    />
                  </div>
                  <div
                    className={`w-full flex justify-between items-center px-4`}
                  >
                    <div
                      className={`w-[30px] h-[30px] bg-orange-600 rounded-full`}
                    ></div>
                    <p className={`text-neutral-600`}>
                      0x6dF9...30fbf
                      <span className={`text-neutral-400`}>(you)</span>
                    </p>
                    <div
                      className={`flex items-center w-[130px] h-[50px] justify-around`}
                    >
                      <div
                        className={`percentage-container relative w-[100px] h-[50px]`}
                      >
                        <Input
                          type="number"
                          onKeyDown={handleKeyDown}
                          className={`w-[100px] text-neutral-600 h-[50px]`}
                          defaultValue={50}
                        />
                        <p
                          className={`absolute top-[50%] text-neutral-600 transform translate-y-[-50%] right-3 percentage-sign`}
                        >
                          %
                        </p>
                      </div>
                      <button
                        className={`text-[19px] font-sans text-neutral-400 font-thin`}
                      >
                        ×
                      </button>
                    </div>
                  </div>
                  <Separator className={`w-full`} />
                  <div
                    className={`flex px-4 items-center justify-between w-full`}
                  >
                    <p>Total</p>
                    <div className={`flex items-center`}>
                      <p>20%</p>
                      <svg
                        id="progress"
                        width="33"
                        height="33"
                        viewBox="0 0 100 100"
                      >
                        <circle
                          cx="50"
                          cy="50"
                          r="30"
                          pathLength="1"
                          className="bg"
                        />
                        <motion.circle
                          cx="50"
                          cy="50"
                          r="30"
                          className="indicator"
                          fill={`none`}
                          stroke="#000000" // Customize the color as needed
                          strokeWidth="10"
                          initial={{ strokeDashoffset: circleCircumference }}
                          animate={{
                            strokeDashoffset:
                              circleCircumference * (1 - 20 / 100),
                          }}
                          transition={{ duration: 0.5 }}
                          style={{
                            strokeDasharray: circleCircumference,
                            rotate: -90,
                            transformOrigin: "50% 50%",
                          }}
                        />
                      </svg>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="else">
              <Card>
                <CardHeader>
                  <CardTitle>Account</CardTitle>
                  <CardDescription>
                    Make changes to your account here. Click save when
                    you&apos;re done.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="space-y-1">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" defaultValue="Pedro Duarte" />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" defaultValue="@peduarte" />
                  </div>
                </CardContent>
                <CardFooter>{/* <Button>Save changes</Button> */}</CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        <button
          type="submit"
          className={`w-[200px] h-[40px] font-bold flex mx-auto items-center justify-center text-center rounded-[20px] text-white bg-black`}
        >
          Create
        </button>
      </div>
    </form>
  );
}

export default Page;
