"use client";

import Amaze from "@/components/Amaze";
import Collections from "@/components/Collections";
import Create from "@/components/Create";
import Hero from "@/components/Hero";
import IsLoading from "@/components/Loading";
import TopCollection from "@/components/TopCollection";
import { useAppContext } from "@/context/AppContext";

function Home() {
  const { allData } = useAppContext();

  return (
    <>
      {allData.length === 0 ? (
        <IsLoading />
      ) : (
        <div className="">
          <Hero />
          <Create />
          <Collections />
          <TopCollection />
          <Amaze />
          {/* <Discover /> */}
        </div>
      )}
    </>
  );
}

export default Home;
