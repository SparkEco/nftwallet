import Image from "next/image";
import { DM_Sans, Poppins } from "next/font/google";

const dmsans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"],
});

interface HotProps {
  address?: string;
  percentage: number;
  image: string;
  verified?: boolean;
}

function Hot({ image, percentage, verified, address }: HotProps) {
  return (
    <div className="flex items-center justify-around mt-[30px] w-[370px]">
      <div
        style={{ backgroundImage: `url('${image}')` }}
        className="bg-cover h-[40px] w-[40px] rounded-[50%] relative"
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
      <div className="block w-[200px]">
        <p className={`${dmsans.className} text-[16px] add`}>
          0x694e25cb5b5dd7430cfe5817c5cbf295fb72
        </p>
      </div>
      <p className={`${poppins.className} text-[20px] font-semibold }`}>
        {percentage.toLocaleString()}%
      </p>
    </div>
  );
}

export default Hot;
