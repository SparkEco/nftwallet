import localFont from "next/font/local";
const myFont = localFont({
  src: "./intcf/IntegralCF-Bold.otf",
  display: "swap",
});

import { DM_Sans } from "next/font/google";
import Image from "next/image";

function Footer() {
  return (
    <>
      <div className="lg:flex block justify-around lg:px-[80px] px-3 lg:py-[120px] py-[30px] lg:h-[60vh] h-fit w-full lg:space-y-0 space-y-4">
        <div className="block lg:w-[333px] w-[250px] space-y-4 mx-auto">
          <h1
            className={`${myFont.className} font-semibold lg:font-bold text-[15px] lg:text-[24px]`}
          >
            NFTERS
          </h1>
          <p className={`  lg:text-[14px] text-[10px] text-[#565656]`}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim natus
            quae libero, distinctio perspiciatis pariatur dolor illum
          </p>
          <div className="flex space-x-2 items-center lg:justify-start justify-center">
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
        <div className={`  block lg:mx-0 mx-auto lg:text-start text-start`}>
          <h1 className={`font-bold lg:text-[18px] text-[15px]`}>
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
        <div className={`  block mx-auto `}>
          <h1 className={`font-bold lg:text-[18px] text-[15px]`}>Account</h1>
          <ul
            className={`lg:text-[14px] text-[10px] text-[#3D3D3D] font-medium lg:mt-4 mt-2 space-y-1`}
          >
            <li>Profile</li>
            <li>Favorites</li>
            <li>My Collection</li>
            <li>Settings</li>
          </ul>
        </div>
        <div
          className={`  block lg:w-[364px] w-[250px] mx-auto lg:text-start text-center`}
        >
          <h1 className={`font-bold lg:text-[18px] text-[15px]`}>
            Stay in the loop
          </h1>
          <p
            className={`  text-[10px] lg:text-[14px] text-[#363639] lg:mt-4 mt-2`}
          >
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nostrum
            natus eius magni? Numquam
          </p>
          <div className="flex lg:w-[364px] w-[280px] h-[60px] border rounded-[45px] items-center mt-4">
            <input
              type="text"
              placeholder="Enter your email address"
              className="pl-5 h-[55px] rounded-[45px] outline-none lg:w-fit w-[200px] lg:text-[18px] text-[14px]"
            />
            <button className="border lg:w-[150px] w-[100px] h-[46px] mr-1 bg-[#2639ED] hover:opacity-75 text-white rounded-[45px] lg:text-[11px] text-[10px] border-[#2639ED]">
              Subscribe Now
            </button>
          </div>
        </div>
      </div>
      <hr />
      <div className="block w-full py-[20px]">
        <p className={`  text-[#A4A4A4] text-[14px] text-center`}>
          Copyright © 2023 ImpactScribe
        </p>
      </div>
    </>
  );
}

export default Footer;
