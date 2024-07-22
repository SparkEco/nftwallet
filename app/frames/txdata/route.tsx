/* eslint-disable react/jsx-key */
import { transaction } from "frames.js/core";
import { frames } from "../route";
import { Address, encodeFunctionData } from "viem";
import { abi } from "@/ABIs/ProxyC";

export const POST = frames(async (ctx) => {
  const contractAdress = ctx.searchParams.id;
  const unitPrice = ctx.searchParams.price;
  const quantity = ctx.message?.inputText;
  const myCallData = encodeFunctionData({
    abi: abi,
    args: [BigInt(quantity || 1)],
    functionName: "mintBatch",
  });
  console.log("tx price: ", unitPrice);
  return transaction({
    chainId: "eip155:11155111",
    method: "eth_sendTransaction",
    params: {
      abi: abi,
      to: contractAdress as Address,
      data: myCallData,
      value: BigInt(BigInt(quantity || 1) * BigInt(unitPrice)).toString(),
    },
  });
});
