import Image from "next/image";

interface ColProps {
  name?: string;
  img?: string;
  id?: number;
  data?: any;
  click?: (data: any) => void; // the function
}

function Col({ name, img, id, click, data }: ColProps) {
  return (
    <div
      className="block mt-5 bg-white lg:w-[269px] lg:h-[373px] w-[200px] h-[370px] lg:p-2 p-0 rounded-[20px]"
      onClick={() => click && click(data)}
    >
      <div
        style={{ backgroundImage: `url('${img}')` }}
        className="bg-cover lg:w-[250px] lg:h-[250px] w-[200px] h-[200px] relative rounded-[15px]"
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
          <p className={`text-[19px] font-bold`}>{name}</p>
          <div className="flex w-full lg:space-x-[50%] lg:justify-start justify-between items-center px-1 lg:px-2 pb-1 lg:pb-3">
            <div className="flex space-x-2 items-center">
              <Image
                src={`/ethgreen2.png`}
                alt="eth"
                width={9}
                height={15}
                className={`w-[9px] h-[15px]`}
              />
              <p className={`text-[11px] font-[500] text-[#00AC4F]`}>
                0.25 ETH
              </p>
            </div>
            <p className={`text-[13px] block font-medium text-[#838383]`}>
              1 of 38
            </p>
          </div>
          <hr />
          <div className="flex justify-center lg:space-x-10 space-x-6">
            <button
              className={`h-[28px] text-[#5539A8] text-[10px] bg-[#F5F5F5] rounded-[25px] px-2`}
            >
              <b>3</b>h <b>50</b>m <b>2</b>s <b>left</b>
            </button>
            <button
              className={`h-[28px] w-fit text-[#5539A8] font-medium 
                   hover:text-white hover:bg-[#5539A8] lg:text-[15px] text-[13px] bg-[#F5F5F5] rounded-[25px] px-2`}
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
