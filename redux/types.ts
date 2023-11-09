export type NFTData = {
  id: number;
  ipfsUri: string;
  name: string;
  image: string;
  tokenAccount: string;
  description: string;
  projectImages: string[];
  coverImage: string;
  index: number;
  coordinates: number[];
  attributes: string[];
  price?: any;
  quantity?: number;
  isListing?: boolean;
};
