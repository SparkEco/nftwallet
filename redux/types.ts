export type NFTData = {
  id: number;
  ipfsUri: string;
  name: string;
  image: string;
  tokenAccount: string;
  description: string;
  projectImages: string[];
  coverImage: string;

  coordinates: number[];
  attributes: string[];
};
