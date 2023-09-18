import { Face, Ethgreen } from "../assets";

interface BidProps {
  image: string;
}

function Bid({ image }: BidProps) {
  return (
    <div className="flex space-x-3">
      <img src={image} alt="nft" className="w-[147px] h-[147px]" />
      <div className="block space-y-[12px]">
        <p className={`  font-semibold text-[20px]`}>The Futr Abstr</p>
        <div className="flex items-center space-x-1">
          <img src={Face} alt="PFP" className="w-[34px] h-[34px]" />
          <div
            className={`flex w-[80.5px] border border-[#00AC4F] p-2 space-x-1
                 text-[#00AC4F] rounded-[8px] h-[32px] items-center text-[12px]`}
          >
            <img alt="ETH" width={8} height={14} src={Ethgreen} />
            <p className={`  font-semibold`}>0.25 ETH</p>
          </div>
          <p className={`  text-[14px] text-[#757575]`}>1 of 8</p>
        </div>
        <button
          className={`border border-[#3D00B7] text-[#3D00B7] rounded-[30px]
               h-[45px] w-[112px] hover:text-white hover:bg-[#3D00B7]`}
        >
          Place a bid
        </button>
      </div>
    </div>
  );
}

export default Bid;
