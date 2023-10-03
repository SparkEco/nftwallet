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
    className="overflow-hidden ring-1 lg:left-3 md:left-3 justify-center items-center left-0 z-10 flex flex-col lg:top-[20px] md:top-[20px] bottom-0  shadow-zinc-800/5  bg-zinc-800/80 backdrop-blur-sm
     lg:w-[350px] w-full ring-white/10 lg:!absolute md:!absolute !fixed dimo md:h-[65vh] h-[52vh] lg:h-[85vh] lg:rounded-[9px] rounded-t-[20px]"
  >
    <ScrollArea.Viewport className="ScrollAreaViewport">
      <div
        className={`${
          tabOpen ? mountedClass : unmountingClass
        } text-zinc-200 w-fit relative`}
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

    <ScrollArea.Corner className={`ScrollAreaCorner bg-white`} />
  </ScrollArea.Root>
);

export default ScrollAreaComponent;
