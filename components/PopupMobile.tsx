import Image from "next/image";
import { IoChevronBackSharp, IoChevronForwardSharp } from "react-icons/io5";
import Share from "./Share";
import { SetStateAction } from "react";
import { MdClose } from "react-icons/md";

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
      } bottom-0 text-black shadow-black lg:hidden md:hidden block h-[50vh] z-10 rounded-t-[30px] overflow-y-scroll px-2 py-4 w-full bg-white`}
      style={{ animationDuration: `${ANIM_DURATION}ms` }}
    >
      <button
        className={`p-1 rounded-[50%] bg-white lg:hidden block border absolute right-4 top-3`}
        onClick={() => setTabOpen(false)}
      >
        <MdClose size={16} color={"#000000"} />
      </button>
      <p className={`text-center text-[20px] text-[#3D00B7] font-semibold`}>
        {details?.name}
      </p>
      <div className="block h-[180px] w-[220px] mx-auto mt-5">
        <button
          className={`absolute top-[30%] bg-zinc-900/40 disabled:bg-[#80808080] left-4 rounded-[50%] hover:opacity-75 p-1`}
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
          className={`absolute top-[30%] bg-zinc-900/40 disabled:bg-[#80808080] right-4 rounded-[50%] hover:opacity-75 p-1`}
          onClick={nextImg}
        >
          <IoChevronForwardSharp size={26} color={`#ffffff`} />
        </button>
      </div>
      <Image
        src={details?.nftimg}
        alt="NFT"
        width={150}
        height={150}
        className={`block mx-auto rounded-[13px] w-[150px] h-[150px] mt-3`}
      />
      <h1 className={`text-[19px] font-bold text-center mt-5`}>Description</h1>
      <p className={`text-[12px] px-2 mt-2`}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore,
        deleniti eos nihil, dolores iusto excepturi nostrum exercitationem
        mollitia, ut fugiat id! Corrupti laboriosam voluptates minima eveniet
        quibusdam enim perferendis cum!
      </p>
      <h1 className={`text-center text-[20px] font-bold mt-5`}>Owners</h1>
      <div className={`flex justify-between px-3 mt-3`}>
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
