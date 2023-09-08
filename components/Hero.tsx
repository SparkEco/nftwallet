import { DM_Sans } from "next/font/google";
import Image from "next/image";
import localFont from "next/font/local";

const myFont = localFont({
  src: "./intcf/IntegralCF-Bold.otf",
  display: "swap",
});

const dmsans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
});

function Hero() {
  return (
    <div className="flex justify-around lg:h-[90vh]">
      <div>
        <pre
          className={`${myFont.className} lg:font-[900] lg:text-[40px] text-[30px] font-[700]`}
        >{`DISCOVER, AND COLLECT
DIGITAL ART NFTs`}</pre>
        <pre className={`${dmsans.className} text-[#565656]`}>
          {`Digital marketplace for crypto collectibles and 
non-fungible tokens (NFTs). Buy, Sell, and discover
exclusive digital assets.`}
        </pre>
        <button
          className="flex justify-center items-center lg:p-3 rounded-[20px] text-white
         font-semibold w-[150px] h-[50px] mt-3 bg-[#3D00B7]"
        >
          Explore Now
        </button>
        <div className="flex space-x-2 mt-3 relative">
          <Image
            src={`/dot.png`}
            className="absolute top-[-70px] left-[-30px] z-[-1]"
            width={196}
            height={154}
            alt="img"
          />
          <p className="text-[#565656] text-center">
            <b className="text-[40px] text-black">98K+</b>
            <br />
            Artwork
          </p>
          <p className="text-[#565656] text-center">
            <b className="text-[40px] text-black">12K+</b>
            <br />
            Auction
          </p>
          <p className="text-[#565656] text-center">
            <b className="text-[40px] text-black">15K+</b>
            <br />
            Artist
          </p>
        </div>
      </div>

      <div className="relative w-[500px] h-[500px]">
        <div className="absolute right-[60px] bottom-[20%] z-20">
          <div className="bg-[url('/stack1.png')] bg-cover h-[440px] w-[400px] relative p-4">
            {/* <Image
              src={`/live.png`}
              width={101}
              height={101}
              alt="live"
              className="rounded-[50%] absolute top-[50%] left-[-65px] w-[130px] h-[130px]"
            /> */}
            {/* <div
              className={`${dmsans.className} items-center text-white flex absolute w-[85%] shadow bottom-6 left-[7%] rounded-[10px] mx-auto
              bg-transparent brightness-110 backdrop-blur lg:h-[73px] justify-around`}
            >
              <div className="block">
                <p>Current Bid</p>
                <div className="flex space-x-1">
                  <Image
                    src={`/eth.png`}
                    alt="ethereum"
                    width={13}
                    height={21}
                  />
                  <p>0.25 ETH</p>
                </div>
              </div>
              <div className="block">
                <p>Ends in</p>
                <div className="flex space-x-1">
                  <p>
                    <b>12</b>h <b>43</b>m <b>42</b>s
                  </p>
                </div>
              </div>
            </div> */}
          </div>
        </div>
        <Image
          alt="stack"
          width={356}
          height={391}
          src={`/stack2.png`}
          className="absolute bottom-[25%] right-[30px] z-10"
        />
        <Image
          alt="stack"
          width={310}
          height={341}
          src={`/stack3.png`}
          className="absolute top-0 right-0 z-0"
        />
      </div>
    </div>
  );
}

export default Hero;
