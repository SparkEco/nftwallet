import { SetStateAction } from "react";
import Image from "next/image";
import Slider from "./Slider";
import ScrollAreaComponent from "./ScrollArea";
import HoverPop from "./HoverPop";
import { IoClose } from "react-icons/io5";

interface PopupDesktopProps {
  tabOpen: boolean;
  nftid: number;
  imgs: string[];
  attributes: string[];
  currimage: number;
  details: any;
  setTabOpen: (value: SetStateAction<boolean>) => void;
}

function PopupDesktop({
  tabOpen,
  imgs,
  nftid,
  setTabOpen,
  currimage,
  attributes,
  details,
}: PopupDesktopProps) {
  return (
    <ScrollAreaComponent tabOpen={tabOpen} setTabOpen={setTabOpen}>
      <div className="block relative mx-auto lg:h-[200px] h-[190px] w-[350px] mb-7">
        <button
          onClick={() => setTabOpen(false)}
          className={`absolute top-2 right-3 w-[30px] h-[30px] rounded-[50%] flex justify-center items-center bg-white`}
        >
          <IoClose size={23} color={"#000000"} />
        </button>
        <Image
          loading="eager"
          src={details.nftcover}
          alt="Image"
          width={350}
          height={200}
          className="block w-[350px] rounded-b-[0.4rem] h-[190px] md:h-[160px] lg:h-[190px]"
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

      <div className="grid grid-cols-4 gap-x-4 gap-y-3 w-fit mx-auto">
        {attributes.map((attri, index) => (
          <div
            key={index}
            className={`bg-white w-[63px] h-[63px] flex justify-center items-center rounded-[50%]`}
          >
            <HoverPop name={attri}>
              <Image
                aria-label="hhhhh"
                alt="attribute"
                src={attri}
                width={60}
                height={60}
                className={`w-[60px] h-[60px]`}
              />
            </HoverPop>
          </div>
        ))}
      </div>
      <div className={`block mx-auto w-[320px]`}>
        <h1 className={`text-[19px] font-semibold text-center`}>Description</h1>
        <p className={`lg:text-[13px] text-[11px] `}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore,
          deleniti eos nihil, dolores iusto excepturi nostrum exercitationem
          mollitia, ut fugiat id! Corrupti laboriosam voluptates minima eveniet
          quibusdam enim perferendis cum!
        </p>
      </div>
      <div className={`mt-6`}>
        <Slider imgs={imgs} />
      </div>
    </ScrollAreaComponent>
  );
}

export default PopupDesktop;
