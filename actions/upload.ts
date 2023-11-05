import { NFTStorage } from "nft.storage";
import { mintNft } from "./clientActions";
import { getNextId } from "./serverActions";

export interface NftProps {
  image: File | null;
  nftcover: File | null;
  projectimages: File[];
  name: string;
  coordinates: number[];
  description: string;
}

const NFTSTORAGE = process.env.NEXT_PUBLIC_NFTSTORAGE as string;

async function UploadNft(
  props: NftProps,
  setStage: (value: React.SetStateAction<number>) => void
) {
  const nftstorage = new NFTStorage({ token: NFTSTORAGE });

  const imageFiles = props.projectimages.map((imageData) => {
    const imageBlobPart = new Blob([imageData as BlobPart], {
      type: "application/octet-stream",
    });
    return imageBlobPart;
  });

  const storeProj = async () => {
    let urls: string[] = [];

    for (const img of imageFiles) {
      try {
        const response = await nftstorage.storeBlob(
          new Blob([img], {
            type: "application/octet-stream",
          })
        );

        if (response) {
          urls.push(`https://ipfs.io/ipfs/${response}`);
        } else {
          console.error("Failed to store image:");
        }
      } catch (error) {
        console.error("Error storing image:", error);
      }
    }

    return urls;
  };

  setStage(1);
  const [imageHash, nftCoverHash] = await Promise.all([
    nftstorage.storeBlob(
      new Blob([props.image as BlobPart], {
        type: "application/octet-stream",
      })
    ),
    nftstorage.storeBlob(
      new Blob([props.nftcover as BlobPart], {
        type: "application/octet-stream",
      })
    ),
  ]);

  const projectimgs = await storeProj();
  const nextId = await getNextId();
  // Create metadata JSON with the correct IPFS hashes

  setStage(2);
  const metadata = {
    id: nextId?.toString(),
    name: props.name,
    image: `https://ipfs.io/ipfs/${imageHash}`,
    projectimages: projectimgs,
    nftcover: `https://ipfs.io/ipfs/${nftCoverHash}`,
    description: props.description,
    coordinates: props.coordinates,
  };

  // Store metadata JSON
  const metadataHash = await nftstorage.storeBlob(
    new Blob([JSON.stringify(metadata)], { type: "application/json" })
  );
  const hash = `https://ipfs.io/ipfs/${metadataHash}`;
  const res = await mintNft(hash);
  setStage(3);
  return res;
}
export default UploadNft;
