//import Bid from "./Bid";
import Hot from "./Hot";
import {
  Eth2,
  Giveth6,
  Poap2,
  Punk2,
  Punk3,
  Punk4,
  Topcol1,
  Topcol2,
  Topcol3,
  Topcol4,
  Topcol5,
} from "../assets";

function TopCollection() {
  return (
    <div className="lg:flex block justify-center py-[100px] lg:space-x-11 space-x-0 w-full">
      <div className="block lg:mx-0 mx-auto">
        <img
          src={Poap2}
          alt="nft"
          className={`lg:w-[400px] lg:h-[400px] md:w-[300px] md:h-[300px] w-[250px] h-[250px] mx-auto`}
        />
        <div className="flex items-center mt-2 mx-auto w-fit">
          <img
            src={Punk3}
            alt="face"
            className="rounded-[50%] w-[48px] h-[48px]"
          />
          <div className="block ml-2">
            <p className={`font-semibold text-[20px]`}>The Git POAP</p>
            <p className={`text-[#565656] text-[14px]`}>10 in the stock</p>
          </div>
          <div className="block ml-[50px]">
            <p className={`  text-[#565656] text-[12px]`}>Highest Bid</p>
            <div className="flex mt-1 items-center space-x-1">
              <img src={Eth2} alt="ETH" className={`w-[13px] h-[21px]`} />
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
        <h1 className={`integral text-[16px] text-center`}>TOP HOLDERS</h1>
        <div className="flex justify-between lg:w-full md:w-[600px] lg:mx-0 mx-auto mt-4 px-5">
          <p className={`dmsans font-semibold text-[18px] text-[#3D00B7]`}>
            Holder
          </p>
          <p className={`dmsans font-semibold text-[18px] text-[#3D00B7]`}>
            Share
          </p>
        </div>

        <Hot image={Topcol1} percentage={6.09} verified />
        <Hot image={Topcol2} percentage={1.52} />
        <Hot image={Punk4} percentage={7.66} verified />
        <Hot image={Topcol3} percentage={2.72} />
        <Hot percentage={0.92} image={Topcol4} verified />
        <Hot percentage={3.47} image={Topcol5} />
        <Hot image={Punk2} percentage={5.11} verified />
        <Hot image={Giveth6} percentage={4.52} />
      </div>
    </div>
  );
}

export default TopCollection;
