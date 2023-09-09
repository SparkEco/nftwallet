import SingleCol from "./SingleCol";
import localFont from "next/font/local";
const myFont = localFont({
  src: "./intcf/IntegralCF-Bold.otf",
  display: "swap",
});

function Collections() {
  return (
    <div className="h-[100vh] bg-[#D9E0EC]">
      <p
        className={`${myFont.className} text-[28px] font-bold px-[130px] pt-[70px]`}
      >
        COLLECTION FEATURED NFTS
      </p>
      <div className="marquee mt-[50px]">
        <div className="flex-shrink-0 flex items-center justify-around gap-8 min-w-[100%] animate-scroll">
          <SingleCol
            images={["/bid1.png", "/bid2.png", "/bid3.png", "/stack1.png"]}
            name="Amazing Collection"
          />
          <SingleCol
            images={[
              "/poap1.webp",
              "/poap2.webp",
              "/poap3.webp",
              "/poap2.webp",
            ]}
            name="Git POAP"
          />
          <SingleCol
            images={[
              "/giveth1.avif",
              "/giveth2.avif",
              "/giveth3.avif",
              "/giveth4.avif",
            ]}
            name="Giveth"
          />
          <SingleCol
            images={["/tab1.png", "/tab2.png", "/tab3.png", "/tab4.png"]}
            name="HyperCert"
          />
        </div>
        <div
          className="flex-shrink-0 flex items-center justify-around gap-8 min-w-[100%] animate-scroll"
          aria-hidden={true}
        >
          <SingleCol
            images={["/bid1.png", "/bid2.png", "/bid3.png", "/stack1.png"]}
            name="Amazing Collection"
          />
          <SingleCol
            images={[
              "/poap1.webp",
              "/poap2.webp",
              "/poap3.webp",
              "/poap2.webp",
            ]}
            name="Git POAP"
          />
          <SingleCol
            images={[
              "/giveth1.avif",
              "/giveth2.avif",
              "/giveth3.avif",
              "/giveth4.avif",
            ]}
            name="Giveth"
          />
          <SingleCol
            images={["/tab1.png", "/tab2.png", "/tab3.png", "/tab4.png"]}
            name="HypeCert"
          />
        </div>
      </div>
    </div>
  );
}

export default Collections;
