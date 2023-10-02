import Image from "next/image";

interface ColProps {
  name?: string;
  img?: string;
  id?: number;
  data?: any;
  gradient?: string;
  click?: (data: any) => void; // the function
}

function Col({ name, img, gradient, click, data }: ColProps) {
  return (
    <div
      className={`block shadow mt-5  lg:w-[269px]  lg:h-fit md:h-[300px] bg-[#323232] md:w-[200px] w-[150px] h-[300px] lg:p-2 p-0 rounded-[20px]`}
      onClick={() => click && click(data)}
      style={{
        background: `linear-gradient(to bottom, #181818 , #202020 , #232323 , #252525 , #323232 , ${gradient} , ${gradient} )`,
      }}
    >
      <div
        suppressHydrationWarning
        style={{ backgroundImage: `url('${img}')` }}
        className="bg-cover lg:w-[250px] block mx-auto lg:h-[250px] md:w-[200px] md:h-[200px] w-[150px] h-[150px] relative rounded-[15px]"
      >
        <Image
          src={`/face4.png`}
          alt="face"
          width={30}
          height={30}
          className="absolute bottom-[-15px] left-[5%] right-[30px] w-[30px]"
        />
        <Image
          src={`/face5.png`}
          alt="face"
          width={30}
          height={30}
          className="absolute bottom-[-15px] left-[12%] right-[30px] w-[30px]"
        />
        <Image
          src={`/face6.png`}
          alt="face"
          width={30}
          height={30}
          className="absolute bottom-[-15px] left-[19%] right-[30px] w-[30px]"
        />
        <Image
          src={`/face7.png`}
          alt="face"
          width={30}
          height={30}
          className="absolute bottom-[-15px] left-[26%] right-[30px] w-[30px]"
        />
      </div>
      <div className="flex items-center mt-5">
        <div className="block lg:space-y-2 space-y-1 w-full">
          <p
            className={`lg:text-[19px] text-[15px] text-white font-bold`}
            suppressHydrationWarning
          >
            {name}
          </p>
          <div className="flex w-full lg:space-x-[50%] md:space-x-[30%] lg:justify-start md:justify-start justify-between items-center px-1 lg:px-2 pb-1 lg:pb-3">
            <div className="flex space-x-2 items-center">
              <Image
                src={`/ethgreen2.png`}
                alt="eth"
                width={9}
                height={15}
                className={`w-[9px] h-[15px]`}
              />
              <p className={`text-[11px] font-[500] text-white`}>0.25 ETH</p>
            </div>
            <p className={`text-[13px] block font-medium text-white`}>
              1 of 38
            </p>
          </div>
          <hr />
          <div className="flex justify-center lg:space-x-10 md:space-x-10 space-x-2">
            <button
              className={`h-[28px] text-white text-[10px] bg-inherit rounded-[25px] px-2`}
            >
              <b>3</b>h <b>50</b>m <b>2</b>s <b>left</b>
            </button>
            <button
              className={`h-[28px] w-fit font-medium 
                  text-black hover:opacity-40 lg:text-[15px] text-[10px] bg-white rounded-[25px] px-1 lg:px-2`}
            >
              Place a bid
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Col;
