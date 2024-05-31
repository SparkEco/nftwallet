//import Image from "next/image";

function Navbar() {
  return (
    <nav
      className={`py-3 px-[20px] w-full h-[60px] fixed z-10 top-0 bg-transparent`}
    >
      {/* <ul className={`flex w-[40%] justify-around items-center`}>
        <li className={`text-black`}>Home</li>
        <li>Explorer</li>
        <li>
         
        </li>
      </ul> */}
      <div className={`block float-end`}>
        <w3m-button size="sm" />
      </div>
    </nav>
  );
}

export default Navbar;
