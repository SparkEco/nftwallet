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

  return (
    <div
      className={`w-full flex text-center justify-center h-[100vh] items-center p-[15px]`}
    >
      <div
        className={`flex justify-center items-center 2xl:w-[550px] xl:w-[500px] md:w-[450px] w-[450px] shadow-2xl h-[50%]`}
      >
        <fieldset className={`w-[42%]`}>
          <label htmlFor="">Select the quantity</label>
          <div
            className={`flex w-[100%] space-x-3 justify-center items-center`}
          >
            <button
              className={`w-[50px] bg-indigo-500 h-[50px] rounded-[5px]`}
              type="button"
              onClick={() => setQuantity((p) => p - 1)}
              disabled={quantity === 0}
            >
              <RemoveRoundedIcon className="text-white" />
            </button>
            <div
              className={`w-[60%] flex justify-center items-center h-[50px] border-[0.5px] rounded-[5px] text-center`}
            >
              {quantity}
            </div>
            <button
              className={`w-[50px] bg-indigo-500 h-[50px] rounded-[5px]`}
              type="button"
              onClick={() => setQuantity((p) => p + 1)}
            >
              <AddRoundedIcon className="text-white" />
            </button>
          </div>
        </fieldset>
      </div>
    </div>
  );
}

export default Page;
