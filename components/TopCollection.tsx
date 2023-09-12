import Image from "next/image";
import Bid from "./Bid";
import Hot from "./Hot";
import { DM_Sans, Poppins } from "next/font/google";

const dmsans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
});
const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"],
});
import localFont from "next/font/local";

const myFont = localFont({
  src: "./intcf/IntegralCF-Bold.otf",
  display: "swap",
});

function TopCollection() {
  return (
    <div className="lg:flex hidden justify-center py-[100px] space-x-11 w-full">
      <div className="block">
        <Image src={`/poap2.webp`} alt="nft" width={400} height={424} />
        <div className="flex items-center mt-2">
          <Image
            src={`/punk3.avif`}
            width={48}
            height={48}
            alt="face"
            className="rounded-[50%]"
          />
          <div className="block ml-2">
            <p className={`${dmsans.className} font-semibold text-[20px]`}>
              The Git POAP
            </p>
            <p className={`${dmsans.className} text-[#565656] text-[14px]`}>
              10 in the stock
            </p>
          </div>
          <div className="block ml-[50px]">
            <p className={`${dmsans.className} text-[#565656] text-[12px]`}>
              Highest Bid
            </p>
            <div className="flex mt-1 items-center space-x-1">
              <Image src={`/eth2.png`} alt="ETH" width={13} height={21} />
              <p className={`${dmsans.className} text-[18px] font-[500]`}>
                0.25 ETH
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="block border-r pr-10 space-y-3">
        <h1 className={`lg:text-[20px] text-[15px] font-bold text-center`}>
          Description
        </h1>
        <p className="w-[250px] text-[#565656]">
          • Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta totam
          numquam vitae temporibus voluptate officia porro est impedit ipsum
          similique nam laudantium veniam illum, consectetur molestiae eveniet
          alias voluptatibus quaerat.
        </p>
        <p className="w-[250px] text-[#565656]">
          • Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta totam
          numquam vitae temporibus voluptate officia porro est impedit ipsum
          similique nam laudantium veniam illum, consectetur molestiae eveniet
          alias voluptatibus quaerat.
        </p>
      </div>
      <div className="block">
        <h1 className={`${myFont.className} text-[20px] text-center`}>
          TOP HOLDERS
        </h1>
        <div className="flex justify-between mt-4 px-6">
          <p
            className={`${dmsans.className} font-semibold text-[18px] text-[#3D00B7]`}
          >
            Holder
          </p>
          <p
            className={`${dmsans.className} font-semibold text-[18px] text-[#3D00B7]`}
          >
            Shares
          </p>
        </div>

        <Hot image="/topcol1.png" percentage={26.59} verified />
        <Hot image="/topcol2.png" percentage={10.52} />
        <Hot image="/topcol3.png" percentage={2.52} />
        <Hot percentage={1.52} image="/topcol4.png" verified />
        <Hot percentage={2.52} image="/topcol5.png" />
      </div>
    </div>
  );
}

export default TopCollection;
