function Footer() {
  return (
    <div className="w-full lg:h-[280px] h-[180px] sticky bottom-1 bg-black  p-4 flex justify-around items-center">
      <div className="rounded-[50%] border bg-gradient-to-tr from-red-700 to-orange-500 h-[70px] w-[70px] lg:h-[100px] lg:w-[100px] absolute left-3 top-[-40px]"></div>
      <div className="lg:h-[230px] h-[80%] rounded-[20px] lg:w-[180px] w-[30%] bg-sky-600"></div>
      <div className="lg:h-[230px] h-[80%] rounded-[20px] lg:w-[180px] w-[30%] bg-sky-600"></div>
      <div className="lg:h-[230px] h-[80%] rounded-[20px] lg:w-[180px] w-[30%] bg-sky-600"></div>
    </div>
  );
}

export default Footer;
