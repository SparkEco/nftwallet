function Navbar() {
  return (
    <nav className="w-full flex justify-center h-[60px] bg-neutral-800 items-center p-4">
      <ul className="flex space-x-[50px] justify-center">
        <li>Home</li>
        <li>Overview</li>
        <li>Marketplace</li>
        <li>Collections</li>
        <li>Metrics</li>
      </ul>
    </nav>
  );
}

export default Navbar;
