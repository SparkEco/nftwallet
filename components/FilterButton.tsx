interface FilterButtonProps {
  name: string;
  click: () => void;
  isSelected: boolean;
}

function FilterButton({ name, click, isSelected }: FilterButtonProps) {
  return (
    <li
      className={`rounded-[10px] hover:bg-[#3D00B7] hover:text-white flex items-center cursor-pointer active:opacity-75 justify-center px-4 h-[38px]
        ${isSelected ? "text-white bg-[#3D00B7]" : "text-black bg-white"}`}
      onClick={click}
    >
      {name}
    </li>
  );
}

export default FilterButton;
