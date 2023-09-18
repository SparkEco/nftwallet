import SingleCol from "./SingleCol";
import {
  Giveth1,
  Giveth2,
  Giveth3,
  Giveth4,
  Poap1,
  Poap2,
  Poap3,
  Stack1,
  Tab1,
  Tab2,
  Tab3,
  Tab4,
  Bid1,
  Bid2,
  Bid3,
} from "../assets";

function Collections() {
  return (
    <div className="lg:h-[100vh] h-fit lg:py-0 py-[30px] bg-[#D9E0EC]">
      <p
        className={`integral lg:text-[28px] text-[19px] lg:font-bold font-semibold lg:px-[130px] px-0 lg:text-left text-center lg:pt-[70px] pt-0`}
      >
        COLLECTION FEATURED NFTS
      </p>
      <div className="marquee mt-[50px]">
        <div className="flex-shrink-0 flex items-center justify-around gap-8 min-w-[100%] animate-scroll">
          <SingleCol
            images={[Bid1, Bid2, Bid3, Stack1]}
            name="Amazing Collection"
          />
          <SingleCol images={[Poap1, Poap2, Poap3, Poap2]} name="Git POAP" />
          <SingleCol
            images={[Giveth1, Giveth2, Giveth3, Giveth4]}
            name="Giveth"
          />
          <SingleCol images={[Tab1, Tab2, Tab3, Tab4]} name="HyperCert" />
        </div>
        <div
          className="flex-shrink-0 flex items-center justify-around gap-8 min-w-[100%] animate-scroll"
          aria-hidden={true}
        >
          <SingleCol
            images={[Bid1, Bid2, Bid3, Stack1]}
            name="Amazing Collection"
          />
          <SingleCol images={[Poap1, Poap2, Poap3, Poap2]} name="Git POAP" />
          <SingleCol
            images={[Giveth1, Giveth2, Giveth3, Giveth4]}
            name="Giveth"
          />
          <SingleCol images={[Tab1, Tab2, Tab3, Tab4]} name="HypeCert" />
        </div>
      </div>
    </div>
  );
}

export default Collections;
