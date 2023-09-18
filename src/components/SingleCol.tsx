import { Face } from "../assets";

interface CollectionProps {
  name: string;
  images: string[];
}

function SingleCol({ name, images }: CollectionProps) {
  const [img1, img2, img3, img4] = images;
  return (
    <div className="block">
      <div className="flex space-x-2">
        <img
          src={img1}
          alt="collection image"
          className="rounded-[25px] h-[222px] w-[215px] lg:h-[272px] lg:w-[265px]"
        />
        <div className="block space-y-3">
          <img
            src={img4}
            alt="collection image"
            className="lg:rounded-[25px] rounded-[13px] w-[83px] lg:w-[103px] h-[65px] lg:h-[85px]"
          />
          <img
            src={img3}
            alt="collection image"
            className="lg:rounded-[25px] rounded-[13px] w-[83px] lg:w-[103px] h-[65px] lg:h-[85px]"
          />
          <img
            src={img2}
            alt="collection image"
            className="lg:rounded-[25px] rounded-[13px] w-[83px] lg:w-[103px] h-[65px] lg:h-[85px]"
          />
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div className="block">
          <p className={`  text-[20px] font-bold mt-6`}>{name}</p>
          <div className="flex items-center space-x-2">
            <img src={Face} alt="face" className={`w-[28px] h-[28px]`} />
            <p className={`  text-[14px]`}>by Arkhan</p>
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
