function Navbar() {
  return (
    <nav
      className="w-full flex lg:space-x-[35px] justify-center h-[60px]
     lg:text-[16px] md:text-[15px] text-[13px] border-b items-center lg:py-[35px] py-[20px] sticky top-0 bg-white px-4 z-50"
    >
      <ul className="flex lg:space-x-[50px] md:space-x-[30px] space-x-[0.6rem]">
        <li className="hover:text-sky-500 cursor-pointer">Marketplace</li>
        <li className="hover:text-sky-500 cursor-pointer">Resource</li>
        <li className="hover:text-sky-500 cursor-pointer">About</li>
      </ul>
      <input
        type="text"
        placeholder="Search"
        className="rounded-[25px] lg:block hidden md:block lg:w-[300px] md:w-[250px] h-[40px] border-2 outline-none p-2"
      />
      <button className="flex items-center lg:h-[40px] bg-[#3D00B7] text-white w-[131px] rounded-[20px] justify-center">
        Upload
      </button>
      <button
        className="lg:h-[40px] h-[30px] flex justify-center items-center hover:bg-[#3D00B7] hover:text-white
       border-2 text-[#3D00B7] border-[#3D00B7] rounded-[25px] p-2"
      >
        Connect Wallet
      </button>
    </nav>
  );
}

export default Navbar;
