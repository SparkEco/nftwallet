function Navbar() {
  return (
    <nav
      className="w-full flex lg:space-x-[20px] justify-around h-[60px]
     lg:text-[17px] text-[13px] border-b items-center py-[35px] sticky top-0 bg-white px-4"
    >
      <ul className="flex lg:space-x-[50px] md:space-x-[30px] space-x-[0.6rem]">
        <li className="hover:text-sky-500 cursor-pointer">Overview</li>
        <li className="hover:text-sky-500 cursor-pointer">Marketplace</li>
        <li className="hover:text-sky-500 cursor-pointer">Collections</li>
      </ul>
      <input
        type="text"
        placeholder="Search"
        className="rounded-[25px] lg:block hidden md:block lg:w-[300px] md:w-[250px] h-[40px] border-2 outline-none p-2"
      />
      <button
        className="h-[40px] flex justify-center items-center hover:bg-purple-700 hover:text-white
       border-2 text-purple-700 border-purple-700 rounded-[25px] p-2"
      >
        Connect Wallet
      </button>
    </nav>
  );
}

export default Navbar;
