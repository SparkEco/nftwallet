import Image from "next/image";
import CatButton from "./CatButton";
import localFont from "next/font/local";

const myFont = localFont({
  src: "./intcf/IntegralCF-Bold.otf",
  display: "swap",
});

function Discover() {
  return (
    <div className="flex justify-center items-center h-[90vh] bg-[#D9E0EC]">
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
        <div className="grid lg:grid-cols-4 gap-4">
          <div className="block mt-5 bg-[#FFFFFF] w-[269px] h-[373px] p-2 rounded-[20px]">
            <div
              style={{ backgroundImage: "url('/cardi.png')" }}
              className="bg-cover w-[247px] h-[222px] relative"
            >
              <Image
                src={`/face4.png`}
                alt="face"
                width={30}
                height={30}
                className="absolute bottom-[-15px] left-[5%]"
              />
              <Image
                src={`/face5.png`}
                alt="face"
                width={30}
                height={30}
                className="absolute bottom-[-15px] left-[12%]"
              />
              <Image
                src={`/face6.png`}
                alt="face"
                width={30}
                height={30}
                className="absolute bottom-[-15px] left-[19%]"
              />
              <Image
                src={`/face7.png`}
                alt="face"
                width={30}
                height={30}
                className="absolute bottom-[-15px] left-[26%]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Discover;
