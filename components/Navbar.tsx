import localFont from "next/font/local";
const myFont = localFont({
  src: "./intcf/IntegralCF-Bold.otf",
  display: "swap",
});

import { DM_Sans } from "next/font/google";
const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
});

function Navbar() {
  return (
    <nav
      className="w-full flex h-[60px] justify-around lg:text-[16px] md:text-[15px] text-[13px]
       border-b items-center lg:py-[35px] py-[20px] sticky top-0 bg-white px-[1%] z-50"
    >
      <p
        className={`${myFont.className} text-[#3D00B7] lg:text-[24px] text-[20px]`}
      >
        NFTERS
      </p>
      <ul
        className={`${dmSans.className} flex justify-end lg:space-x-8 w-[40%] space-x-3 lg:text-[16px] text-[13px] items-center`}
      >
        <li className="hover:text-sky-500 cursor-pointer">Marketplace</li>
        <li className="hover:text-sky-500 cursor-pointer">Resource</li>
        <li className="hover:text-sky-500 cursor-pointer">About</li>
      </ul>
      {/* <input
        type="text"
        placeholder="Search"
        className="rounded-[25px] lg:block hidden md:block lg:w-[300px] md:w-[250px] h-[40px] border-2 outline-none p-2"
      /> */}
      {/* <button className="flex items-center lg:h-[40px] bg-[#3D00B7] text-white w-[131px] rounded-[20px] justify-center">
        Upload
      </button> */}
      <button
        className={`${dmSans.className} lg:h-[40px] h-[29px] flex justify-center items-center hover:bg-[#3D00B7] hover:text-white
        border-2 text-[#3D00B7] border-[#3D00B7] rounded-[25px] lg:p-2 p-1`}
      >
        Connect Wallet
      </button>
    </nav>
  );
}

export default Navbar;
