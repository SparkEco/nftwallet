import Image from "next/image";
import { DM_Sans, Poppins } from "next/font/google";
import Bid from "./Bid";
import localFont from "next/font/local";
import Hot from "./Hot";

const dmsans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
});
const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"],
});

const myFont = localFont({
  src: "./intcf/IntegralCF-Bold.otf",
  display: "swap",
});

function TopCollection() {
  return (
    <div className="flex justify-center items-center py-[80px] space-x-11">
      <div className="block">
        <Image src={`/coles.png`} alt="nft" width={400} height={424} />
        <div className="flex items-center mt-2">
          <Image src={`/face.png`} width={48} height={48} alt="face" />
          <div className="block ml-2">
            <p className={`${dmsans.className} font-semibold text-[20px]`}>
              The Futr Abstr
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
      <div className="block space-y-9 border-r pr-10">
        <Bid image="/bid1.png" />
        <Bid image="/bid2.png" />
        <Bid image="/bid3.png" />
      </div>
      <div className="block">
        <h1 className={`${myFont.className} text-[20px]`}>
          TOP COLLECTIONS OVER
        </h1>
        <p
          className={`${dmsans.className} font-semibold text-[18px] text-[#3D00B7]`}
        >
          Last 7 days
        </p>
        <Hot
          name="CryptoFunks"
          index={1}
          image="/topcol1.png"
          percentage={26.59}
          verified
          price={19769.39}
          bullish
        />
        <Hot
          name="Cryptic"
          index={2}
          image="/topcol2.png"
          percentage={10.52}
          price={2769.39}
        />
        <Hot
          name="Frensware"
          index={3}
          image="/topcol3.png"
          percentage={2.52}
          price={9232.39}
          bullish
        />
        <Hot
          name="PunkArt"
          index={4}
          percentage={1.52}
          price={3769.39}
          image="/topcol4.png"
          verified
          bullish
        />
        <Hot
          name="Art Crypto"
          index={5}
          percentage={2.52}
          image="/topcol5.png"
          price={10769.39}
        />
      </div>
    </div>
  );
}

export default TopCollection;
