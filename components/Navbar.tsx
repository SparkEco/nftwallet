"use client";

import ConnectWallet from "@/hooks/ConnectWallet";
import localFont from "next/font/local";
import { TbMenu } from "react-icons/tb";
import { MdClose } from "react-icons/md";
const myFont = localFont({
  src: "./intcf/IntegralCF-Bold.otf",
  display: "swap",
});

import { DM_Sans } from "next/font/google";
import { useState } from "react";
const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
});

function Navbar() {
  const [show, setShow] = useState(false);
  return (
    <div className="fixed w-full top-0 bg-white z-[21]">
      <nav
        suppressHydrationWarning={true}
        className="w-full flex h-[60px] lg:justify-around justify-between lg:text-[16px] md:text-[15px] text-[13px]
      items-center lg:py-[35px] py-[15px]  lg:px-[1%] md:px-[1%] px-[15px]"
      >
        <p
          className={`${myFont.className} text-[#3D00B7] lg:text-[24px] text-[18px]`}
        >
          NFTERS
        </p>
        <ul
          className={`${dmSans.className} lg:flex hidden justify-end lg:space-x-8 lg:w-[40%] w-fit space-x-2 lg:text-[16px] text-[13px] items-center`}
        >
          <li className="hover:text-sky-500 cursor-pointer">Marketplace</li>
          <li className="hover:text-sky-500 cursor-pointer">Resource</li>
          <li className="hover:text-sky-500 cursor-pointer">About</li>
        </ul>
        {/* <ConnectWallet className="lg:block hidden" /> */}
        <button
          className={`p-2 rounded-[50%] lg:hidden block border`}
          onClick={() => setShow((prevShow) => !prevShow)}
        >
          {show ? <MdClose size={18} /> : <TbMenu size={18} />}
        </button>
      </nav>
      <div className={`${show ? "block" : "hidden"} lg:hidden py-3`}>
        <hr />
        <ul className={`${dmSans.className} text-[13px] text-center space-y-2`}>
          <li className="hover:text-sky-500 cursor-pointer">Marketplace</li>
          <li className="hover:text-sky-500 cursor-pointer">Resource</li>
          <li className="hover:text-sky-500 cursor-pointer">About</li>
        </ul>
        {/* <ConnectWallet className="lg:hidden flex mx-auto mt-1" /> */}
      </div>
    </div>
  );
}

export default Navbar;
