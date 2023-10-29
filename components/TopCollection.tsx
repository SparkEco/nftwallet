import Image from "next/image";
import Hot from "./Hot";
import local from "next/font/local";

const myFont = local({
  src: "./intcf/IntegralCF-Medium.otf",
  display: "swap",
});

function TopCollection() {
  return (
    <div className="lg:flex block justify-center py-[100px] lg:space-x-11 space-x-0 w-full">
      <div className="block lg:mx-0 mx-auto">
        <Image
          loading="lazy"
          src={`/nfts/F0xIASwXsAE0vSs.jpg`}
          alt="nft"
          width={400}
          height={400}
          className={`lg:w-[400px] lg:h-[400px] md:w-[300px] rounded-[20px] md:h-[300px] w-[250px] h-[250px] mx-auto`}
        />
        <div className="flex items-center mt-2 mx-auto w-fit">
          <Image
            loading="lazy"
            src={`/punk3.avif`}
            width={48}
            height={48}
            alt="face"
            className="rounded-[50%]"
          />
          <div className="block ml-2">
            <p className={`  font-semibold text-[20px]`}>The Git POAP</p>
            <p className={`  text-[#565656] text-[14px]`}>10 in the stock</p>
          </div>
          <div className="block ml-[50px]">
            <p className={`  text-[#565656] text-[12px]`}>Highest Bid</p>
            <div className="flex mt-1 items-center space-x-1">
              <Image
                loading="lazy"
                src={`/eth2.png`}
                alt="ETH"
                width={13}
                height={21}
              />
              <p className={`  text-[18px] font-[500]`}>0.25 ETH</p>
            </div>
          </div>
        </div>
      </div>
      <div className="block border-r space-y-3 lg:mx-0 mx-auto lg:mt-0 mt-6 lg:w-[400px]">
        <h1
          className={`lg:text-[20px] md:text-[20px] text-[15px] font-bold text-center`}
        >
          Description
        </h1>
        <p className="lg:w-[280px] md:w-[600px] w-[280px] text-[#565656] mx-auto">
          • Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta totam
          numquam vitae temporibus voluptate officia porro est impedit ipsum
          similique nam laudantium veniam illum, consectetur molestiae eveniet
          alias voluptatibus quaerat.
        </p>
        <p className="lg:w-[280px] md:w-[600px] w-[280px] text-[#565656] mx-auto">
          • Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta totam
          numquam vitae temporibus voluptate officia porro est impedit ipsum
          similique nam laudantium veniam illum, consectetur molestiae eveniet
          alias voluptatibus quaerat.
        </p>
      </div>
      <div className="block lg:mx-0 mx-auto lg:mt-0 mt-[50px]">
        <h1 className={`${myFont.className} text-[16px] text-center`}>
          TOP HOLDERS
        </h1>
        <div className="flex justify-between lg:w-full md:w-[600px] lg:mx-0 mx-auto mt-4 px-5">
          <p className={`  font-semibold text-[18px] text-[#3D00B7]`}>Holder</p>
          <p className={`  font-semibold text-[18px] text-[#3D00B7]`}>Share</p>
        </div>

        <Hot image="/topcol1.png" percentage={6.09} verified />
        <Hot image="/topcol2.png" percentage={1.52} />
        <Hot image="/punk4.avif" percentage={7.66} verified />
        <Hot image="/topcol3.png" percentage={2.72} />
        <Hot percentage={0.92} image="/topcol4.png" verified />
        <Hot percentage={3.47} image="/topcol5.png" />
        <Hot image="/punk2.avif" percentage={5.11} verified />
        <Hot image="/giveth6.avif" percentage={4.52} />
      </div>
    </div>
  );
}

export default TopCollection;
