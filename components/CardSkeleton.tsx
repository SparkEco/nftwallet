function CardSkeleton() {
  return (
    <div
      className={`block animate-pulse shadow mt-1 lg:w-[100%] mx-auto h-fit p-2 rounded-[20px]`}
    >
      <div className="bg-cover w-[100%] bg-[#555555] block mx-auto lg:h-[200px] ] md:h-[200px] h-[150px] relative rounded-[15px]"></div>
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
                className={`rounded-[50%] bg-[#555555] lg:w-[20px] lg:h-[20px] w-[15px] h-[15px]`}
              />

              <div
                className={`rounded-[50%] bg-[#555555] lg:w-[20px] lg:h-[20px] w-[15px] h-[15px]`}
              />

              <div
                className={`rounded-[50%] bg-[#555555] lg:w-[20px] lg:h-[20px] w-[15px] h-[15px]`}
              />

              <div className={`flex space-x-1 justify-center items-center`}>
                <button
                  className={`lg:h-[28px] h-[24px] w-fit font-medium bg-[#555555] flex justify-center items-center text-[#555555] active:opacity-50 lg:text-[14px] text-[10px] border  rounded-[9px] lg:rounded-[12px]] lg:px-[6px] px-[3px]`}
                >
                  List
                </button>

                <button
                  className={`lg:h-[28px] h-[24px] w-fit font-medium flex justify-center items-center text-[#555555] active:opacity-50 lg:text-[14px] text-[10px] border bg-[#555555] rounded-[9px] lg:rounded-[12px] lg:px-[6px] px-[3px]`}
                >
                  <p>Attest</p>
                </button>

                <button
                  className={`lg:h-[28px] h-[24px] w-fit font-medium flex justify-center items-center text-[#555555] active:opacity-50 lg:text-[14px] text-[10px] border rounded-[9px] lg:rounded-[12px] lg:px-[6px] px-[3px]`}
                >
                  <p>Attest</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardSkeleton;
