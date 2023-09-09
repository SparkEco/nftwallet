import Image from "next/image";
import localFont from "next/font/local";
const myFont = localFont({
  src: "./intcf/IntegralCF-Bold.otf",
  display: "swap",
});
import { DM_Sans } from "next/font/google";
const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
});

function Create() {
  return (
    <div className="flex justify-center space-x-[80px] h-[100vh] items-center w-full">
      <div className="flex space-x-10 items-center">
        <div className="block space-y-6">
          <div
            style={{
              backgroundImage: "url('/tab1.png')",
            }}
            className="w-[300px] bg-cover rounded-[12px] h-[310px] relative"
          >
            <Image
              src={`/punk1.avif`}
              alt="face"
              width={40}
              height={40}
              className="absolute bottom-[-20px] left-[20%] rounded-[50%] border-2"
            />
            <Image
              src={`/face.png`}
              alt="face"
              width={40}
              height={40}
              className="absolute bottom-[-20px] left-[27%] rounded-[50%] border-2"
            />
            <Image
              src={`/giveth3.avif`}
              alt="face"
              width={40}
              height={40}
              className="absolute bottom-[-20px] left-[34%] rounded-[50%] border-2"
            />
            <Image
              src={`/punk4.avif`}
              alt="face"
              width={40}
              height={40}
              className="absolute bottom-[-20px] left-[41%] rounded-[50%] border-2"
            />
          </div>

          <div
            style={{
              backgroundImage: "url('/poap1.webp')",
            }}
            className="w-[204px] bg-cover rounded-[12px] h-[210px] relative float-right"
          >
            <Image
              src={`/punk1.avif`}
              alt="face"
              width={40}
              height={40}
              className="absolute bottom-[-10px] left-[26%] rounded-[50%] border-2"
            />
            <Image
              src={`/punk2.avif`}
              alt="face"
              width={40}
              height={40}
              className="absolute bottom-[-10px] left-[33%] rounded-[50%] border-2"
            />
            <Image
              src={`/punk3.avif`}
              alt="face"
              width={40}
              height={40}
              className="absolute bottom-[-10px] left-[40%] rounded-[50%] border-2"
            />
            <Image
              src={`/giveth4.avif`}
              alt="face"
              width={40}
              height={40}
              className="absolute bottom-[-10px] left-[46%] rounded-[50%] border-2"
            />
          </div>
        </div>
        <div
          style={{
            backgroundImage: "url('/giveth2.avif')",
          }}
          className="w-[240px] bg-cover rounded-[12px] h-[265px] relative float-right"
        >
          <Image
            src={`/punk4.avif`}
            alt="face"
            width={40}
            height={40}
            className="absolute bottom-[-20px] left-[20%] rounded-[50%] border-2"
          />
          <Image
            src={`/giveth5.avif`}
            alt="face"
            width={40}
            height={40}
            className="absolute bottom-[-20px] left-[27%] rounded-[50%] border-2"
          />
          <Image
            src={`/face4.png`}
            alt="face"
            width={40}
            height={40}
            className="absolute bottom-[-20px] left-[34%] rounded-[50%] border-2"
          />
          <Image
            src={`/giveth6.avif`}
            alt="face"
            width={40}
            height={40}
            className="absolute bottom-[-20px] left-[41%] rounded-[50%] border-2"
          />
        </div>
      </div>
      <div className="block space-y-4">
        <pre className={`${myFont.className} text-[32px]`}>
          {`CREATE AND SELL
YOUR NFTS`}
        </pre>
        <p
          className={`${dmSans.className} text-[#636363] text-[18px] lg:w-[512px]`}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Facilisi ac
          phasellus placerat a pellentesque tellus sed egestas. Et tristique
          dictum sit tristique sed non. Lacinia lorem id consectetur pretium
          diam ut. Pellentesque eu sit blandit fringilla risus faucibus.
        </p>
        <button
          className={`text-[#3D00B7] border border-[#3D00B7] w-[212px]
           h-[65px] rounded-[40px] hover:bg-[#3D00B7] hover:text-white`}
        >
          Sign Up now
        </button>
      </div>
    </div>
  );
}

export default Create;
