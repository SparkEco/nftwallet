"use client";

import { useRouteContext } from "@/context/routeContext";
import { useEffect, useState } from "react";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";

function Page() {
  const [quantity, setQuantity] = useState(0);
  const { setActivePath } = useRouteContext();

  useEffect(() => {
    setActivePath("mint");
  }, []);
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
  return (
    <div
      className={`w-full flex text-center justify-center h-[100vh] items-center p-[15px]`}
    >
      <div
        className={`flex justify-center items-center w-[80%] shadow-2xl h-full`}
      >
        <fieldset className={`w-[100%] space-y-4`}>
          <div
            style={{
              backgroundImage: `linear-gradient(to bottom left, #4e2698, ${reduceIntensity(
                "#4e2698",
                50
              )})`,
            }}
            className={`lg:w-[600px] flex mx-auto items-center justify-center 2xl:h-[500px] xl:h-[500px] md:h-[400px] h-[300px] rounded-[10px] md:w-[550px] w-[95%] border`}
          >
            <p
              className={`font-[700] text-white text-[50px] w-[150px] text-center`}
            >
              Enter title here
            </p>
          </div>
          <p className={`text-[16px] font-medium`}>Select the quantity</p>
          <div
            className={`flex w-[50%] mx-auto space-x-3 justify-center items-center`}
          >
            <button
              className={`w-[50px] bg-indigo-500 h-[40px] rounded-[5px]`}
              type="button"
              onClick={() => setQuantity((p) => p - 1)}
              disabled={quantity === 0}
            >
              <RemoveRoundedIcon className="text-white" />
            </button>
            <div
              className={`w-[40%] flex justify-center items-center h-[50px] border-[0.5px] rounded-[5px] text-center`}
            >
              {quantity}
            </div>
            <button
              className={`w-[50px] bg-indigo-500 h-[40px] rounded-[5px]`}
              type="button"
              onClick={() => setQuantity((p) => p + 1)}
            >
              <AddRoundedIcon className="text-white" />
            </button>
          </div>
          <button
            className={`w-[70px] block mx-auto h-[40px] rounded-lg shadow-xl text-white`}
            style={{
              backgroundImage: `linear-gradient(to bottom, #4e2698, ${reduceIntensity(
                "#4e2698",
                50
              )})`,
            }}
            type="button"
          >
            Mint
          </button>
        </fieldset>
      </div>
    </div>
  );
}

export default Page;
