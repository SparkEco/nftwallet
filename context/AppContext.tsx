import { createContext, useContext, useState, SetStateAction } from "react";

type AppContextProps = {
  children: React.ReactNode;
};

type State = {
  account: string | undefined;
  setAccount: (value: SetStateAction<string | undefined>) => void;
  isConnected: boolean;
  setIsConnected: (value: SetStateAction<boolean>) => void;
};

const Context = createContext<State | undefined>(undefined);

export const AppContext = ({ children }: AppContextProps) => {
  const [account, setAccount] = useState<string | undefined>(undefined);
  const [isConnected, setIsConnected] = useState(false);

  const state: State = {
    account,
    setAccount,
    isConnected,
    setIsConnected,
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
