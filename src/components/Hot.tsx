import { Bluecheck } from "../assets";

interface HotProps {
  address?: string;
  percentage: number;
  image: string;
  verified?: boolean;
}

function Hot({ image, percentage, verified }: HotProps) {
  return (
    <div className="flex items-center justify-around mt-[10px] lg:w-[370px] w-[350px] md:w-[600px] lg:mx-0 mx-auto">
      <div
        style={{ backgroundImage: `url('${image}')` }}
        className="bg-cover lg:h-[40px] lg:w-[40px] h-[35px] w-[35px] md:h-[40px] md:w-[40px] rounded-[50%] relative"
      >
        {verified && (
          <img
            src={Bluecheck}
            alt="verified"
            className="absolute right-[-5px] w-[22px] h-[22px] top-[-6px]"
          />
        )}
      </div>
      <div className="block lg:w-[200px] md:w-[300px] w-[200px]">
        <p className={`dmsans text-[14px] add`}>
          0x694e25cb5b5dd7430cfe5817c5cbf295fb72
        </p>
      </div>
      <p className={`  text-[16px] font-[600] }`}>
        {percentage.toLocaleString()}%
      </p>
    </div>
  );
}

export default Hot;
