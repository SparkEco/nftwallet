import { burn } from "@/actions/clientActions";
import { NFTData } from "@/redux/types";

interface BurnProps {
  data: NFTData;
}

function Burn({ data }: BurnProps) {
  const handleClick = async () => {
    try {
      await burn(data.id);
    } catch (err) {
      console.error("Burn failed");
    }
  };
  return (
    <button
      className={`lg:h-[28px] h-[24px] w-fit font-medium text-black hover:bg-[#3D00B7] flex justify-center items-center hover:text-white active:opacity-50 lg:text-[15px] 
      text-[10px] border bg-white rounded-[9px] lg:rounded-[12px] lg:px-2 px-[3px]`}
      onClick={handleClick}
    >
      Burn
    </button>
  );
}

export default Burn;
