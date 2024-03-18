function CardSkeleton() {
  return (
    <div
      className={`block shadow mt-1 lg:w-[100%] mx-auto h-fit p-2 rounded-[20px]`}
    >
      <div className="bg-cover w-[100%] skeleton-bg animate-pulse block mx-auto lg:h-[200px] md:h-[200px] h-[150px] relative rounded-[15px]"></div>
      <div className="flex items-center mt-5">
        <div className="block lg:space-y-2  space-y-1 w-full">
          <p className={`lg:text-[19px] text-[12px] font-semibold`}></p>
          <div className="flex w-full justify-between items-center px-1 lg:px-2 pb-1 lg:pb-3">
            <p className={`text-[13px] block font-medium`}></p>
          </div>
          <hr />
          <div className="flex justify-between lg:px-1 px-0">
            <div className={`flex items-center`}>
              <div
                className={`rounded-[50%] skeleton-bg animate-pulse lg:w-[20px] lg:h-[20px] w-[15px] h-[15px]`}
              />

              <div
                className={`rounded-[50%] skeleton-bg animate-pulse lg:w-[20px] lg:h-[20px] w-[15px] h-[15px]`}
              />

              <div
                className={`rounded-[50%] skeleton-bg animate-pulse lg:w-[20px] lg:h-[20px] w-[15px] h-[15px]`}
              />

              <div className={`flex space-x-1 justify-center items-center`}>
                <button
                  className={`lg:h-[30px] h-[24px] w-[28px] font-medium skeleton-bg animate-pulse flex justify-center items-center active:opacity-50 lg:text-[14px] text-[10px] border  rounded-[9px] lg:rounded-[12px]] lg:px-[6px] px-[3px]`}
                ></button>

                <button
                  className={`lg:h-[30px] h-[24px] w-[28px] font-medium flex justify-center items-center skeleton-bg animate-pulse active:opacity-50 lg:text-[14px] text-[10px] border rounded-[9px] lg:rounded-[12px] lg:px-[6px] px-[3px]`}
                ></button>

                <button
                  className={`lg:h-[30px] h-[24px] w-[28px] font-medium flex justify-center items-center skeleton-bg animate-pulse active:opacity-50 lg:text-[14px] text-[10px] border rounded-[9px] lg:rounded-[12px] lg:px-[6px] px-[3px]`}
                ></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardSkeleton;
