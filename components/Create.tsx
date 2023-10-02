import Image from "next/image";
import localFont from "next/font/local";
const myFont = localFont({
  src: "./intcf/IntegralCF-Bold.otf",
  display: "swap",
});
import { DM_Sans } from "next/font/google";

function Create() {
  return (
    <div className="lg:flex block justify-center lg:space-x-[80px] space-x-0 lg:h-[100vh] h-fit items-center w-full lg:py-0 py-[30px]">
      <div className="flex lg:space-x-10 lg:p-0 p-2 lg:space-y-0 space-y-5 items-center">
        <div className="block space-y-6 lg:mx-0 mx-auto">
          <div
            style={{
              backgroundImage: "url('/nfts/F1daXLaaIAANzSM.jpg')",
            }}
            className="lg:w-[300px] w-[150px] bg-cover rounded-[12px] lg:h-[310px] h-[170px] relative lg:mx-o mx-auto"
          >
            <Image
              src={`/punk4.avif`}
              alt="face"
              width={40}
              height={40}
              className="absolute bottom-[-20px] right-[35%] rounded-[50%] border-2"
            />
            <Image
              src={`/giveth3.avif`}
              alt="face"
              width={40}
              height={40}
              className="absolute bottom-[-20px] right-[28%] rounded-[50%] border-2"
            />
            <Image
              src={`/face.png`}
              alt="face"
              width={40}
              height={40}
              className="absolute bottom-[-20px] right-[21%] rounded-[50%] border-2"
            />
            <Image
              src={`/punk1.avif`}
              alt="face"
              width={40}
              height={40}
              className="absolute bottom-[-20px] right-[14%] rounded-[50%] border-2"
            />
          </div>

          <div
            style={{
              backgroundImage: "url('/nfts/F5f8Vx7XYAAAwBN.jpg')",
            }}
            className="lg:w-[210px] w-[140px] bg-cover rounded-[12px] lg:h-[210px] h-[140px] relative float-none lg:float-right lg:mx-o mx-auto"
          >
            <Image
              src={`/giveth4.avif`}
              alt="face"
              width={40}
              height={40}
              className="absolute bottom-[-10px] right-[42%] rounded-[50%] border-2"
            />
            <Image
              src={`/punk3.avif`}
              alt="face"
              width={40}
              height={40}
              className="absolute bottom-[-10px] right-[36%] rounded-[50%] border-2"
            />
            <Image
              src={`/punk2.avif`}
              alt="face"
              width={40}
              height={40}
              className="absolute bottom-[-10px] right-[29%] rounded-[50%] border-2"
            />

            <Image
              src={`/punk1.avif`}
              alt="face"
              width={40}
              height={40}
              className="absolute bottom-[-10px] right-[22%] rounded-[50%] border-2"
            />
          </div>
        </div>

        {/* 3rd */}
        <div
          style={{
            backgroundImage: "url('/nfts/F5MBHaTXUAAblsR.jpg')",
          }}
          className="lg:w-[240px] w-[150px] bg-cover block rounded-[12px] lg:h-[265px] h-[170px] relative lg:float-right float-none lg:mx-0 mx-auto"
        >
          <Image
            src={`/giveth6.avif`}
            alt="face"
            width={40}
            height={40}
            className="absolute bottom-[-20px] right-[37%] rounded-[50%] border-2"
          />
          <Image
            src={`/face4.png`}
            alt="face"
            width={40}
            height={40}
            className="absolute bottom-[-20px] right-[30%] rounded-[50%] border-2"
          />
          <Image
            src={`/giveth5.avif`}
            alt="face"
            width={40}
            height={40}
            className="absolute bottom-[-20px] right-[21%] rounded-[50%] border-2"
          />
          <Image
            src={`/punk4.avif`}
            alt="face"
            width={40}
            height={40}
            className="absolute bottom-[-20px] right-[14%] rounded-[50%] border-2"
          />
        </div>
      </div>
      <div className="block lg:mt-0 mt-[50px] space-y-4">
        <pre
          className={`${myFont.className} lg:text-[32px] text-[23px] lg:text-left text-center block`}
        >
          {`CREATE AND SELL
YOUR NFTS`}
        </pre>
        <p
          className={`  text-[#636363] lg:text-[18px] text-[15px] lg:w-[512px] w-[80%] lg:text-left text-center block lg:mx-0 mx-auto`}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Facilisi ac
          phasellus placerat a pellentesque tellus sed egestas. Et tristique
          dictum sit tristique sed non. Lacinia lorem id consectetur pretium
          diam ut. Pellentesque eu sit blandit fringilla risus faucibus.
        </p>
        <button
          className={`text-[#3D00B7] border border-[#3D00B7] lg:w-[212px] w-[160px]
           lg:h-[65px] h-[45px] rounded-[40px] hover:bg-[#3D00B7] hover:text-white lg:mx-0 mx-auto block`}
        >
          Sign Up now
        </button>
      </div>
    </div>
  );
}

export default Create;
