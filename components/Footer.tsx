import localFont from "next/font/local";
const myFont = localFont({
  src: "./intcf/IntegralCF-Bold.otf",
  display: "swap",
});

import { DM_Sans } from "next/font/google";
import Image from "next/image";
const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
});

function Footer() {
  return (
    <>
      <div className="flex justify-around lg:px-[80px] px-3 lg:py-[120px] py-[30px] lg:h-[60vh] h-fit w-full">
        <div className="block lg:w-[333px] w-[20%] space-y-4">
          <h1
            className={`${myFont.className} font-semibold lg:font-bold text-[15px] lg:text-[24px]`}
          >
            NFTERS
          </h1>
          <p
            className={`${dmSans.className} lg:text-[14px] text-[10px] text-[#565656]`}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim natus
            quae libero, distinctio perspiciatis pariatur dolor illum
          </p>
          <div className="flex space-x-2 items-center">
            <Image
              className="lg:h-[36px] w-[20px] h-[20px] lg:w-[36px]"
              src={`/facebook.png`}
              width={36}
              height={36}
              alt="social"
            />
            <Image
              className="lg:h-[36px] w-[20px] h-[20px] lg:w-[36px]"
              src={`/twitter.png`}
              width={36}
              height={36}
              alt="social"
            />
            <Image
              className="lg:h-[36px] w-[20px] h-[20px] lg:w-[36px]"
              src={`/linkedin.png`}
              width={36}
              height={36}
              alt="social"
            />
          </div>
        </div>
        <div className={`${dmSans.className} block w-[20%]`}>
          <h1
            className={`lg:font-bold lg:text-[18px] text-[13px] font-semibold`}
          >
            Marketplace
          </h1>
          <ul
            className={`lg:text-[14px] text-[10px] text-[#3D3D3D] font-medium lg:mt-4 mt-2 lg:space-y-1 space-y-[0.10rem]`}
          >
            <li>All NFTs</li>
            <li>New</li>
            <li>Art</li>
            <li>Sports</li>
            <li>Utility</li>
            <li>Music</li>
            <li>Domain name</li>
          </ul>
        </div>
        <div className={`${dmSans.className} block w-[20%]`}>
          <h1
            className={`lg:font-bold lg:text-[18px] text-[13px] font-semibold`}
          >
            Account
          </h1>
          <ul
            className={`lg:text-[14px] text-[10px] text-[#3D3D3D] font-medium lg:mt-4 mt-2 space-y-1`}
          >
            <li>Profile</li>
            <li>Favorites</li>
            <li>My Collection</li>
            <li>Settings</li>
          </ul>
        </div>
        <div className={`${dmSans.className} block lg:w-[364px] w-[20%]`}>
          <h1
            className={`lg:font-bold lg:text-[18px] text-[13px] font-semibold`}
          >
            Stay in the loop
          </h1>
          <p
            className={`${dmSans.className} text-[10px] lg:text-[14px] text-[#363639] lg:mt-4 mt-2`}
          >
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nostrum
            natus eius magni? Numquam
          </p>
          <div className="lg:flex hidden  lg:w-[364px] w-[100px] h-[60px] border rounded-[45px] items-center mt-4">
            <input
              type="text"
              placeholder="Enter your email address"
              className="pl-5 h-[55px] rounded-[45px] outline-none"
            />
            <button className="border w-[149px] h-[46px] mr-1 bg-[#2639ED] hover:opacity-75 text-white rounded-[45px] text-[12px] border-[#2639ED]">
              Subscribe Now
            </button>
          </div>
        </div>
      </div>
      <hr />
      <div className="block w-full py-[20px]">
        <p
          className={`${dmSans.className} text-[#A4A4A4] text-[14px] text-center`}
        >
          Copyright © 2023 SparkEco
        </p>
      </div>
    </>
  );
}

export default Footer;
