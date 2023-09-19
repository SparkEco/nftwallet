import Image from "next/image";
import { DM_Sans, Poppins } from "next/font/google";
import local from "next/font/local";

const poppins = local({
  src: "./poppins/Poppins-Regular.ttf",
  display: "swap",
});

interface HotProps {
  address?: string;
  percentage: number;
  image: string;
  verified?: boolean;
}

function Hot({ image, percentage, verified, address }: HotProps) {
  return (
    <div className="flex items-center justify-around mt-[10px] lg:w-[370px] w-[350px] md:w-[600px] lg:mx-0 mx-auto">
      <div
        style={{ backgroundImage: `url('${image}')` }}
        className="bg-cover lg:h-[40px] lg:w-[40px] h-[35px] w-[35px] md:h-[40px] md:w-[40px] rounded-[50%] relative"
      >
        {verified && (
          <Image
            src={`/bluecheck.png`}
            width={22}
            height={22}
            alt="verified"
            className="absolute right-[-5px] top-[-6px]"
          />
        )}
      </div>
      <div className="block lg:w-[200px] md:w-[300px] w-[200px]">
        <p className={`  text-[14px] add`}>
          0x694e25cb5b5dd7430cfe5817c5cbf295fb72
        </p>
      </div>
      <p className={`${poppins.className} text-[16px] font-[600] }`}>
        {percentage.toLocaleString()}%
      </p>
    </div>
  );
}

export default Hot;
