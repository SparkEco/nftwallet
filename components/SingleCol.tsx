import Image from "next/image";
import { DM_Sans } from "next/font/google";

const dmsans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
});

interface CollectionProps {
  name: string;
  images: string[];
}

function SingleCol({ name, images }: CollectionProps) {
  const [img1, img2, img3, img4] = images;
  return (
    <div className="block">
      <div className="flex space-x-2">
        <Image
          src={img1}
          alt="collection image"
          width={265}
          height={272}
          className="rounded-[25px] h-[222px] w-[215px] lg:h-[272px] lg:w-[265px]"
        />
        <div className="block space-y-3">
          <Image
            src={img4}
            alt="collection image"
            width={103}
            height={85}
            className="lg:rounded-[25px] rounded-[13px] w-[83px] lg:w-[103px] h-[65px] lg:h-[85px]"
          />
          <Image
            src={img3}
            alt="collection image"
            width={103}
            height={85}
            className="lg:rounded-[25px] rounded-[13px] w-[83px] lg:w-[103px] h-[65px] lg:h-[85px]"
          />
          <Image
            src={img2}
            alt="collection image"
            width={103}
            height={85}
            className="lg:rounded-[25px] rounded-[13px] w-[83px] lg:w-[103px] h-[65px] lg:h-[85px]"
          />
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div className="block">
          <p className={`${dmsans.className} text-[20px] font-bold mt-6`}>
            {name}
          </p>
          <div className="flex items-center space-x-2">
            <Image src={`/face.png`} alt="face" width={28} height={28} />
            <p className={`${dmsans.className} text-[14px]`}>by Arkhan</p>
          </div>
        </div>
        <button
          className={`rounded-[20px] border border-[#2639ED] h-[29px] w-[98px] text-[#2639ED] text-[11px] mt-[40px]`}
        >
          Total 54 items
        </button>
      </div>
    </div>
  );
}

export default SingleCol;
