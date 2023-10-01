import Image from "next/image";
import { IoChevronBackSharp, IoChevronForwardSharp } from "react-icons/io5";
import Share from "./Share";
import { SetStateAction } from "react";
import { MdClose } from "react-icons/md";
import { AiTwotoneFire } from "react-icons/ai";
import { MdWaterDrop, MdRecycling } from "react-icons/md";
import { GiEarthAfricaEurope, GiWhirlwind } from "react-icons/gi";
import { BsFillLightningFill } from "react-icons/bs";

interface PopupMobileProps {
  tabOpen: boolean;
  imgs: string[];
  currimage: number;
  details: any;
  nextImg: () => void;
  prevImg: () => void;
  setTabOpen: (value: SetStateAction<boolean>) => void;
}

function PopupMobile({
  tabOpen,
  imgs,
  currimage,
  details,
  nextImg,
  prevImg,
  setTabOpen,
}: PopupMobileProps) {
  const ANIM_DURATION = 300;
  const mountedClass = "dimo_mounted";
  const unmountingClass = "dimo_unmounting";
  return (
    <div
      className={`fixed dimo ${
        tabOpen ? mountedClass : unmountingClass
      }  text-zinc-200 shadow-zinc-800/5 flex flex-col gap-4 bg-zinc-800 ring-1 ring-white/10 lg:hidden md:hidden rounded-t-[20px] h-[52vh] z-10 overflow-y-auto p-4 w-full`}
      style={{ animationDuration: `${ANIM_DURATION}ms` }}
    >
      <button
        className={`p-1 rounded-[50%] bg-white lg:hidden block border absolute right-4 top-3`}
        onClick={() => setTabOpen(false)}
      >
        <MdClose size={16} color={"#000000"} />
      </button>
      <div className={`flex items-center relative ms-8 mt-2`}>
        <p className={`text-center text-[23px] font-bold`}>{details?.name}</p>
        <Image
          src={details?.nftimg}
          alt="NFT"
          width={150}
          height={150}
          className={`block ring-1 ring-white/80 rounded-[10px] w-[80px] h-[70px] absolute right-[0.8rem] top-[1.5rem] z-10`}
        />
      </div>
      <div className="block h-[180px] w-fit mx-auto">
        <button
          className={`absolute top-[30%] bg-zinc-900/40 disabled:bg-[#80808080] left-2 rounded-[50%] hover:opacity-75 p-1`}
          onClick={prevImg}
          disabled={currimage == 0}
        >
          <IoChevronBackSharp size={26} color={`#ffffff`} />
        </button>
        <Image
          loading="eager"
          src={imgs[currimage]}
          alt="Image"
          width={320}
          height={200}
          className="block mx-auto rounded-[15px] lg:h-[200px] w-[280px] h-[160px]"
        />
        <button
          disabled={currimage == imgs.length - 1 ? true : false}
          className={`absolute top-[30%] bg-zinc-900/40 disabled:bg-[#80808080] right-2 rounded-[50%] hover:opacity-75 p-1`}
          onClick={nextImg}
        >
          <IoChevronForwardSharp size={26} color={`#ffffff`} />
        </button>
      </div>
      <p className={`text-[19px] px-3 text-center font-semibold`}>Attributes</p>
      <div className="grid grid-cols-3 gap-x-5 gap-y-3 w-fit mx-auto">
        <div
          className={`bg-neutral-700 w-[35px] h-[35px] flex justify-center items-center rounded-[5px]`}
        >
          <AiTwotoneFire size={30} color={"#FFA500"} />
        </div>
        <div
          className={`bg-neutral-700 w-[35px] h-[35px] flex justify-center items-center rounded-[5px]`}
        >
          <MdWaterDrop size={30} color={"#007FFF"} />
        </div>
        <div
          className={`bg-neutral-700 w-[35px] h-[35px] flex justify-center items-center rounded-[5px]`}
        >
          <GiEarthAfricaEurope size={30} color={"#008000"} />
        </div>
        <div
          className={`bg-neutral-700 w-[35px] h-[35px] flex justify-center items-center rounded-[5px]`}
        >
          <BsFillLightningFill size={30} color={"#FFFF00"} />
        </div>
        <div
          className={`bg-neutral-700 w-[35px] h-[35px] flex justify-center items-center rounded-[5px]`}
        >
          <MdRecycling size={30} />
        </div>
        <div
          className={`bg-neutral-700 w-[35px] h-[35px] flex justify-center items-center rounded-[5px]`}
        >
          <GiWhirlwind size={30} color={"#6699CC"} />
        </div>
      </div>
      <h1 className={`text-[19px] font-bold text-center`}>Description</h1>
      <p className={`text-[12px] px-2`}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore,
        deleniti eos nihil, dolores iusto excepturi nostrum exercitationem
        mollitia, ut fugiat id! Corrupti laboriosam voluptates minima eveniet
        quibusdam enim perferendis cum!
      </p>
      <h1 className={`text-center text-[20px] font-bold`}>Owners</h1>
      <div className={`flex justify-between px-3`}>
        <p className={`text-[18px] font-semibold`}>Address</p>
        <p className={`text-[18px] font-semibold`}>Share</p>
      </div>
      <Share
        address="0x9c277ee7ef6974c73e51421419ff973579fd1d53"
        percentage="4.33"
      />
      <Share
        address="0x9c277ee7ef6974c73e51421419ff973579fd1d53"
        percentage="11.00"
      />
      <Share
        address="0x9c277ee7ef6974c73e51421419ff973579fd1d53"
        percentage="7.01"
      />
      <Share
        address="0x9c277ee7ef6974c73e51421419ff973579fd1d53"
        percentage="4.33"
      />
      <Share
        address="0x9c277ee7ef6974c73e51421419ff973579fd1d53"
        percentage="5.08"
      />
      <Share
        address="0x9c277ee7ef6974c73e51421419ff973579fd1d53"
        percentage="2.99"
      />
      <Share
        address="0x9c277ee7ef6974c73e51421419ff973579fd1d53"
        percentage="11.00"
      />
      <Share
        address="0x9c277ee7ef6974c73e51421419ff973579fd1d53"
        percentage="7.01"
      />
      <Share
        address="0x9c277ee7ef6974c73e51421419ff973579fd1d53"
        percentage="4.33"
      />
      <Share
        address="0x9c277ee7ef6974c73e51421419ff973579fd1d53"
        percentage="5.08"
      />
      <Share
        address="0x9c277ee7ef6974c73e51421419ff973579fd1d53"
        percentage="2.99"
      />
    </div>
  );
}

export default PopupMobile;
