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
              backgroundImage: "url('/stack1.png')",
            }}
            className="w-[300px] bg-cover rounded-[20px] h-[310px] relative"
          >
            <Image
              src={`/face2.png`}
              alt="face"
              width={80}
              height={80}
              className="absolute bottom-[-20px] right-[-20px]"
            />
          </div>

          <div
            style={{
              backgroundImage: "url('/stack3.png')",
            }}
            className="w-[194px] bg-cover rounded-[20px] h-[214px] relative float-right"
          >
            <Image
              src={`/face3.png`}
              alt="face"
              width={80}
              height={80}
              className="absolute bottom-[-20px] right-[-20px]"
            />
          </div>
        </div>
        <div
          style={{
            backgroundImage: "url('/stack2.png')",
          }}
          className="w-[240px] bg-cover rounded-[20px] h-[265px] relative float-right"
        >
          <Image
            src={`/face5.png`}
            alt="face"
            width={71}
            height={71}
            className="absolute bottom-[-20px] right-[-20px]"
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
