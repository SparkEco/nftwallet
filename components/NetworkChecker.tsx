"use client";

import Image from "next/image";
import { useState } from "react";
import { sepolia } from "viem/chains";
import Switcher from "./Switcher";

function NetworkChecker({ id }: { id: number }) {
  const [show, setShow] = useState("hidden");

  if (id === sepolia.id) {
    return (
      <button
        onMouseLeave={() => setShow("hidden")}
        onMouseEnter={() => setShow("block")}
        className={`flex w-fit p-[7px] absolute bg-white border-green-500 border shadow top-[30px] left-[20px] rounded-[8px] justify-center space-x-[2px] items-center h-[35px]`}
      >
        <Image
          src={`/icons/eth-diamond-black.a042df77.png`}
          alt="ETH logo"
          width={17}
          height={22}
          className={`w-[17px] h-[22px]`}
        />
        <p className={`text-black ${show} text-[15px]`}>Sepolia</p>
      </button>
    );
  } else {
    return (
      <div className={`w-fit`}>
        <Switcher
          data={[
            {
              image: "/icons/eth-diamond-black.a042df77.png",
              network: sepolia,
            },
          ]}
        >
          <button
            type="button"
            className={`flex space-x-1 w-fit px-2 hover:opacity-60 active:opacity-70 rounded-[9px] absolute top-[30px] text-[11px] left-[20px] justify-center items-center h-[32px] bg-red-500 text-white`}
          >
            <p>Wrong Network</p>
            {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 330 330"
            width="12px"
            height="12px"
          >
            <path
              fill="#ffffff"
              stroke="#ffffff"
              stroke-width="18"
              d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393 c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393 s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z"
            />
          </svg> */}
          </button>
        </Switcher>
      </div>
    );
  }
}
export default NetworkChecker;
