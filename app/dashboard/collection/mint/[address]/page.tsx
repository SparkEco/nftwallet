"use client";

import { useRouteContext } from "@/context/routeContext";
import { useEffect, useState } from "react";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import NFTABI from "@/ABIs/Proxycontract.json";
import USDCABI from "@/ABIs/USDC.json";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";
import { useReadContract, useAccount } from "wagmi";
import { waitForTransactionReceipt, writeContract } from "@wagmi/core";
import { config } from "@/config/wagmi";
import { ColMetadata } from "@/components/ColectionCard";
import Image from "next/image";
import { Address } from "viem";

function Page({ params }: { params: { address: string } }) {
  const { setActivePath } = useRouteContext();
  useEffect(() => {
    setActivePath("mint");
  }, [setActivePath]);
  const [quantity, setQuantity] = useState(0);
  const { address } = useAccount();

  const [data, setData] = useState<ColMetadata | undefined>(undefined);
  const { data: tokenURI } = useReadContract({
    address: params.address as Address,
    abi: NFTABI,
    functionName: "tokenURI",
    args: [BigInt(0)],
  });

  useEffect(() => {
    if (typeof tokenURI === "string") {
      (async () => {
        try {
          const res = await fetch(tokenURI);
          const data = await res.json();
          setData(data);
        } catch (e) {
          console.error("Fetch error:", e);
        }
      })();
    }
  }, [tokenURI]);

  const { data: price } = useReadContract({
    address: params.address as Address,
    abi: NFTABI,
    functionName: "_unitPrice",
  });
  const handleClick = async () => {
    try {
      console.log(price);
      if (typeof price !== "bigint" || typeof address === "undefined") {
        throw Error("Price or address is invalid");
      }
      console.log("Running approve");
      const txHash = await writeContract(config, {
        abi: USDCABI,
        address: "0x8Efa08f6f5aD7226fda36D3ca72C33d38A4F22e4",
        functionName: "approve",
        args: [params.address, price * BigInt(quantity)],
      });
      const approveReciept = await waitForTransactionReceipt(config, {
        hash: txHash,
      });
      if (approveReciept.status === "reverted") {
        throw Error("USDC contract approval reverted");
      }
      console.log("Approved");
      const mintTxHash = await writeContract(config, {
        abi: NFTABI,
        address: params.address as Address,
        functionName: "mintBatch",
        args: [BigInt(quantity)],
      });
      const mintReciept = await waitForTransactionReceipt(config, {
        hash: mintTxHash,
      });
      if (mintReciept.status === "reverted") {
        throw Error("Mint transaction reverted");
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div
      className={`w-full flex text-center justify-center h-[100vh] items-center p-[15px]`}
    >
      <div
        className={`flex justify-center items-center w-[80%] shadow-2xl h-full`}
      >
        <fieldset className={`w-[100%] space-y-4`}>
          <div
            // style={{
            //   backgroundImage: `linear-gradient(to bottom left, #4e2698, ${reduceIntensity(
            //     "#4e2698",
            //     50
            //   )})`,
            // }}
            className={`lg:w-[600px] relative flex mx-auto items-center justify-center 2xl:h-[500px] xl:h-[500px] md:h-[400px] h-[300px] rounded-[15px] md:w-[550px] w-[95%] ${
              !data?.image && "border"
            }`}
          >
            {data && <Image alt="collection-image" src={data.image} fill />}
          </div>
          <p className={`text-[16px] font-medium`}>Select the quantity</p>
          <div
            className={`flex w-[50%] mx-auto space-x-3 justify-center items-center`}
          >
            <button
              className={`w-[50px] bg-indigo-500 h-[40px] rounded-[5px]`}
              type="button"
              onClick={() => setQuantity((p) => p - 1)}
              disabled={quantity === 0}
            >
              <RemoveRoundedIcon className="text-white" />
            </button>
            <div
              className={`w-[40%] flex justify-center items-center h-[50px] border-[0.5px] rounded-[5px] text-center`}
            >
              {quantity}
            </div>
            <button
              className={`w-[50px] bg-indigo-500 h-[40px] rounded-[5px]`}
              type="button"
              onClick={() => setQuantity((p) => p + 1)}
            >
              <AddRoundedIcon className="text-white" />
            </button>
          </div>
          <button
            disabled={quantity <= 0}
            onClick={handleClick}
            className={`w-[70px] disabled:opacity-[0.5] active:opacity-[0.5] hover:opacity-[0.6] bg-black block mx-auto h-[40px] rounded-lg shadow-xl text-white`}
            type="button"
          >
            Mint
          </button>
        </fieldset>
      </div>
    </div>
  );
}

export default Page;
