import { createContext, useContext, useState, SetStateAction } from "react";
import { NFTData } from "./types";
import { getGeojson, getNftData, getTokenAccount } from "@/actions/actions";
import { getAccountClaims } from "@/actions/hypercerts";
import { useEffect } from "react";

type AppContextProps = {
  children: React.ReactNode;
};

type State = {
  account: string | undefined;
  setAccount: (value: SetStateAction<string | undefined>) => void;
  isConnected: boolean;
  setIsConnected: (value: SetStateAction<boolean>) => void;
  allData: NFTData[];
  setAllData: (value: SetStateAction<NFTData[]>) => void;
  geojson: any;
  setGeojson: (value: SetStateAction<any>) => void;
};

const Context = createContext<State | undefined>(undefined);
export const AppContext = ({ children }: AppContextProps) => {
  const [account, setAccount] = useState<string | undefined>(undefined);
  const [isConnected, setIsConnected] = useState(false);
  const [geojson, setGeojson] = useState<any>();
  const [allData, setAllData] = useState<NFTData[]>([]);
  useEffect(() => {
    const mainSetter = async () => {
      try {
        const allNFTData = await getNftData();
        if (allNFTData !== undefined) {
          const geo = await getGeojson(allNFTData);
          setGeojson(geo);
          const dataPromises = allNFTData.map(async (nft) => {
            const tokenAc = await getTokenAccount(nft.data.id);
            const accountClaims = await getAccountClaims(nft.data.id);

            return {
              id: nft.data.id,
              name: nft.data.name,
              image: nft.data.image,
              description: nft.data.description,
              coverImage: nft.data.nftcover,
              projectImages: nft.data.projectimages,
              ipfsUri: nft.url,
              coordinates: nft.data.coordinates,
              tokenAccount: tokenAc,
              claims: accountClaims,
            };
          });
          const allData = await Promise.all(dataPromises);
          setAllData(allData);
          console.log("All data fetched");
        }
      } catch (error) {
        console.error("Error setting data:", error);
      }
    };

    mainSetter();
  }, []); // Empty dependency array ensures it runs once on component mount

  const state: State = {
    allData,
    setAllData,
    account,
    setAccount,
    isConnected,
    setIsConnected,
    geojson,
    setGeojson,
  };
  return <Context.Provider value={state}>{children}</Context.Provider>;
};
export const useAppContext = (): State => {
  const context = useContext(Context);
  if (!context) {
    throw new Error("useContext must be used within a StateContext Provider");
  }
  return context;
};
