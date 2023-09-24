"use client";

import Amaze from "@/components/Amaze";
import Collections from "@/components/Collections";
import Create from "@/components/Create";
import Hero from "@/components/Hero";
import TopCollection from "@/components/TopCollection";

function Home() {
  return (
    <div className="">
      <Hero />
      <Create />
      <Collections />
      <TopCollection />
      <Amaze />
      {/* <Discover /> */}
    </div>
  );
}

export default Home;
