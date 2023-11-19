import { useMemo, useCallback, useState } from "react";
import Image from "next/image";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { IoChevronBackSharp, IoChevronForwardSharp } from "react-icons/io5";

interface SliderProps {
  imgs: string[];
}

const Slider = ({ imgs }: SliderProps) => {
  const [sliderRef, instance] = useKeenSlider({
    loop: true,
    initial: 0, // Initial slide index
  });

  const handlePrevClick = useCallback(() => {
    if (instance.current) {
      instance.current.prev();
    }
  }, [instance]);

  const handleNextClick = useCallback(() => {
    if (instance.current) {
      instance.current.next();
    }
  }, [instance]);

  const slides = useMemo(() => {
    return imgs.map((img, index) => (
      <div className="keen-slider__slide w-fit" key={index}>
        <Image
          src={img}
          alt="project"
          loading="eager"
          width={320}
          height={150}
          className="w-full rounded-[0.4rem] lg:h-[200px] h-[200px]"
        />
      </div>
    ));
  }, [imgs]);

  return (
    <div className="relative lg:w-[320px] w-[98vw] block mx-auto">
      <div ref={sliderRef} className="keen-slider">
        {slides}
      </div>
      <div className="lg:flex hidden absolute justify-between px-2 w-full top-1/2 transform -translate-y-1/2">
        <button
          type="button"
          onClick={handlePrevClick}
          className="bg-white w-[40px] h-[40px] rounded-full flex justify-center items-center"
        >
          <IoChevronBackSharp size={25} color="#000000" />
        </button>
        <button
          type="button"
          onClick={handleNextClick}
          className="bg-white w-[40px] h-[40px] rounded-full flex justify-center items-center"
        >
          <IoChevronForwardSharp size={25} color="#000000" />
        </button>
      </div>
    </div>
  );
};

export default Slider;
