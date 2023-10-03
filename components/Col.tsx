import Image from "next/image";

interface ColProps {
  name?: string;
  img?: string;
  id?: number;
  data?: any;

  attributes?: string[];
  click?: (data: any, attributes: string[]) => void; // the function
}

function Col({ name, img, attributes, click, data }: ColProps) {
  return (
    <div
      className={`block shadow mt-5  lg:w-[269px]  lg:h-fit md:h-[300px] md:w-[200px] w-[150px] h-[300px] lg:p-2 p-0 rounded-[20px]`}
      onClick={() => click && click(data, attributes as string[])}
    >
      <div
        suppressHydrationWarning
        style={{ backgroundImage: `url('${img}')` }}
        className="bg-cover lg:w-[250px] block mx-auto lg:h-[250px] md:w-[200px] md:h-[200px] w-[150px] h-[150px] relative rounded-[15px]"
      >
        {attributes?.map((attr: string, index: number) => (
          <Image
            key={index}
            src={attr}
            alt="face"
            width={30}
            height={30}
            className={`absolute bottom-[-15px] h-[30px] w-[30px]`}
            style={{ left: `${5 + index * 7}%` }}
          />
        ))}
      </div>
      <div className="flex items-center mt-5">
        <div className="block lg:space-y-2 space-y-1 w-full">
          <p
            className={`lg:text-[19px] text-[15px] text-black font-bold`}
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
              <p className={`text-[11px] font-[500] text-black`}>0.25 ETH</p>
            </div>
            <p className={`text-[13px] block font-medium text-black`}>
              1 of 38
            </p>
          </div>
          <hr />
          <div className="flex justify-center lg:space-x-10 md:space-x-10 space-x-2">
            <button
              className={`h-[28px] text-black text-[10px] bg-inherit rounded-[25px] px-2`}
            >
              <b>3</b>h <b>50</b>m <b>2</b>s <b>left</b>
            </button>
            <button
              className={`h-[28px] w-fit font-medium 
                  text-black hover:opacity-40 lg:text-[15px] text-[10px] border bg-white rounded-[25px] px-1 lg:px-2`}
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
