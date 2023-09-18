import CatButton from "./CatButton";
import Col from "./Col";
import { Filter, Poap2 } from "../assets";

function Discover() {
  return (
    <div className="flex justify-center items-center py-[80px] bg-[#D9E0EC]">
      <div className="block w-full">
        <p className={`  text-[34px] ml-[11%] mb-5`}>DISCOVER MORE NFTS</p>
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
            <img src={Filter} alt="filter" className="mr-2 w-[24px] h-[24px]" />
            Filters
          </button>
        </div>
        <div className="flex justify-center">
          <div className="grid lg:grid-cols-4 lg:gap-10">
            <Col name="Gitpoap" img={Poap2} />
            <Col name="Gitpoap" img={Poap2} />
            <Col name="Gitpoap" img={Poap2} />
            <Col name="Gitpoap" img={Poap2} />
            <Col name="Gitpoap" img={Poap2} />
            <Col name="Gitpoap" img={Poap2} />
            <Col name="Gitpoap" img={Poap2} />
            <Col name="Gitpoap" img={Poap2} />
            <Col name="Gitpoap" img={Poap2} />
            <Col name="Gitpoap" img={Poap2} />
            <Col name="Gitpoap" img={Poap2} />
            <Col name="Gitpoap" img={Poap2} />
          </div>
        </div>
        <button
          className={`  text-[#4F33A3] hover:bg-[#4F33A3] hover:text-white w-[179px] h-[66px] rounded-[50px] border border-[#3D00B7] block mx-auto mt-[60px]`}
        >
          More NFTS
        </button>
      </div>
    </div>
  );
}

export default Discover;
