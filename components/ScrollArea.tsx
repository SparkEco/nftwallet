interface ScrollAreaProps {
  children: React.ReactNode;
  tabOpen: boolean;
  setTabOpen: (value: React.SetStateAction<boolean>) => void;
}
import React from "react";
import * as ScrollArea from "@radix-ui/react-scroll-area";

const ANIM_DURATION = 300;
const mountedClass = "dimo_mounted";
const unmountingClass = "dimo_unmounting";

const ScrollAreaComponent = ({
  children,
  tabOpen,
  setTabOpen,
}: ScrollAreaProps) => (
  <ScrollArea.Root
    className="overflow-hidden absolute top-[40px] left-[20px] rounded-lg ring-1 justify-center items-center z-10 flex flex-col shadow-zinc-800/5 bg-[#ffffff] backdrop-filter backdrop-blur-[20px] bg-opacity-5
     lg:w-[25.5%] w-full ring-white/10 dimo h-[500px] lg:h-[570px]"
  >
    <ScrollArea.Viewport className="ScrollAreaViewport">
      <div
        className={`${
          tabOpen ? mountedClass : unmountingClass
        } text-black w-fit relative`}
        style={{ animationDuration: `${ANIM_DURATION}ms` }}
      >
        {children}
      </div>
    </ScrollArea.Viewport>
    <ScrollArea.Scrollbar
      className={`ScrollAreaScrollbar select-none flex touch-none p-2 transition-background duration-160 ease-out hover:bg-white/20 w-[5px]`}
      orientation="vertical"
    >
      <ScrollArea.Thumb
        className={`ScrollAreaThumb bg-orange-600 flex-1 rounded-[10px] relative before:content-[""] before:absolute before:w-full before:h-full before:min-w-[44px] before:min-h-[44px] before:top-1/2 before:left-1/2 before:transform translate-x-[-50%] translate-y-[-50%]`}
      />
    </ScrollArea.Scrollbar>

    {/* <ScrollArea.Corner className={`ScrollAreaCorner bg-white`} /> */}
  </ScrollArea.Root>
);

export default ScrollAreaComponent;
