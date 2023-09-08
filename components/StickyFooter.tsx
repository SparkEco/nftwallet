"use client";
import { useState } from "react";
import Tab from "./Tab";
import Image from "next/image";

function StickyFooter() {
  const [activeTab, setActiveTab] = useState("tab2");
  return (
    <div className="w-full lg:h-[280px] md:h-[200px] h-[160px] sticky lg:bottom-1 bottom-[0.20rem] bg-black  lg:p-4 p-2 flex justify-center space-x-[-10px] items-center">
      <Image
        src={`/doc.avif`}
        alt="pfp"
        width={200}
        height={100}
        className="rounded-[50%] border h-[70px] w-[70px] lg:h-[100px] lg:w-[100px] absolute lg:left-3 left-1 lg:top-[-30px] top-[-20px]"
      />
      <Tab
        name="tab1"
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        image="/ash.png"
      />
      <Tab
        name="tab2"
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        image="/tab1.png"
      />
      <Tab
        name="tab3"
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        image="/ash.png"
      />
    </div>
  );
}

export default StickyFooter;
