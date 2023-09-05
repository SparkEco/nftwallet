function Navbar() {
  return (
    <nav className="w-full flex lg:justify-center justify-around h-[60px] lg:text-[17px] text-[13px] bg-neutral-800 items-center p-4">
      <ul className="flex lg:space-x-[50px] space-x-[0.6rem] justify-center cursor-pointer">
        <li className="hover:text-sky-500">Home</li>
        <li className="hover:text-sky-500">Overview</li>
        <li className="hover:text-sky-500">Marketplace</li>
        <li className="hover:text-sky-500">Collections</li>
        <li className="hover:text-sky-500">Metrics</li>
      </ul>
    </nav>
  );
}

export default Navbar;
