interface Tabprops {
  name: string;
  activeTab?: string;
  setActiveTab?: (name: string) => void;
}
function Tab({ name, activeTab, setActiveTab }: Tabprops) {
  return (
    <div
      className={`${
        activeTab == name
          ? "lg:h-[250px] h-[85%] z-10 border-2"
          : "lg:h-[230px] h-[68%]"
      }  rounded-[20px] lg:w-[180px] w-[27%] bg-sky-600 `}
      onClick={() => setActiveTab && setActiveTab(name)}
    ></div>
  );
}

export default Tab;
