"use client";

import Amaze from "@/components/Amaze";
import Collections from "@/components/Collections";
import Create from "@/components/Create";
import Hero from "@/components/Hero";
import ABI from "@/components/abi.json";
import TopCollection from "@/components/TopCollection";
import { useEffect } from "react";
import { useAppContext } from "@/context/AppContext";
import Web3 from "web3";

function Home() {
  const { provider } = useAppContext();
  // useEffect(() => {
  //   async function getTokens() {
  //     let web3 = new Web3(provider);
  //     const contract = new web3.eth.Contract(
  //       ABI,
  //       "0xAF7FF053dF6a38F004DCfB964fAE4Bef6f479E6a"
  //     );
  //     const cc = await contract.methods.totalSupply().call();
  //     console.log(cc);
  //   }
  //   getTokens()
  //     .then(() => console.log("Read"))
  //     .catch((err) => console.log("Not Read", err));
  // }, []);

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
