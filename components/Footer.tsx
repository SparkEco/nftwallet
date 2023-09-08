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
      <div className="flex justify-around px-[80px] py-[120px] h-[60vh] ">
        <div className="block lg:w-[333px] space-y-4">
          <h1 className={`${myFont.className} font-bold text-[24px]`}>
            NFTERS
          </h1>
          <p className={`${dmSans.className} text-[14px] text-[#565656]`}>
            The world’s first and largest digital marketplace for crypto
            collectibles and non-fungible tokens (NFTs). Buy, sell, and discover
            exclusive digital items.
          </p>
          <div className="flex space-x-2 items-center">
            <Image src={`/facebook.png`} width={36} height={36} alt="social" />
            <Image src={`/twitter.png`} width={36} height={36} alt="social" />
            <Image src={`/linkedin.png`} width={36} height={36} alt="social" />
          </div>
        </div>
        <div className={`${dmSans.className} block`}>
          <h1 className={`font-bold text-[18px]`}>Marketplace</h1>
          <ul
            className={`text-[14px] text-[#3D3D3D] font-medium mt-4 space-y-1`}
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
        <div className={`${dmSans.className} block`}>
          <h1 className={`font-bold text-[18px]`}>My Account</h1>
          <ul
            className={`text-[14px] text-[#3D3D3D] font-medium mt-4 space-y-1`}
          >
            <li>Profile</li>
            <li>Favorites</li>
            <li>My Collection</li>
            <li>Settings</li>
          </ul>
        </div>
        <div className={`${dmSans.className} block w-[364px]`}>
          <h1 className={`font-bold text-[18px]`}>Stay in the loop</h1>
          <p className={`${dmSans.className} text-[14px] text-[#363639] mt-4`}>
            Join our mailing list to stay in the loop with our newest feature
            releases, NFT drops, and tips and tricks for navigating NFTs.
          </p>
          <div className="flex w-[364px] h-[60px] border rounded-[45px] items-center mt-4">
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
