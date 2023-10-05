import { NFTStorage } from "nft.storage";

export interface NftProps {
  image: File | null;
  nftcover: File | null;
  projectimages: File[];
  name: string;
  coordinates: number[];
  attributes: string[];
  description: string;
}
const NFTSTORAGE = process.env.NEXT_PUBLIC_NFTSTORAGE as string;

async function UploadNft(props: NftProps) {
  const nftstorage = new NFTStorage({ token: NFTSTORAGE });

  const imageFiles = props.projectimages.map((imageData, index) => {
    const imageBlobPart = new Blob([imageData as BlobPart], {
      type: "application/octet-stream",
    });
    return new File([imageBlobPart], `image_${index}.jpg`);
  });

  const [projectImagesHash, imageHash, nftCoverHash] = await Promise.all([
    nftstorage.storeDirectory(imageFiles),

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

  // Create metadata JSON with the correct IPFS hashes
  const metadata = {
    name: props.name,
    image: `https://ipfs.io/ipfs/${imageHash}`,
    projectimages: `https://ipfs.io/ipfs/${projectImagesHash}`,
    nftcover: `https://ipfs.io/ipfs/${nftCoverHash}`,
    description: props.description,
    coordinates: props.coordinates,
    attributes: props.attributes,
  };

  // Store metadata JSON
  const metadataHash = await nftstorage.storeBlob(
    new Blob([JSON.stringify(metadata)], { type: "application/json" })
  );

  return metadataHash;
}
export default UploadNft;

export async function fetchNft(hash: string) {
  const res = await fetch(`https://ipfs.io/ipfs/${hash}/metadata.json`);
  return res;
}
