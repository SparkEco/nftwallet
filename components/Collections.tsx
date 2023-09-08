import SingleCol from "./SingleCol";

function Collections() {
  return (
    <div className="flex w-full overflow-x-hidden items-center bg-[#D9E0EC] h-[90vh] relative">
      <div className="track flex space-x-[120px] justify-center  absolute w-[180%]">
        <SingleCol
          img1="/bid1.png"
          img2="/bid2.png"
          img3="/bid3.png"
          img4="/stack1.png"
        />
        <SingleCol
          img1="/poap1.webp"
          img2="/poap2.webp"
          img3="/poap3.webp"
          img4="/poap2.webp"
        />
        <SingleCol
          img1="/giveth1.avif"
          img2="/giveth2.avif"
          img3="/giveth3.avif"
          img4="/giveth4.avif"
        />
        <SingleCol
          img1="/tab1.png"
          img2="/tab2.png"
          img3="/tab3.png"
          img4="/tab4.png"
        />
      </div>
    </div>
  );
}

export default Collections;
