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
    <div
      className="lg:flex block lg:justify-around lg:h-[90vh] h-fit relative bg-cover bg-fixed bg-center pt-[60px] bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5)), url('/herobg.jpg')`,
      }}
    >
      <div className="relative">
        <pre
          className={`${myFont.className} lg:font-[900] lg:text-[40px] text-[24px] lg:text-left text-center font-[700]`}
        >{`DISCOVER, AND COLLECT
DIGITAL ART NFTs`}</pre>
        <pre
          className={`${dmsans.className} text-black lg:text-left text-center lg:text-[17px] text-[13px]`}
        >
          {`Digital marketplace for crypto collectibles and 
non-fungible tokens (NFTs). Buy, Sell, and discover
exclusive digital assets.`}
        </pre>
        <button
          className="flex justify-center items-center lg:p-3 p-2 rounded-[20px] text-white lg:mx-0 mx-auto
         font-semibold lg:w-[150px] w-[120px] lg:h-[50px] h-[35px] mt-3 bg-[#3D00B7]"
        >
          Explore Now
        </button>
        <div className="flex space-x-2 mt-3 relative items-center justify-center lg:justify-start">
          <Image
            src={`/dot.png`}
            className="absolute top-[-70px] lg:left-[-30px] left-[30%] lg:w-[196px] lg:h-[154px] w-[146px] h-[104px] z-[-1]"
            width={196}
            height={154}
            alt="img"
          />
          <p className="text-black text-center lg:text-[16px] text-[13px]">
            <b className="lg:text-[40px] text-[20px] md:text-[30px] text-black">
              98K+
            </b>
            <br />
            Artwork
          </p>
          <p className="text-center lg:text-[16px] text-[13px]">
            <b className="lg:text-[40px] text-[20px] md:text-[30px] text-black">
              12K+
            </b>
            <br />
            Auction
          </p>
          <p className="text-center lg:text-[16px] text-[13px]">
            <b className="lg:text-[40px] text-[20px] md:text-[30px] text-black">
              15K+
            </b>
            <br />
            Artist
          </p>
        </div>
      </div>

      <div className="relative lg:w-[500px] lg:h-[500px] w-[280px] h-[280px] md:w-[400px] md:h-[400px] lg:mt-0 mt-[90px] mx-auto lg:mx-0">
        <div className="absolute lg:right-[60px] right-[20px] bottom-[20%] z-[2]">
          <div className="bg-[url('/giveth1.avif')] bg-cover lg:h-[440px] lg:w-[400px] w-[250px] h-[290px] relative p-4 rounded-[24px]">
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
          src={`/giveth2.avif`}
          className="absolute bottom-[25%] lg:right-[30px] right-[5px] z-[1] w-[200px] h-[250px] lg:h-[391px] lg:w-[356px] rounded-[24px]"
        />
        <Image
          alt="stack"
          width={310}
          height={341}
          src={`/giveth3.avif`}
          className="absolute lg:top-0 lg:bottom-0 top-[-10px] lg:right-0 right-[-10px] lg:w-[310px] lg:h-[341px] w-[150px] h-[200px] z-0 rounded-[24px]"
        />
      </div>
    </div>
  );
}

export default Hero;
