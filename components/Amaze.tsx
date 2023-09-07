import localFont from "next/font/local";
import { DM_Sans } from "next/font/google";
import Image from "next/image";

const myFont = localFont({
  src: "./intcf/IntegralCF-Bold.otf",
  display: "swap",
});

const dmsans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
});

function Amaze() {
  return (
    <div className="bg-[#D9E0EC] w-full h-[326px] flex items-center justify-around text-black">
      <pre
        className={`${myFont.className} font-bold text-[28px]`}
      >{`THE AMAZING NFT
ART OF THE WORLD HERE`}</pre>
      <div className="block">
        <div className="flex items-center space-x-2">
          <Image src={`/fast.png`} width={36} height={36} alt="wallet" />
          <p className={`${dmsans.className} font-semibold text-[20px]`}>
            Fast Transactions
          </p>
        </div>
        <pre
          className={`${dmsans.className} ml-[50px] mt-2 text-[#565656]`}
        >{`Lorem ipsum dolor sit amet,
consectetur adipiscing elit. Aliquam
etiam viverra tellus imperdiet.`}</pre>
      </div>
      <div className="block">
        <div className="flex items-center space-x-2">
          <Image src={`/chart.png`} width={36} height={36} alt="wallet" />
          <p className={`${dmsans.className} font-semibold text-[20px]`}>
            Growth Transactions
          </p>
        </div>
        <pre
          className={`${dmsans.className} ml-[50px] mt-2 text-[#565656]`}
        >{`Lorem ipsum dolor sit amet, consectetur
adipiscing elit. Aliquam etiam viverra tellus`}</pre>
      </div>
    </div>
  );
}

export default Amaze;
