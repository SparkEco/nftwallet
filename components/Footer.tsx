function Footer() {
  return (
    <div className="w-full h-[320px] sticky bottom-1 bg-black  p-4 flex justify-around items-center">
      <div className="rounded-[50%] border bg-gradient-to-tr from-red-700 to-orange-500 h-[100px] w-[100px] absolute left-3 top-[-40px]"></div>
      <div className="h-[270px] rounded-[20px] w-[200px] bg-sky-600"></div>
      <div className="h-[270px] rounded-[20px] w-[200px] bg-sky-600"></div>
      <div className="h-[270px] rounded-[20px] w-[200px] bg-sky-600"></div>
    </div>
  );
}

export default Footer;
