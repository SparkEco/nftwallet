"use client";

import { IBM_Plex_Sans } from "next/font/google";
import { TbMenu } from "react-icons/tb";
import { MdClose } from "react-icons/md";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Mint from "./Mint";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useAccount } from "wagmi";

import { setisConnected } from "@/redux/slices/isconnected.slice";

const myFont = IBM_Plex_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "700"],
});

function Navbar() {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const { address, isConnected } = useAccount();
  const path = usePathname();
  useEffect(() => {
    setShow(false);
  }, [path]);
  useEffect(() => {
    dispatch(setisConnected(isConnected));
  }, [isConnected, dispatch]);
  const isConn = useSelector((state: RootState) => state.isConnected.value);

  return (
    <div className="fixed w-full top-0 bg-white z-[21]">
      <nav
        className="w-full flex h-[60px] lg:justify-around justify-between lg:text-[16px] md:text-[15px] text-[13px]
      items-center lg:py-[35px] py-[15px]  lg:px-[1%] md:px-[1%] px-[15px]"
      >
        <Link href={"/"} className={`flex items-center space-x-1`}>
          <Image
            src={`/logo2.png`}
            alt="logo"
            width={28}
            height={28}
            className={`lg:w-[28px] lg:h-[28px] w-[22px] h-[22px]`}
          />
          <p
            className={`${myFont.className} text-[#3D00B7] font-[700] lg:text-[25px] text-[18px]`}
          >
            ImpactScribe
          </p>
        </Link>
        <ul
          className={`lg:flex md:flex hidden justify-end lg:space-x-8 lg:w-[40%] w-fit space-x-2 lg:text-[16px] text-[13px] items-center`}
        >
          <li className="hover:text-sky-500 cursor-pointer">
            <Link href={`/explore`}>Explore</Link>
          </li>
          {isConn && (
            <li className="hover:text-sky-500 cursor-pointer">
              <Link href={`/dashboard`}>Dashboard</Link>
            </li>
          )}
          <li className="hover:text-sky-500 cursor-pointer">About</li>
          <li className="hover:text-sky-500 cursor-pointer">Resources</li>
        </ul>
        <div className={`lg:flex md:flex hidden items-center space-x-3`}>
          <w3m-button size="md" />
          {isConn && (
            <Mint>
              <button
                className={`hover:text-white text-[#3D00B7] border lg:block hidden rounded-[25px] hover:bg-[#3D00B7] active:opacity-70 h-[35px] text-center px-2 text-[15px]`}
              >
                Create ImpactCert
              </button>
            </Mint>
          )}
        </div>
        <button
          className={`p-2 rounded-[50%] lg:hidden md:hidden block border`}
          onClick={() => setShow((prevShow) => !prevShow)}
        >
          {show ? <MdClose size={18} /> : <TbMenu size={18} />}
        </button>
      </nav>
      <div className={`${show ? "block" : "hidden"} lg:hidden md:hidden py-3`}>
        <hr />
        <ul className={`text-[13px] text-center space-y-2`}>
          <li className="hover:text-sky-500 cursor-pointer">
            <Link href={`/explore`}>Explore</Link>
          </li>
          {isConn && (
            <li className="hover:text-sky-500 cursor-pointer">
              <Link href={`/dashboard`}>Dashboard</Link>
            </li>
          )}
          <li className="hover:text-sky-500 cursor-pointer">Resource</li>
          <li className="hover:text-sky-500 cursor-pointer">About</li>
        </ul>
        <w3m-button size="sm" />
        {isConn && (
          <Link href={`/explore/new`} className={`block mx-auto`}>
            <button
              className={`text-white block mx-auto rounded-lg bg-[#3D00B7] hover:opacity-70 h-[32px] text-center px-2 text-[15px]`}
            >
              Create ImpactCert
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Navbar;
