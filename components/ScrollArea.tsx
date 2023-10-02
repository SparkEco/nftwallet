interface ScrollAreaProps {
  children: React.ReactNode;
}
import React from "react";
import * as ScrollArea from "@radix-ui/react-scroll-area";

const ScrollAreaComponent = ({ children }: ScrollAreaProps) => (
  <ScrollArea.Root className="ScrollAreaRoot">
    <ScrollArea.Viewport className="ScrollAreaViewport">
      {children}
    </ScrollArea.Viewport>
    <ScrollArea.Scrollbar
      className="ScrollAreaScrollbar"
      orientation="vertical"
    >
      <ScrollArea.Thumb className="ScrollAreaThumb" />
    </ScrollArea.Scrollbar>
    <ScrollArea.Scrollbar
      className="ScrollAreaScrollbar"
      orientation="horizontal"
    >
      <ScrollArea.Thumb className="ScrollAreaThumb" />
    </ScrollArea.Scrollbar>
    <ScrollArea.Corner className="ScrollAreaCorner" />
  </ScrollArea.Root>
);

export default ScrollAreaComponent;
