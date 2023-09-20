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
      } lg:block hidden lg:top-[40px] top-[30px] opacity-70 left-2 lg:w-[400px] w-[250px] lg:h-[80vh] h-[40vh] bg-zinc-900/90 rounded-[10px] backdrop-blur p-4 overflow-y-auto text-white`}
      style={{ animationDuration: `${ANIM_DURATION}ms` }}
    >
      <p className={`text-white text-center text-[18px] font-semibold`}>
        {details.name}
      </p>
      <div className="block lg:w-[320px] relative lg:h-[200px] h-[180px] w-[220px] mx-auto mt-5">
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
          className="block mx-auto rounded-[15px] lg:w-[320px] lg:h-[200px] w-[220px] h-[160px]"
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
        className={`block mx-auto rounded-[13px] w-[150px] h-[150px] mt-5`}
      />
      <h1
        className={`text-white lg:text-[19px] text-[15px] mt-5 font-semibold text-center`}
      >
        Description
      </h1>
      <p className={`text-white lg:text-[13px] text-[11px] mt-3`}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore,
        deleniti eos nihil, dolores iusto excepturi nostrum exercitationem
        mollitia, ut fugiat id! Corrupti laboriosam voluptates minima eveniet
        quibusdam enim perferendis cum!
      </p>
      <h1
        className={`text-center lg:text-[19px] text-[15px] font-semibold mt-5`}
      >
        Owners
      </h1>
      <div className={`flex justify-between px-3 mt-2`}>
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
