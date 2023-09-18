import { Fast, Chart } from "../assets";

function Amaze() {
  return (
    <div className="bg-[#D9E0EC] w-full lg:h-[326px] h-fit py-[20px] lg:flex block lg:space-y-0 space-y-5 items-center justify-around text-black">
      <pre
        className={`lg:font-bold font-semibold text-[18px] integral lg:text-left text-center lg:text-[28px]`}
      >{`THE AMAZING NFT
ART OF THE WORLD HERE`}</pre>
      <div className="block lg:text-left text-center">
        <div className="flex items-center lg:justify-start justify-center space-x-2">
          <img
            src={Fast}
            alt="wallet"
            className="w-[20px] h-[20px] lg:h-[36px] lg:w-[36px]"
          />
          <p className={`font-semibold dmsans lg:text-[20px] text-[18px]`}>
            Fast Transactions
          </p>
        </div>
        <pre
          className={`dmsans lg:ml-[50px] ml-0 lg:text-[16px] text-[13px] mt-2 text-[#565656]`}
        >{`Lorem ipsum dolor sit amet,
consectetur adipiscing elit. Aliquam
etiam viverra tellus imperdiet.`}</pre>
      </div>
      <div className="block lg:text-left text-center">
        <div className="flex items-center space-x-2 lg:justify-start justify-center">
          <img
            src={Chart}
            alt="wallet"
            className="w-[20px] h-[20px] lg:h-[36px] lg:w-[36px]"
          />
          <p className={`  font-semibold lg:text-[20px] text-[18px]`}>
            Growth Transactions
          </p>
        </div>
        <pre
          className={`dmsans lg:ml-[50px] ml-0 lg:text-[16px] text-[13px] mt-2 text-[#565656]`}
        >{`Lorem ipsum dolor sit amet, consectetur
adipiscing elit. Aliquam etiam viverra tellus`}</pre>
      </div>
    </div>
  );
}

export default Amaze;
