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
  name: string;
  index: number;
  image: string;
  price: number;
  percentage: number;
  verified?: boolean;
  bullish?: boolean;
}

function Hot({
  name,
  image,
  index,
  price,
  percentage,
  verified,
  bullish,
}: HotProps) {
  return (
    <div className="flex items-center space-x-6 mt-[30px]">
      <p className={`${dmsans.className} text-[24px] font-bold`}>{index}</p>
      <div
        style={{ backgroundImage: `url('${image}')` }}
        className="bg-cover h-[60px] w-[60px] rounded-[50%] relative"
      >
        {verified && (
          <Image
            src={`/bluecheck.png`}
            width={32}
            height={32}
            alt="verified"
            className="absolute right-[-5px] top-[-6px]"
          />
        )}
      </div>
      <div className="block">
        <p className={`${dmsans.className} text-[16px]`}>{name}</p>
        <div className="flex space-x-1 items-center">
          <Image src={`/eth3.png`} width={15} height={24} alt="ETH" />
          <p className={`${poppins.className} text-[14px] text-[#636363]`}>
            {price.toLocaleString()}
          </p>
        </div>
      </div>
      <p
        className={`${poppins.className} text-[20px] font-semibold ${
          bullish ? "text-[#14C8B0]" : "text-[#FF002E]"
        }`}
      >
        <span>{bullish ? "+" : "-"}</span>
        {percentage.toLocaleString()}%
      </p>
    </div>
  );
}

export default Hot;
