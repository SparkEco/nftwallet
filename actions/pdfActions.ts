import { NFTStorage } from "nft.storage";
import { getAccount } from "./clientActions";
import PdfABI from "@/ABIs/PDFABI.json";
import { FormState } from "@/components/AttestPDF";
import { BrowserProvider, Contract } from "ethers";

interface MintProps {
  pdfipfsHash: string;
  attestsationId: string;
}

async function mintPDF(
  hash: string,
  tokenAccount: string,
  provider: BrowserProvider
) {
  let response;
  try {
    const chainID = (await provider.getNetwork()).chainId;
    const goerliID = BigInt("0x5");

    if (chainID !== goerliID) {
      try {
        await provider.send("wallet_switchEthereumChain", [{ chainId: "0x5" }]);
      } catch (switchError) {
        console.error("Network switch error", switchError);
        return null;
      }
    }

    const signer = await provider.getSigner();
    const contractAddress = "0xEf466CBe76ce09Bb45ce7b25556E9b8BFD784001";
    const contract = new Contract(contractAddress, PdfABI, signer);

    if (contract) {
      response = await contract.safeMint(tokenAccount, hash);
    }
  } catch (err) {
    console.error("Method Failed", err);
  }

  return response;
}

const NFTSTORAGE = process.env.NEXT_PUBLIC_NFTSTORAGE as string;

async function UploadPDF(
  tokenAccount: string,
  provider: BrowserProvider,
  { pdfipfsHash, attestsationId }: MintProps
) {
  const nftstorage = new NFTStorage({ token: NFTSTORAGE });

  const nftCoverHash = await Promise.all([
    nftstorage.storeBlob(
      new Blob(
        [await fetch("../public/eas-logo.png").then((res) => res.blob())],
        {
          type: "application/octet-stream",
        }
      )
    ),
  ]);

  // Create metadata JSON with the correct IPFS hashes

  const metadata = {
    image: `https://ipfs.io/ipfs/${nftCoverHash}`,
    pdfIpfsHash: pdfipfsHash,
    attestsationId: attestsationId,
  };

  // Store metadata JSON
  const metadataHash = await nftstorage.storeBlob(
    new Blob([JSON.stringify(metadata)], { type: "application/json" })
  );

  const hash = `https://ipfs.io/ipfs/${metadataHash}`;
  const res = await mintPDF(hash, tokenAccount, provider);

  return res;
}
export default UploadPDF;
