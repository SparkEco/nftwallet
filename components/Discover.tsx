import Image from "next/image";
import CatButton from "./CatButton";
import Col from "./Col";

import localFont from "next/font/local";
const myFont = localFont({
  src: "./intcf/IntegralCF-Bold.otf",
  display: "swap",
});

import { DM_Sans } from "next/font/google";

function Discover() {
  return (
    <div className="flex justify-center items-center py-[80px] bg-[#D9E0EC]">
      <div className="block w-full">
        <p className={`${myFont.className} text-[34px] ml-[11%] mb-5`}>
          DISCOVER MORE NFTS
        </p>
        <div className="flex items-center justify-around">
          <div className="flex space-x-7">
            <CatButton name="All Categories" />
            <CatButton name="Art" />
            <CatButton name="Celebrities" />
            <CatButton name="Gaming" />
            <CatButton name="Sport" />
            <CatButton name="Music" />
            <CatButton name="Crypto" />
          </div>
          <button
            className={`text-black bg-[#e8e2e2] flex justify-center items-center px-4 h-[38px] rounded-[25px] hover:bg-[#3D00B7] hover:text-white`}
          >
            <Image
              src={`/filter.png`}
              alt="filter"
              width={24}
              height={24}
              className="mr-2"
            />
            Filters
          </button>
        </div>
        <div className="flex justify-center">
          <div className="grid lg:grid-cols-4 lg:gap-10">
            <Col name="Gitpoap" img="/poap2.webp" />
            <Col name="Gitpoap" img="/poap2.webp" />
            <Col name="Gitpoap" img="/poap2.webp" />
            <Col name="Gitpoap" img="/poap2.webp" />
            <Col name="Gitpoap" img="/poap2.webp" />
            <Col name="Gitpoap" img="/poap2.webp" />
            <Col name="Gitpoap" img="/poap2.webp" />
            <Col name="Gitpoap" img="/poap2.webp" />
            <Col name="Gitpoap" img="/poap2.webp" />
            <Col name="Gitpoap" img="/poap2.webp" />
            <Col name="Gitpoap" img="/poap2.webp" />
            <Col name="Gitpoap" img="/poap2.webp" />
          </div>
        </div>
        <button
          className={`  text-[#4F33A3] hover:bg-[#4F33A3] hover:text-white w-[179px] h-[66px] rounded-[50px] border border-[#3D00B7] block mx-auto mt-[60px]`}
        >
          More NFTS
        </button>
      </div>
    </div>
  );
}

export default Discover;
