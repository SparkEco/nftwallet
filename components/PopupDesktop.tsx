import { SetStateAction } from "react";
import { IoChevronBackSharp, IoChevronForwardSharp } from "react-icons/io5";
import Image from "next/image";
import Share from "./Share";

interface PopupDesktopProps {
  tabOpen: boolean;
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
      className={`absolute dimo ${
        tabOpen ? mountedClass : unmountingClass
      } flex flex-col top-[50px] px-4 py-2
      ring-white/10 text-zinc-200 ring-1 left-4 shadow-zinc-800/5 h-[80vh]
       bg-zinc-800/30 rounded-xl backdrop-blur-sm p-4 overflow-y-auto gap-4`}
      style={{ animationDuration: `${ANIM_DURATION}ms` }}
    >
      <p className={`text-center text-[24px] font-semibold`}>{details.name}</p>
      <div className="block lg:w-[320px] relative lg:h-[200px] h-[180px] w-[220px] mx-auto">
        <button
          className={`absolute top-[40%] bg-zinc-900/40 disabled:bg-[#80808080] left-4 rounded-[50%] hover:opacity-75 p-1`}
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
          className="block mx-auto w-[290px] rounded-xl h-[200px]"
        />
        <button
          disabled={currimage == imgs.length - 1 ? true : false}
          className={`absolute top-[40%] bg-zinc-900/40 disabled:bg-[#80808080] right-4 rounded-[50%] hover:opacity-75 p-1`}
          onClick={nextImg}
        >
          <IoChevronForwardSharp size={26} color={`#ffffff`} />
        </button>
      </div>
      <Image
        src={details.nftimg}
        alt="NFT"
        width={150}
        height={150}
        className={`block mx-auto rounded-[13px] w-[150px] h-[150px]`}
      />
      <h1 className={`g:text-[19px] text-[15px] font-semibold text-center`}>
        Description
      </h1>
      <p className={`lg:text-[13px] text-[11px] w-[320px]`}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore,
        deleniti eos nihil, dolores iusto excepturi nostrum exercitationem
        mollitia, ut fugiat id! Corrupti laboriosam voluptates minima eveniet
        quibusdam enim perferendis cum!
      </p>
      <h1 className={`text-center lg:text-[19px] text-[15px] font-semibold`}>
        Owners
      </h1>
      <div className={`flex justify-between px-3 `}>
        <p className={`text-[18px] font-semibold`}>Address</p>
        <p className={`text-[18px] font-semibold`}>Share</p>
      </div>
      <Share
        address="0x9c277ee7ef6974c73e51421419ff973579fd1d53"
        percentage="22.40"
      />
      <Share
        address="0x9c277ee7ef6974c73e51421419ff973579fd1d53"
        percentage="0.73"
      />
      <Share
        address="0x10cb0ab131f5bb879f7b91c86c9d48f971b6ba27"
        percentage="1.44"
      />
      <Share
        address="0x9c277ee7ef6974c73e51421419ff973579fd1d53"
        percentage="2.32"
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

export default PopupDesktop;
