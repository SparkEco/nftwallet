import { detectProvider } from "@/providers/ethProvider";
import { createContext, useContext, useState, SetStateAction } from "react";

type AppContextProps = {
  children: React.ReactNode;
};

type State = {
  account: string | undefined;
  setAccount: (value: SetStateAction<string | undefined>) => void;
  provider: any;
  setProvider: (value: SetStateAction<any | undefined>) => void;
};

const Context = createContext<State | undefined>(undefined);

export const AppContext = ({ children }: AppContextProps) => {
  const [account, setAccount] = useState<string | undefined>(undefined);
  const [provider, setProvider] = useState<any>(detectProvider());

  const state: State = {
    account,
    setAccount,
    provider,
    setProvider,
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
