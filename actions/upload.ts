import { NFTStorage } from "nft.storage";
import { mintNft } from "./clientActions";
import { getNextId } from "./serverActions";
import toast from "react-hot-toast";
import { BrowserProvider } from "ethers";

export interface NftProps {
  name: string;
  description: string;
  image: File | null;
  nftcover: File | null;
  projectimages: FileList | null;
  coordinates: number[] | null;
}
interface ImageDataResult {
  imageSrc: string;
  type: string;
}

let signatures = {
  JVBERi0: "application/pdf",
  R0lGODdh: "image/gif",
  R0lGODlh: "image/gif",
  iVBORw0KGgo: "image/png",
  "/9j/": "image/jpg",
};

const detectMimeType = (b64: string) => {
  for (var s in signatures) {
    if (b64.indexOf(s) === 0) {
      //@ts-ignore
      return signatures[s];
    }
  }
};
const loadImageData = (imageData: Blob): Promise<ImageDataResult> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const imageSrc = e.target?.result as string;
      const type = detectMimeType(imageSrc);

      resolve({ imageSrc, type });
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsDataURL(imageData);
  });
};
const NFTSTORAGE = process.env.NEXT_PUBLIC_NFTSTORAGE as string;

async function UploadNft(
  props: NftProps,
  setStage: (value: React.SetStateAction<number>) => void,
  provider: BrowserProvider
) {
  const nftstorage = new NFTStorage({ token: NFTSTORAGE });

  try {
    if (!props.projectimages) {
      throw new Error("Project images can't be null");
    }
    props.projectimages;
    const imagePromise = Array.from(props.projectimages).map(
      async (imageData) => {
        const { type } = await loadImageData(imageData);
        const imageBlobPart = new Blob([imageData as BlobPart], {
          type: type,
        });
        return imageBlobPart;
      }
    );
    const imageFiles = await Promise.all(imagePromise);
    const storeProj = async () => {
      let urls: string[] = [];

      for (const img of imageFiles) {
        try {
          let { type } = await loadImageData(img);
          const response = await nftstorage.storeBlob(
            new Blob([img], {
              type: type,
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
    let imgType = await loadImageData(props.image as File);
    let coverType = await loadImageData(props.nftcover as File);
    const [imageHash, nftCoverHash] = await Promise.all([
      nftstorage.storeBlob(
        new Blob([props.image as BlobPart], {
          type: imgType.type,
        })
      ),

      nftstorage.storeBlob(
        new Blob([props.nftcover as BlobPart], {
          type: coverType.type,
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
    setStage(3);
    const res = await mintNft(hash, provider);
    toast.success("ImpactCert Minted", {
      duration: 5000,
      position: "top-center",
      style: {
        width: "230px",
        height: "60px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
    });
    return res;
  } catch (err) {
    toast.error("Minting Failed", {
      duration: 5000,
      position: "top-center",
      style: {
        width: "210px",
        height: "60px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
    });

    console.error("An error occured", err);
  }
}
export default UploadNft;
