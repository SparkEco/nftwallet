import { Face4, Face5, Face6, Face7, Ethgreen2 } from "../assets";

interface ColProps {
  name?: string;
  img: string;
  id?: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  click?: (data: any) => void; // the function
}

function Col({ name, img, click, data }: ColProps) {
  return (
    <div
      className="block mt-5 bg-white w-[269px] h-[373px] p-2 rounded-[20px]"
      onClick={() => click && click(data)}
    >
      <div
        style={{ backgroundImage: `url('src/assets${img}')` }}
        className="bg-cover lg:w-[250px]  lg:h-[250px] w-[200px] block mx-auto h-[200px] relative rounded-[15px]"
      >
        <img
          src={Face4}
          alt="face"
          className="absolute bottom-[-15px] w-[30px] h-[30px] left-[5%]"
        />
        <img
          src={Face5}
          alt="face"
          className="absolute bottom-[-15px] w-[30px] h-[30px] left-[12%]"
        />
        <img
          src={Face6}
          alt="face"
          className="absolute bottom-[-15px] w-[30px] h-[30px] left-[19%]"
        />
        <img
          src={Face7}
          alt="face"
          className="absolute bottom-[-15px] w-[30px] h-[30px] left-[26%]"
        />
      </div>
      <div className="flex items-center mt-5">
        <div className="block space-y-2 w-full">
          <p className={`text-[19px] font-bold lg:ps-0 ps-4`}>{name}</p>
          <div className="flex w-full space-x-[50%] items-center lg:px-2 px-3 pb-3">
            <div className="flex space-x-2">
              <img src={Ethgreen2} alt="eth" className={`w-[9px] h-[15px]`} />
              <p className={`text-[11px] font-[500] text-[#00AC4F]`}>
                0.25 ETH
              </p>
            </div>
            <p className={`  text-[13px] font-medium text-[#838383]`}>
              1 of 38
            </p>
          </div>
          <hr />
          <div className="flex justify-center space-x-10">
            <button
              className={`h-[28px] text-[#5539A8] text-[10px] bg-[#F5F5F5] rounded-[25px] px-2`}
            >
              <b>3</b>h <b>50</b>m <b>2</b>s <b>left</b>
            </button>
            <button
              className={`  h-[28px] text-[#5539A8] font-medium 
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
