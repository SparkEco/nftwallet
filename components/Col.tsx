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
      className="block mt-5 bg-white w-[269px] h-[373px] p-2 rounded-[20px]"
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
        <div className="block space-y-2 w-full">
          <p className={`text-[19px] font-bold`}>{name}</p>
          <div className="flex w-full space-x-[50%] items-center lg:px-2 px-3 pb-3">
            <div className="flex space-x-2">
              <Image src={`/ethgreen2.png`} alt="eth" width={9} height={15} />
              <p className={`text-[11px] font-[500] text-[#00AC4F]`}>
                0.25 ETH
              </p>
            </div>
            <p className={`text-[13px] font-medium text-[#838383]`}>1 of 38</p>
          </div>
          <hr />
          <div className="flex justify-center space-x-10">
            <button
              className={`h-[28px] text-[#5539A8] text-[10px] bg-[#F5F5F5] rounded-[25px] px-2`}
            >
              <b>3</b>h <b>50</b>m <b>2</b>s <b>left</b>
            </button>
            <button
              className={`h-[28px] text-[#5539A8] font-medium 
                   hover:text-white hover:bg-[#5539A8] text-[15px] bg-[#F5F5F5] rounded-[25px] px-2`}
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
