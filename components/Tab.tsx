interface Tabprops {
  name: string;
  activeTab?: string;
  className?: string;
  setActiveTab?: (name: string) => void;
}
function Tab({ name, activeTab, setActiveTab, className }: Tabprops) {
  return (
    <div
      className={`${
        activeTab == name
          ? "lg:h-[250px] h-[100%] z-10 border-2 bg-sky-600 shadow"
          : `lg:h-[200px] h-[80%] ${className} bg-gray-500`
      }  rounded-[20px] lg:w-[180px] w-[28%]`}
      onClick={() => setActiveTab && setActiveTab(name)}
    ></div>
  );
}

export default Tab;
