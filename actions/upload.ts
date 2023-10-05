import { NFTStorage } from "nft.storage";

export interface NftProps {
  image: File | null;
  nftcover: File | null;
  projectimages: File[] | File | null;
  name: string;
  coordinates: number[];
  attributes: string[];
  description: string;
}
const NFTSTORAGE = process.env.NEXT_PUBLIC_NFTSTORAGE as string;

async function UploadNft(props: NftProps) {
  const nftstorage = new NFTStorage({ token: NFTSTORAGE });
  const imgs = Array.from(props.projectimages as File[]);
  const imageFiles = imgs.map((imageData, index) => {
    const imageBlobPart = new Blob([imageData], {
      type: "application/octet-stream",
    });
    return new File([imageBlobPart], `${imageData.name}`); // Adjust the file name
  });
  const alterprops = { ...props };

  return nftstorage.storeDirectory([
    ...imageFiles,
    new File([props.image as BlobPart], `${props.image?.name}`, {
      type: "application/octet-stream",
    }),
    new File([props.nftcover as BlobPart], `${props.nftcover?.name}`, {
      type: "application/octet-stream",
    }),
    new File([JSON.stringify(props)], "metadata.json"),
  ]);
}

export default UploadNft;

export async function fetchNft(hash: string) {
  const res = await fetch(`https://ipfs.io/ipfs/${hash}/metadata.json`);
  return res;
}
