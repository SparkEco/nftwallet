import { Dot, Giveth1, Giveth2, Giveth3, Herobg } from "../assets";

function Hero() {
  return (
    <div
      className="lg:flex block lg:justify-around lg:py-[100px] md:py-[80px] py-[50px] h-fit w-full relative
       bg-cover bg-fixed bg-center bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)), url('${Herobg}')`,
      }}
    >
      <div className="relative">
        <pre
          className={`integral lg:font-[800] lg:text-[40px] md:text-[30px] text-[24px] lg:text-left text-center font-[700]`}
        >{`DISCOVER, AND COLLECT
DIGITAL ART NFTs`}</pre>
        <pre
          className={`dmsans font-normal not-italic text-black lg:text-left text-center lg:text-[18px] md:text-[18px] text-[13px]`}
        >
          {`Digital marketplace for crypto collectibles and 
non-fungible tokens (NFTs). Buy, Sell, and discover
exclusive digital assets.`}
        </pre>
        <button
          className="flex justify-center items-center lg:p-3 p-2 rounded-[20px] text-white lg:mx-0 mx-auto
         font-semibold lg:w-[150px] md:w-[130px] w-[120px] lg:h-[50px] md:h-[45px] h-[35px] mt-3 bg-[#3D00B7]"
        >
          Explore Now
        </button>
        <div className="flex space-x-2 mt-3 relative items-center justify-center lg:justify-start">
          <img
            src={Dot}
            className="absolute top-[-70px] lg:left-[-30px] left-[30%] lg:w-[196px] lg:h-[154px] w-[146px] h-[104px] z-[-1]"
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

      <div
        className="relative lg:w-[500px] lg:h-[500px] w-[280px] h-[280px] md:w-[400px]
       md:h-[400px] md:mt-[150px] lg:mt-0  mt-[90px] mx-auto lg:mx-0"
      >
        <div className="absolute lg:right-[60px] right-[20px] bottom-[20%]">
          <div
            style={{ backgroundImage: `url('${Giveth1}')` }}
            className={`bg-cover lg:h-[440px] z-[2] lg:w-[400px]
           md:h-[430px] md:w-[360px] w-[250px] h-[290px] relative p-4 rounded-[24px]`}
          ></div>
        </div>
        <img
          alt="stack"
          src={Giveth2}
          className="absolute bottom-[25%] lg:right-[30px] right-[5px] z-[1] w-[200px] h-[250px]
           lg:h-[391px] md:h-[380px] md:w-[340px] lg:w-[356px] rounded-[24px]"
        />
        <img
          alt="stack"
          width={310}
          height={341}
          src={Giveth3}
          className="absolute lg:top-0 md:top-[-12%] top-[-10px] lg:right-0 right-[-10px] lg:w-[310px]
           lg:h-[341px] md:h-[320px] md:w-[280px] w-[150px] h-[200px] z-0 rounded-[24px]"
        />
      </div>
    </div>
  );
}

export default Hero;
