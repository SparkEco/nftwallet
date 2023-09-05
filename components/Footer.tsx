"use client";
import { useState } from "react";
import Tab from "./Tab";
import Image from "next/image";

function Footer() {
  const [activeTab, setActiveTab] = useState("tab2");
  return (
    <div className="w-full lg:h-[280px] h-[200px] sticky bottom-1 bg-black  p-4 flex lg:justify-around justify-center space-x-[-10px] items-center">
      <Image
        src={`/pfp5.webp`}
        alt="pfp"
        width={100}
        height={200}
        className="rounded-[50%] border h-[70px] w-[70px] lg:h-[100px] lg:w-[100px] absolute left-3 lg:top-[-40px] top-[-19px]"
      />
      <Tab name="tab1" activeTab={activeTab} setActiveTab={setActiveTab} />
      <Tab name="tab2" activeTab={activeTab} setActiveTab={setActiveTab} />
      <Tab name="tab3" activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}

export default Footer;
