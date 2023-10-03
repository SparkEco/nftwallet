import { SetStateAction } from "react";
import Image from "next/image";
import { AiTwotoneFire } from "react-icons/ai";
import { MdWaterDrop, MdRecycling } from "react-icons/md";
import { GiEarthAfricaEurope, GiWhirlwind } from "react-icons/gi";
import { BsFillLightningFill } from "react-icons/bs";
import Slider from "./Slider";
import ScrollAreaComponent from "./ScrollArea";

interface PopupDesktopProps {
  tabOpen: boolean;
  nftid: number;
  imgs: string[];
  currimage: number;
  details: any;

  setTabOpen: (value: SetStateAction<boolean>) => void;
}

function PopupDesktop({
  tabOpen,
  imgs,
  nftid,
  currimage,
  details,
}: PopupDesktopProps) {
  const ANIM_DURATION = 300;
  const mountedClass = "dimo_mounted";
  const unmountingClass = "dimo_unmounting";

  return (
    <ScrollAreaComponent>
      <div
        className={` ${
          tabOpen ? mountedClass : unmountingClass
        }   text-zinc-200 
        `}
        style={{ animationDuration: `${ANIM_DURATION}ms` }}
      >
        <div className="block relative lg:h-[200px] h-[190px] w-full mb-7">
          <Image
            loading="eager"
            src={details.nftcover}
            alt="Image"
            width={350}
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
        <p className={`text-[24px] font-semibold text-center`}>
          {details.name}
        </p>

        <div className="grid grid-cols-4 gap-x-5 gap-y-3 w-fit mx-auto">
          {details.attributes.map((attri: string, index: number) => (
            <div
              key={index}
              className={`bg-white w-[50px] h-[50px] flex justify-center items-center rounded-[50%]`}
            >
              <Image
                alt="attribute"
                src={attri}
                width={45}
                height={45}
                className={`w-[45px] h-[45px]`}
              />
            </div>
          ))}
        </div>
        <div className={`block mx-auto`}>
          <h1 className={`text-[19px] font-semibold text-center`}>
            Description
          </h1>
          <p className={`lg:text-[13px] text-[11px] w-[320px]`}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore,
            deleniti eos nihil, dolores iusto excepturi nostrum exercitationem
            mollitia, ut fugiat id! Corrupti laboriosam voluptates minima
            eveniet quibusdam enim perferendis cum!
          </p>
        </div>
        <div className={`mt-6`}>
          <Slider imgs={imgs} />
        </div>
      </div>
    </ScrollAreaComponent>
  );
}

export default PopupDesktop;
