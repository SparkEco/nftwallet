"use client";

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import { Label } from "@/components/ui/label";
import mapboxgl from "mapbox-gl";
import DateTimePicker from "react-datetime-picker";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import Image from "next/image";

interface AllImageData {
  image: string;
}
interface Inputs {
  title: string;
  description: string;
  image: File | undefined;
  coverImage: File | undefined;
  sharePercentage: number;
  projectImages: FileList | undefined;
  coordinates: number[];
}
type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

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
    title: "",
    projectImages: undefined,
    coverImage: undefined,
    image: undefined,
    description: "",
    coordinates: [],
    sharePercentage: 50,
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
  const { address } = useWeb3ModalAccount();
  const [dataUrl, setDataUrl] = useState<AllImageData>({
    image: "",
  });
  const toggleAdvanced = () => {
    setViewAdvanced((p) => !p);
  };

  const reduceIntensity = (hexColor: string, percentage: number) => {
    hexColor = hexColor.replace("#", "");

    // Convert hex to RGB
    let bigint = parseInt(hexColor, 16);
    let r = (bigint >> 16) & 255;
    let g = (bigint >> 8) & 255;
    let b = bigint & 255;

    // Reduce intensity
    r = Math.round(r * (percentage / 100));
    g = Math.round(g * (percentage / 100));
    b = Math.round(b * (percentage / 100));

    // Convert back to hex
    let result =
      "#" + ("000000" + ((r << 16) | (g << 8) | b).toString(16)).slice(-6);

    return result;
  };

  const [dateValue, onChange] = useState<Value>(new Date());
  const [viewImage, setViewImage] = useState(false);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = event.currentTarget;
    //console.log("ran", name);
    if (files) {
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
    if (name === "image") {
      setViewImage(true);
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
  const [cardColor, setCardColor] = useState("");
  return (
    <form
      onSubmit={() => {}}
      className={`lg:md:flex block w-full h-[100vh] justify-center pt-[110px] md:space-x-[80px] lg:space-x-[5%]`}
    >
      {/* <div
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

        <Input
          type="file"
          name="image"
          onChange={handleFileChange}
          accept="image/*"
          id="image"
          className={`file:bg-purple-200 ${
            !viewImage ? "block" : "hidden"
          } file:text-purple-700 border-0 w-[200px] file:h-[20px] file:rounded-[5px] file:border-0`}
        />
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
      </div> */}
      <div className={`block lg:w-[650px] space-y-3 h-[600px]`}>
        <div
          style={{
            backgroundImage: `linear-gradient(to bottom left, ${cardColor}, ${reduceIntensity(
              cardColor,
              50
            )})`,
          }}
          className={`lg:w-[600px] flex mx-auto items-center justify-center h-[500px] rounded-[10px] md:w-[550px] border`}
        ></div>
        <ToggleGroup
          type="single"
          variant={"outline"}
          className={``}
          onValueChange={(e) => {
            setCardColor(e);
          }}
        >
          <ToggleGroupItem
            value="#000000"
            className={`data-[state=on]:bg-neutral-300 rounded-full w-[45px] h-[45px] !p-[5px]`}
          >
            <div className={`w-full h-full rounded-full bg-black`}></div>
          </ToggleGroupItem>
          <ToggleGroupItem
            value="#FFA500"
            className={`data-[state=on]:bg-neutral-300 w-[45px] h-[45px] rounded-full !p-[5px]`}
          >
            <div className={`w-full h-full rounded-full bg-[#FFA500]`}></div>
          </ToggleGroupItem>
          <ToggleGroupItem
            value="#800080"
            className={`data-[state=on]:bg-neutral-300 w-[45px] h-[45px] rounded-full !p-[5px]`}
          >
            <div className={`w-full h-full rounded-full bg-[#800080]`}></div>
          </ToggleGroupItem>
          <ToggleGroupItem
            value="#0000ff"
            className={`data-[state=on]:bg-neutral-300 w-[45px] h-[45px] rounded-full !p-[5px]`}
          >
            <div className={`w-full h-full rounded-full bg-[#0000ff]`}></div>
          </ToggleGroupItem>
          <ToggleGroupItem
            value="#FF0000"
            className={`data-[state=on]:bg-neutral-300 w-[45px] h-[45px] rounded-full !p-[5px]`}
          >
            <div className={`w-full h-full rounded-full bg-[#FF0000]`}></div>
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      <div className="lg:w-[450px] block mx-auto w-[300px] py-[20px] px-5 space-y-[30px]">
        <div className="text-violet11 text-[23px] font-[600] leading-[18px]">
          Create
        </div>
        {/* <Field label="Collection">
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
        </Field> */}
        <Field label="Title">
          <Input
            type="text"
            className={`h-[50px]`}
            name="title"
            value={inputs.title}
            onChange={handleChange}
          />
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
            <TabsList className="grid w-full grid-cols-3 h-[80px]">
              <TabsTrigger value="account" className={`h-[70px]`}>
                Me
              </TabsTrigger>
              <TabsTrigger value="password" className={`h-[70px]`}>
                Split
              </TabsTrigger>
              <TabsTrigger value="else" className={`h-[70px] `}>
                Someone else
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
                      {address?.slice(0, 6)}...{address?.slice(-5)}
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
                          defaultValue={inputs.sharePercentage}
                        />
                        <p
                          className={`absolute top-[50%] text-neutral-600 transform translate-y-[-50%] right-3 percentage-sign`}
                        >
                          %
                        </p>
                      </div>
                      <button
                        type="button"
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
                      <p>{inputs.sharePercentage}%</p>
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
                              circleCircumference *
                              (1 - inputs.sharePercentage / 100),
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
                <CardContent className="space-y-2">
                  <div className="space-y-1 pt-3">
                    <Input id="address" defaultValue={address} />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          <div>
            <p className={`font-bold`}>Mint Start</p>
            <Tabs className={`w-full`} defaultValue="now">
              <TabsList className="grid w-full grid-cols-2 h-[60px]">
                <TabsTrigger
                  value="now"
                  className={`h-[50px] font-semibold rounded-lg`}
                >
                  Now
                </TabsTrigger>
                <TabsTrigger
                  value="future"
                  className={`h-[50px] font-semibold rounded-lg`}
                >
                  Future
                </TabsTrigger>
              </TabsList>
              <TabsContent value="future">
                <div
                  className={`flex w-full items-center space-x-3 justify-center py-2`}
                >
                  <DateTimePicker
                    className={`!w-[80%] !h-[50px] !rounded-[12px] !border-neutral-500`}
                    onChange={onChange}
                    format="dd-MM-y hh-mm a"
                    value={dateValue}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      onChange(new Date());
                    }}
                    className={`text-neutral-600 font-semibold`}
                  >
                    Reset
                  </button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          <div>
            <p className={`font-bold`}>Edition size</p>
            <Tabs defaultValue="open">
              <TabsList className="grid w-full grid-cols-2 h-[60px]">
                <TabsTrigger
                  value="open"
                  className={`h-[50px] font-semibold rounded-lg`}
                >
                  Open
                </TabsTrigger>
                <TabsTrigger
                  value="limited"
                  className={`h-[50px] font-semibold rounded-lg`}
                >
                  Limited
                </TabsTrigger>
              </TabsList>
              <TabsContent value="limited">
                <div
                  className={`flex w-full items-center space-x-3 justify-center py-2`}
                >
                  <Input className={`w-[90%] h-[50px]`} defaultValue={1000} />
                </div>
              </TabsContent>
            </Tabs>
          </div>
          <div>
            <p className={`font-bold`}>Mint limit per wallet</p>
            <Tabs defaultValue="unlimited">
              <TabsList className="grid w-full grid-cols-2 h-[60px]">
                <TabsTrigger
                  value="unlimited"
                  className={`h-[50px] font-semibold rounded-lg`}
                >
                  Unlimited
                </TabsTrigger>
                <TabsTrigger
                  value="custom"
                  className={`h-[50px] font-semibold rounded-lg`}
                >
                  Custom
                </TabsTrigger>
              </TabsList>
              <TabsContent value="custom">
                <div
                  className={`flex w-full items-center space-x-3 justify-center py-2`}
                >
                  <Input className={`w-[90%] h-[50px]`} defaultValue={1000} />
                </div>
              </TabsContent>
            </Tabs>
          </div>
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
