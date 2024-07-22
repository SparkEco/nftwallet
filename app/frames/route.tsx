/* eslint-disable react/jsx-key */
import { createFrames, Button } from "frames.js/next";
import { readContracts } from "@wagmi/core";
import { abi } from "@/ABIs/ProxyC";
import { Address } from "viem";
import { sepolia } from "viem/chains";

import { config } from "@/config/wagmi";
import { NextResponse, type NextRequest } from "next/server";
//solar sister = 0xFc793BCee784514Fa64b42896bcF967DCA9b29C5
export const frames = createFrames({
  basePath: "/frames",
});
const frontendHost = process.env.NEXT_PUBLIC_FRONTEND;
const handleRequest = frames(async (ctx) => {
  const contractAdress = ctx.searchParams.id;
  const NFTContract = {
    address: contractAdress as Address,
    abi: abi,
    chainId: sepolia.id,
  } as const;
  const result = await readContracts(config, {
    contracts: [
      {
        ...NFTContract,
        functionName: "tokenURI",
        args: [BigInt(0)],
      },
      {
        ...NFTContract,
        functionName: "_unitPrice",
      },
    ],
    multicallAddress: "0xcA11bde05977b3631167028862bE2a173976CA11",
  });

  const tokenURI = result[0].result;
  const data = await (await fetch(tokenURI as string)).json();
  const unitPrice = result[1].result as bigint;
  console.log(data);
  return {
    title: "Impact Frames",
    image: (
      <div style={{ display: "flex", width: "100%", height: "100%" }}>
        <img
          alt="nft"
          src={data.image || ""}
          style={{ borderRadius: "17px" }}
        />
      </div>
    ),
    textInput: "Enter quantity",
    buttons: [
      <Button
        action="tx"
        post_url={`/frames`}
        target={`/txdata?price=${unitPrice.toString()}&id=${contractAdress}`}
      >
        Buy
      </Button>,
    ],
  };
});

export const GET = async (request: NextRequest) => {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) throw Error("id is null");
  return NextResponse.redirect(
    `${frontendHost}/dashboard/collection/mint/${id}`
  );
};
export const POST = handleRequest;
