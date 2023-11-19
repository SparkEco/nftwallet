import SingleCol from "./SingleCol";
import localFont from "next/font/local";
const myFont = localFont({
  src: "./intcf/IntegralCF-Bold.otf",
  display: "swap",
});

function Collections() {
  return (
    <div className="lg:h-[86vh] h-fit lg:py-0 py-[30px] bg-[#D9E0EC]">
      <p
        className={`${myFont.className} lg:text-[28px] text-[19px] lg:font-bold font-semibold lg:px-[130px] px-0 lg:text-left text-center lg:pt-[70px] pt-0`}
      >
        COLLECTION FEATURED NFTS
      </p>
      <div className="marquee mt-[50px]">
        <div className="flex-shrink-0 flex items-center justify-around gap-8 min-w-[100%] animate-scroll">
          <SingleCol
            images={[
              "/nfts/F0-9GbjXwAAKsl7.jpg",
              "/nfts/F0VLqN8agAAe0wA.jpg",
              "/nfts/F0xIASwXsAE0vSs.jpg",
              "/nfts/F0yEOtEXoAErpCz.jpg",
            ]}
            name="Amazing Collection"
          />
          <SingleCol
            images={[
              "/nfts/F1bSt_cX0AA283-.jpg",
              "/nfts/F1daXLaaIAANzSM.jpg",
              "/nfts/F1gsPMsXoAU0fIf.jpg",
              "/nfts/F1yhnajaIAEpoMd.jpg",
            ]}
            name="Git POAP"
          />
          <SingleCol
            images={[
              "/nfts/F1yqkw-akAIMaDs.jpg",
              "/nfts/F2ou9emW4AECSex.jpg",
              "/nfts/F3FJS4bXwAAF4xs.jpg",
              "/nfts/F4ECefCXUAAwr2I.jpg",
            ]}
            name="Giveth"
          />
          <SingleCol
            images={[
              "/nfts/F4EN7tcXUAEC-5Y.jpg",
              "/nfts/F4H2vlbWUAA0MaG.jpg",
              "/nfts/F4hWlm7XsAE_cmI.jpg",
              "/nfts/F4ixz7FWcAA1K_v.jpg",
            ]}
            name="HyperCert"
          />
        </div>
        <div
          className="flex-shrink-0 flex items-center justify-around gap-8 min-w-[100%] animate-scroll"
          aria-hidden={true}
        >
          <SingleCol
            images={[
              "/nfts/F0-9GbjXwAAKsl7.jpg",
              "/nfts/F0VLqN8agAAe0wA.jpg",
              "/nfts/F0xIASwXsAE0vSs.jpg",
              "/nfts/F0yEOtEXoAErpCz.jpg",
            ]}
            name="Amazing Collection"
          />
          <SingleCol
            images={[
              "/nfts/F1bSt_cX0AA283-.jpg",
              "/nfts/F1daXLaaIAANzSM.jpg",
              "/nfts/F1gsPMsXoAU0fIf.jpg",
              "/nfts/F1yhnajaIAEpoMd.jpg",
            ]}
            name="Git POAP"
          />
          <SingleCol
            images={[
              "/nfts/F1yqkw-akAIMaDs.jpg",
              "/nfts/F2ou9emW4AECSex.jpg",
              "/nfts/F3FJS4bXwAAF4xs.jpg",
              "/nfts/F4ECefCXUAAwr2I.jpg",
            ]}
            name="Giveth"
          />
          <SingleCol
            images={[
              "/nfts/F4EN7tcXUAEC-5Y.jpg",
              "/nfts/F4H2vlbWUAA0MaG.jpg",
              "/nfts/F4hWlm7XsAE_cmI.jpg",
              "/nfts/F4ixz7FWcAA1K_v.jpg",
            ]}
            name="HypeCert"
          />
        </div>
      </div>
    </div>
  );
}

export default Collections;
