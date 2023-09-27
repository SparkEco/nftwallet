import Image from "next/image";
import * as Progress from "@radix-ui/react-progress";

interface ColProps {
  name?: string;
  img?: string;
  id?: number;
  data?: any;
  click?: (data: any) => void; // the function
}

function Col({ name, img, id, click, data }: ColProps) {
  const progress = 77;
  return (
    <div
      className="block mt-5 shadow bg-gradient-to-b from-zinc-800 to-neutral-500/100 text-white lg:w-[269px] lg:h-[393px] md:h-[300px] md:w-[200px] w-[150px] h-[300px] lg:p-2 p-0 rounded-[20px]"
      onClick={() => click && click(data)}
    >
      <p
        className={`lg:text-[18px] lg:ps-3 text-[15px] font-semibold`}
        suppressHydrationWarning
      >
        {name}
      </p>
      <Image
        suppressHydrationWarning
        alt="card"
        src={img as string}
        width={250}
        height={200}
        className="bg-cover lg:w-[235px] block mx-auto lg:h-[130px] md:w-[200px] md:h-[200px] w-[150px] h-[150px] relative rounded-[15px]"
      />
      <div className="flex items-center mt-2">
        <div className="block lg:space-y-2 space-y-1 w-full">
          <div className="flex w-full lg:justify-between md:justify-start justify-between items-center px-1 lg:px-2 pb-1">
            <div className={`block`}>
              <p className={`text-[11px] block w-fit`}>Implact highlights</p>
              <div
                className={`bg-yellow-400 text-black h-[18px] px-2 rounded-[15px] text-[11px] text-center`}
              >
                lorem
              </div>
              <div
                className={`bg-yellow-400 text-black h-[18px] px-2 rounded-[15px] text-[11px] text-center mt-1`}
              >
                lorem
              </div>
            </div>
            <div className={`flex space-x-[3px]`}>
              <div
                className={`bg-[#3f7e45] h-[60px] rounded-[5px] w-[60px]`}
              ></div>
              <div className={`block space-y-[3px]`}>
                <div
                  className={`w-[22px] h-[28px] rounded-[2px] bg-orange-500`}
                ></div>
                <div
                  className={`w-[22px] h-[28px] rounded-[2px] bg-yellow-500`}
                ></div>
              </div>
              <div className={`block space-y-[3px]`}>
                <div
                  className={`w-[22px] h-[28px] rounded-[2px] bg-red-700`}
                ></div>
                <div
                  className={`w-[22px] h-[28px] rounded-[2px] bg-blue-950`}
                ></div>
              </div>
            </div>
          </div>
          <div className={`flex justify-start items-center space-x-8 px-3`}>
            <div className="block">
              <p className={`text-[10px]`}>Lead by</p>
              <p className={`text-[14px] text-yellow-300`}>SparkEco</p>
            </div>
            <div className={`block`}>
              <p className={`text-[10px]`}>Supported By</p>
              <p className={`text-[14px] text-blue-400`}>Atlantis DAO</p>
            </div>
          </div>
          <div className={`flex px-3 space-x-6 items-center`}>
            <div className={`block relative`}>
              <Progress.Root
                className={`rounded-[20px] overflow-hidden bg-white w-[100px] h-[16px]`}
                value={progress}
              >
                <Progress.Indicator
                  className={`bg-green-500 w-full h-full`}
                  style={{ transform: `translateX(-${100 - progress}%)` }}
                />
              </Progress.Root>
              {/* <p
                className={`absolute top-0 text-white text-[12px] left-[20%] z-10`}
              >
                {progress}%
              </p> */}
            </div>
            <div className={`block`}>
              <p className={`text-[11px]`}>
                <span className={`text-[10px] text-[#cccaca]`}>
                  Previous Stage:{" "}
                </span>
                lorem
              </p>
              <p className={`text-[11px]`}>
                <span className={`text-[10px] text-[#cccaca]`}>
                  Current Stage:{" "}
                </span>
                lorem
              </p>
            </div>
          </div>
          <div className={`flex items-cente px-3 justify-between`}>
            <div className={`block w-[42%]`}>
              <p className={`text-[9px] text-[#cccaca]`}>Latest Update</p>
              <p className={`text-[10px]`}>Lorem ipsum dolor sit amet</p>
            </div>
            <div className={`block w-[42%]`}>
              <p className={`text-[10px] text-[#cccaca]`}>Impact Cores</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Col;
