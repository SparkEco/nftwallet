/** @jsxImportSource frog/jsx */
/* eslint-disable react/jsx-key */
import { Button, Frog, TextInput } from "frog";
import { devtools } from "frog/dev";
import { abi } from "@/ABIs/ProxyC";
import { readContract } from "@wagmi/core";
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
//solar sister = 0xFc793BCee784514Fa64b42896bcF967DCA9b29C5
// Uncomment to use Edge Runtime
// export const runtime = 'edge'
const frontendURL = process.env.NEXT_PUBLIC_FRONTEND as string;

let contractAdress: string;
let unitPrice: bigint;
app.frame("/frame", async (c) => {
  const { status } = c;
  const query = c.req.query();
  contractAdress = query.id;
  const result = await readContract(config, {
    abi: abi,
    chainId: sepolia.id,
    address: contractAdress as Address,
    args: [BigInt(0)],
    functionName: "tokenURI",
  });
  const data = await (await fetch(result as string)).json();
  console.log(data);
  const price = await readContract(config, {
    abi: abi,
    chainId: sepolia.id,
    address: contractAdress as Address,
    functionName: "_unitPrice",
  });
  console.log(price);
  unitPrice = price as bigint;
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
        <img
          alt="nft"
          src={
            data.image ||
            "https://upload.wikimedia.org/wikipedia/commons/4/49/A_black_image.jpg"
          }
          style={{ borderRadius: "17px" }}
        />
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
