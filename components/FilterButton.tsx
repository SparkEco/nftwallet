interface FilterButtonProps {
  name: string;
  click: () => void;
  isSelected: boolean;
}

function FilterButton({ name, click, isSelected }: FilterButtonProps) {
  return (
    <div
      className={`rounded-lg hover:bg-[#3D00B7] border w-fit text-[13px] hover:text-white flex items-center cursor-pointer active:opacity-75 justify-center px-2 h-[30px]
        ${isSelected ? "text-white bg-[#3D00B7]" : "text-black bg-white"}`}
      onClick={click}
    >
      <p>{name}</p>
    </div>
  );
}

export default FilterButton;
