interface CatButtonProps {
  name: string;
}

function CatButton({ name }: CatButtonProps) {
  return (
    <button
      className={`text-black bg-[#e6e4e4] px-4 h-[38px]
       rounded-[25px] hover:bg-[#3D00B7] hover:text-white`}
    >
      {name}
    </button>
  );
}

export default CatButton;
