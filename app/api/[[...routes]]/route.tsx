/** @jsxImportSource frog/jsx */
/* eslint-disable react/jsx-key */

import { Button, Frog, TextInput } from "frog";
import { devtools } from "frog/dev";
import { abi } from "@/ABIs/ProxyC";
import { readContracts } from "@wagmi/core";
import { handle } from "frog/next";
import { serveStatic } from "frog/serve-static";
import { config } from "@/config/wagmi";
import { sepolia } from "viem/chains";
import { Address } from "viem";

const app = new Frog({
  title: "Impact Frames",
  assetsPath: "/",
  basePath: "/api",

  // Supply a Hub to enable frame verification.
  // hub: neynar({ apiKey: 'NEYNAR_FROG_FM' })
});
// test id = 0xe3B26f198D53516E3cbbF5B6919153834DEbC924
// Uncomment to use Edge Runtime
// export const runtime = 'edge'
const frontendURL = process.env.NEXT_PUBLIC_FRONTEND as string;

let contractAdress: string;
let unitPrice: bigint;
app.frame("/frame", async (c) => {
  const { status } = c;
  const query = c.req.query();
  contractAdress = query.id;
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
  unitPrice = result[1].result as bigint;
  console.log(data);
  return c.res({
    browserLocation: `${frontendURL}/dashboard/collection/mint/${contractAdress}`,
    image: (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
        }}
      >
        <img alt="nft" src={data.image} style={{ borderRadius: "17px" }} />
      </div>
    ),
    intents: [
      <TextInput placeholder="Enter quantity..." />,
      <Button.Transaction target="/buy">Buy</Button.Transaction>,
      status === "response" && <Button.Reset>Reset</Button.Reset>,
    ],
  });
});

app.transaction("/buy", (c) => {
  const { inputText } = c;
  console.log(inputText);
  return c.contract({
    abi: abi,
    chainId: "eip155:11155111",
    value: BigInt(BigInt(inputText || 1) * unitPrice),
    functionName: "mintBatch",
    to: contractAdress as Address,
    args: [BigInt(inputText || 1)],
  });
});

devtools(app, { serveStatic });

export const GET = handle(app);
export const POST = handle(app);
