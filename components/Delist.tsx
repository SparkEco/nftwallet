import { delist } from "@/actions/clientActions";
import { NFTData } from "@/redux/types";

interface DelistProps {
  data: NFTData;
}

function Delist({ data }: DelistProps) {
  const handleClick = async () => {
    try {
      await delist(data.index);
    } catch (err) {
      console.error("Delist failed");
    }
  };
  return (
    <button
      className={`lg:h-[28px] h-[24px] w-fit font-medium text-black hover:bg-[#3D00B7] flex justify-center items-center hover:text-white active:opacity-50 lg:text-[15px] 
      text-[10px] border bg-white rounded-[12px] px-2`}
      onClick={handleClick}
    >
      Delist
    </button>
  );
}

export default Delist;
