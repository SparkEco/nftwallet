interface ScrollAreaProps {
  children: React.ReactNode;
}
import React from "react";
import * as ScrollArea from "@radix-ui/react-scroll-area";

const ScrollAreaComponent = ({ children }: ScrollAreaProps) => (
  <ScrollArea.Root
    className="ScrollAreaRoot overflow-hidden ring-1 lg:left-3 md:left-3 justify-center items-center left-0 z-10 flex flex-col lg:top-[20px] md:top-[20px] bottom-0  shadow-zinc-800/5  bg-zinc-800/80 backdrop-blur-sm
     lg:w-[350px] w-full ring-white/10 lg:absolute md:absolute fixed dimo md:h-[65vh] h-[52vh] lg:h-[85vh] lg:rounded-[9px] rounded-t-[20px]"
    style={{ position: "absolute" }}
  >
    <ScrollArea.Viewport className="ScrollAreaViewport w-fit h-fit">
      {children}
    </ScrollArea.Viewport>
    <ScrollArea.Scrollbar
      className={`ScrollAreaScrollbar select-none flex touch-none p-2 transition-background duration-160 ease-out hover:bg-white/20 w-[9px]`}
      orientation="vertical"
    >
      <ScrollArea.Thumb
        className={`ScrollAreaThumb bg-orange-600 flex-1 rounded-[10px] relative before:content-[""] before:absolute before:w-full before:h-full before:min-w-[44px] before:min-h-[44px] before:top-1/2 before:left-1/2 before:transform translate-x-[-50%] translate-y-[-50%]`}
      />
    </ScrollArea.Scrollbar>
    {/* <ScrollArea.Scrollbar
      className={`ScrollAreaScrollbar h-[10px] flex-col flex select-none touch-none p-2 transition-background duration-160 ease-out hover:bg-neutral-900/40`}
      orientation="horizontal"
    >
      <ScrollArea.Thumb
        className={`ScrollAreaThumb bg-white flex-1 rounded-[10px] relative before:content-[""] before:absolute before:w-full before:h-full before:min-w-[44px] before:min-h-[44px] before:top-1/2 before:left-1/2 before:transform translate-x-[-50%] translate-y-[-50%]`}
      />
    </ScrollArea.Scrollbar> */}
    <ScrollArea.Corner className={`ScrollAreaCorner bg-white`} />
  </ScrollArea.Root>
);

export default ScrollAreaComponent;
