import { SetStateAction } from "react";
import Image from "next/image";
import { AiTwotoneFire } from "react-icons/ai";
import { MdWaterDrop, MdRecycling } from "react-icons/md";
import { GiEarthAfricaEurope, GiWhirlwind } from "react-icons/gi";
import { BsFillLightningFill } from "react-icons/bs";
import Slider from "./Slider";

interface PopupDesktopProps {
  tabOpen: boolean;
  nftid: number;
  imgs: string[];
  currimage: number;
  details: any;
  nextImg: () => void;
  prevImg: () => void;
  setTabOpen: (value: SetStateAction<boolean>) => void;
}

function PopupDesktop({
  tabOpen,
  imgs,
  nftid,
  currimage,
  nextImg,
  prevImg,
  details,
}: PopupDesktopProps) {
  const ANIM_DURATION = 300;
  const mountedClass = "dimo_mounted";
  const unmountingClass = "dimo_unmounting";

  return (
    <div
      className={`lg:absolute md:absolute fixed dimo ${
        tabOpen ? mountedClass : unmountingClass
      } flex flex-col lg:top-[20px] md:top-[20px] bottom-0 ring-white/10 text-zinc-200 ring-1 lg:left-3 md:left-3 left-0 z-10
       shadow-zinc-800/5 md:h-[65vh] h-[52vh] lg:h-[85vh] bg-zinc-800/80 lg:rounded-[9px] rounded-t-[20px] lg:w-[350px] w-full backdrop-blur-sm overflow-y-auto gap-3`}
      style={{ animationDuration: `${ANIM_DURATION}ms` }}
    >
      <div className="block relative lg:h-[200px] h-[190px] w-full mb-7">
        <Image
          loading="eager"
          src={imgs[1]}
          alt="Image"
          width={320}
          height={200}
          className="block w-full rounded-b-[0.4rem] h-[150px] md:h-[160px] lg:h-[190px]"
        />
        <Image
          src={details.nftimg}
          alt="NFT"
          width={100}
          height={100}
          className={`block ring-1 ring-white/80 rounded-[50%] lg:w-[100px] lg:h-[100px] w-[70px] h-[70px] absolute left-1/2 transform -translate-x-1/2 bottom-[-2rem]`}
        />
      </div>
      <p className={`text-[24px] font-semibold text-center`}>{details.name}</p>
      {/* <p className={`lg:text-[19px] px-3 text-center font-semibold`}>
        Attributes
      </p> */}
      <div className="grid grid-cols-4 gap-x-5 gap-y-3 w-fit mx-auto">
        <div
          className={`bg-yellow-100 w-[50px] h-[50px] flex justify-center items-center rounded-[50%]`}
        >
          <AiTwotoneFire size={30} color={"#FFA500"} />
        </div>
        <div
          className={`bg-yellow-100 w-[50px] h-[50px] flex justify-center items-center rounded-[50%]`}
        >
          <MdWaterDrop size={30} color={"#007FFF"} />
        </div>
        <div
          className={`bg-yellow-100 w-[50px] h-[50px] flex justify-center items-center rounded-[50%]`}
        >
          <GiEarthAfricaEurope size={30} color={"#008000"} />
        </div>
        <div
          className={`bg-yellow-100 w-[50px] h-[50px] flex justify-center items-center rounded-[50%]`}
        >
          <BsFillLightningFill size={30} color={"#FFD700"} />
        </div>
        <div
          className={`bg-yellow-100 w-[50px] h-[50px] flex justify-center items-center rounded-[50%]`}
        >
          <MdRecycling size={30} color={"#000000"} />
        </div>
        <div
          className={`bg-yellow-100 w-[50px] h-[50px] flex justify-center items-center rounded-[50%]`}
        >
          <GiWhirlwind size={30} color={"#6699CC"} />
        </div>
      </div>
      <div className={`block mx-auto`}>
        <h1 className={`text-[19px] font-semibold text-center`}>Description</h1>
        <p className={`lg:text-[13px] text-[11px] w-[320px]`}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore,
          deleniti eos nihil, dolores iusto excepturi nostrum exercitationem
          mollitia, ut fugiat id! Corrupti laboriosam voluptates minima eveniet
          quibusdam enim perferendis cum!
        </p>
      </div>
      <div className={`mt-6`}>
        <Slider imgs={imgs} />
      </div>
    </div>
  );
}

export default PopupDesktop;
